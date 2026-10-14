export type ConstructionStage = 0 | 1 | 2 | 3;

const floorThresholds = [0.05, 0.115, 0.18, 0.245, 0.31];

/** One scroll journey: five storeys, facade, approach a window, then its interior. */
export function getConstructionSequence(
  scrollOffset: number,
  scrollRange: number,
  reducedMotion = false
) {
  const progress = reducedMotion
    ? 1
    : scrollRange > 0
      ? Math.max(0, Math.min(1, scrollOffset / scrollRange))
      : 0;
  const approach = Math.max(0, Math.min(1, (progress - 0.46) / 0.16));
  const roomStage: ConstructionStage =
    progress >= 0.72 ? 3 : progress >= 0.65 ? 2 : progress >= 0.6 ? 1 : 0;

  return {
    floors: floorThresholds.filter((threshold) => progress >= threshold).length,
    facade: progress >= 0.37,
    // Smooth the camera only inside its scroll segment, with no idle frame loop.
    travel: approach * approach * (3 - 2 * approach),
    roomStage,
  };
}

export function initializeConstructionBackdrop(root: HTMLElement) {
  // Both server-rendered surfaces share one controller; CSS selects the visible one.
  const backdrops = document.querySelectorAll<HTMLElement>(
    "[data-construction-backdrop]"
  );
  if (!backdrops.length) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let stop = () => {};
  const render = (sequence: ReturnType<typeof getConstructionSequence>) => {
    const attributes = {
      buildingLevel: String(sequence.floors),
      buildingFinished: String(sequence.facade),
      buildStage: String(sequence.roomStage),
    };
    const travel = sequence.travel.toFixed(4);
    for (const backdrop of backdrops) {
      for (const [key, value] of Object.entries(attributes)) {
        if (backdrop.dataset[key] !== value) backdrop.dataset[key] = value;
      }
      if (backdrop.style.getPropertyValue("--construction-travel") !== travel) {
        backdrop.style.setProperty("--construction-travel", travel);
      }
    }
  };

  const configure = () => {
    stop();
    if (reducedMotion.matches) {
      render(getConstructionSequence(0, 0, true));
      return;
    }

    let frame = 0;
    let needsMeasurement = true;
    let documentTop = 0;
    let scrollRange = 0;
    const update = () => {
      frame = 0;
      // Scrolling changes the viewport offset, not the page geometry. Measure
      // only after layout changes, before writing animation styles.
      if (needsMeasurement) {
        const { top, height } = root.getBoundingClientRect();
        documentTop = top + window.scrollY;
        scrollRange = height - window.innerHeight;
        needsMeasurement = false;
      }
      render(
        getConstructionSequence(window.scrollY - documentTop, scrollRange)
      );
    };
    const schedule = () => {
      if (!frame && !document.hidden) {
        frame = window.requestAnimationFrame(update);
      }
    };
    const invalidateLayout = () => {
      needsMeasurement = true;
      schedule();
    };
    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(invalidateLayout) : null;

    resizeObserver?.observe(root);
    // A wrapped header can move the animation root without resizing it.
    if (root.parentElement) resizeObserver?.observe(root.parentElement);
    const header = document.querySelector("header");
    if (header) resizeObserver?.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", invalidateLayout);
    window.addEventListener("pageshow", invalidateLayout);
    document.addEventListener("visibilitychange", invalidateLayout);
    schedule();

    stop = () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", invalidateLayout);
      window.removeEventListener("pageshow", invalidateLayout);
      document.removeEventListener("visibilitychange", invalidateLayout);
    };
  };

  configure();
  reducedMotion.addEventListener("change", configure);

  return () => {
    stop();
    reducedMotion.removeEventListener("change", configure);
  };
}
