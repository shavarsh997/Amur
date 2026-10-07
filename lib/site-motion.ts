/** Progressive enhancement: unobserved content is always visible. */
export function initializeSiteMotion(root: HTMLElement) {
  if (!("IntersectionObserver" in window)) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopMotion = window.matchMedia(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
  );
  let stopMotion = () => {};

  const settleElement = (event: Event) => {
    if (!(event.target instanceof Element)) return;
    if (
      event instanceof AnimationEvent &&
      !event.animationName.startsWith("site-")
    ) {
      return;
    }
    const element = event.target.closest<HTMLElement>("[data-motion]");
    if (element && root.contains(element)) {
      element.dataset.motionState = "visible";
    }
  };

  const configureMotion = () => {
    stopMotion();
    // Finish an in-flight entrance before changing motion policy. Completed
    // animations must not restart after focus, resizing, or reduced-motion changes.
    root
      .querySelectorAll<HTMLElement>('[data-motion-state="entered"]')
      .forEach((element) => {
        element.dataset.motionState = "visible";
      });
    if (reducedMotion.matches) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          if (!element.dataset.motionState) {
            element.dataset.motionState = element.contains(
              document.activeElement
            )
              ? "visible"
              : "entered";
          }
          revealObserver.unobserve(element);
        }
      },
      { rootMargin: "0px 0px 24px 0px", threshold: 0 }
    );

    root.querySelectorAll<HTMLElement>("[data-motion]").forEach((element) => {
      // Do not replay entrances on restored scroll positions or preference changes.
      if (element.dataset.motionState) return;
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.dataset.motionState =
          element.dataset.motion === "rule" ? "entered" : "visible";
      } else {
        revealObserver.observe(element);
      }
    });

    let stopParallax = () => {};

    if (desktopMotion.matches) {
      const layers = Array.from(
        root.querySelectorAll<HTMLElement>("[data-parallax]")
      );
      const visibleLayers = new Set<HTMLElement>();
      let frame = 0;

      const updateParallax = () => {
        frame = 0;
        // Read geometry before writing styles to avoid interleaved layout work.
        const updates = Array.from(visibleLayers).map((layer) => {
          const viewport = layer.parentElement!;
          const { top, height } = viewport.getBoundingClientRect();
          const progress = Math.max(
            -1,
            Math.min(
              1,
              (window.innerHeight - 2 * top - height) /
                (window.innerHeight + height)
            )
          );
          const distance = layer.dataset.parallax === "vertical" ? 24 : 16;
          const direction = layer.dataset.parallax === "left" ? -1 : 1;
          return { layer, offset: progress * distance * direction };
        });

        for (const { layer, offset } of updates) {
          layer.style.setProperty("--photo-offset", `${offset.toFixed(2)}px`);
        }
      };

      const scheduleUpdate = () => {
        if (!frame && visibleLayers.size && !document.hidden) {
          frame = window.requestAnimationFrame(updateParallax);
        }
      };

      // Observe the stationary clipping containers, not the moving image layers.
      const layerByViewport = new Map(
        layers.map((layer) => [layer.parentElement!, layer])
      );
      const imageObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const layer = layerByViewport.get(entry.target as HTMLElement)!;
          if (entry.isIntersecting) {
            visibleLayers.add(layer);
          } else {
            visibleLayers.delete(layer);
          }
        }
        scheduleUpdate();
      });

      for (const viewport of layerByViewport.keys()) {
        imageObserver.observe(viewport);
      }

      if (layers.length) {
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        document.addEventListener("visibilitychange", scheduleUpdate);
      }

      stopParallax = () => {
        imageObserver.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", scheduleUpdate);
        window.removeEventListener("resize", scheduleUpdate);
        document.removeEventListener("visibilitychange", scheduleUpdate);
        for (const layer of layers)
          layer.style.removeProperty("--photo-offset");
      };
    }

    stopMotion = () => {
      revealObserver.disconnect();
      stopParallax();
    };
  };

  root.addEventListener("animationend", settleElement);
  root.addEventListener("focusin", settleElement);
  configureMotion();
  reducedMotion.addEventListener("change", configureMotion);
  desktopMotion.addEventListener("change", configureMotion);

  return () => {
    stopMotion();
    root.removeEventListener("animationend", settleElement);
    root.removeEventListener("focusin", settleElement);
    reducedMotion.removeEventListener("change", configureMotion);
    desktopMotion.removeEventListener("change", configureMotion);
  };
}
