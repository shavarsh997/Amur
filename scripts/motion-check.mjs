import assert from "node:assert/strict";
import { createTypeScriptLoader } from "./lib/load-typescript.mjs";

const load = createTypeScriptLoader(process.cwd());
const { initializeConstructionBackdrop } = load("lib/construction-backdrop");
const { initializeSiteMotion } = load("lib/site-motion");
const frames = new Map();
let frameId = 0;
const reducedMotion = Object.assign(new EventTarget(), { matches: false });
const browser = Object.assign(new EventTarget(), {
  innerHeight: 800,
  scrollY: 0,
  matchMedia: () => reducedMotion,
  requestAnimationFrame: (callback) => {
    frames.set(++frameId, callback);
    return frameId;
  },
  cancelAnimationFrame: (id) => frames.delete(id),
});
const backdrops = Array.from({ length: 2 }, () => {
  const properties = new Map();
  return {
    dataset: {},
    style: {
      getPropertyValue: (name) => properties.get(name),
      setProperty: (name, value) => properties.set(name, value),
    },
  };
});
const header = {};
const observers = [];
class ResizeObserverMock {
  targets = new Set();
  constructor(callback) {
    this.callback = callback;
    observers.push(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  disconnect() {
    this.targets.clear();
  }
}
const doc = Object.assign(new EventTarget(), {
  hidden: false,
  querySelectorAll: () => backdrops,
  querySelector: () => header,
});
Object.assign(globalThis, {
  window: browser,
  document: doc,
  ResizeObserver: ResizeObserverMock,
});
browser.ResizeObserver = ResizeObserverMock;
let measurements = 0;
let documentTop = 100;
let height = 1800;
const root = {
  parentElement: {},
  getBoundingClientRect: () => {
    measurements++;
    return { top: documentTop - browser.scrollY, height };
  },
};
const flush = () => {
  const queued = [...frames.values()];
  frames.clear();
  for (const callback of queued) callback();
};
const scroll = (offset) => {
  browser.scrollY = offset;
  browser.dispatchEvent(new Event("scroll"));
};
const stop = initializeConstructionBackdrop(root);
const observer = observers.at(-1);
flush();
assert.equal(measurements, 1);
assert.equal(backdrops[0].dataset.buildingLevel, "0");
assert(
  observer.targets.has(header),
  "Header height changes must invalidate the root offset"
);

// A burst of scroll events gets a single frame and no new layout reads.
scroll(160);
scroll(410);
assert.equal(frames.size, 1);
flush();
assert.equal(measurements, 1);
assert.equal(backdrops[0].dataset.buildingLevel, "5");
scroll(600);
flush();
assert.equal(backdrops[0].dataset.buildingFinished, "true");
const travel = Number(
  backdrops[0].style.getPropertyValue("--construction-travel")
);
assert(travel > 0 && travel < 1);
scroll(850);
flush();
assert.equal(backdrops[0].dataset.buildStage, "3");
assert.deepEqual(backdrops[0].dataset, backdrops[1].dataset);
scroll(160);
flush();
assert.equal(
  backdrops[0].dataset.buildingLevel,
  "1",
  "Reverse scrolling restores earlier stages"
);
assert.equal(measurements, 1);

height = 2800;
scroll(850);
observer.callback();
flush();
assert.equal(measurements, 2);
assert.equal(
  backdrops[0].dataset.buildStage,
  "0",
  "Progress uses the resized page height"
);
documentTop = 200;
height = 1800;
browser.dispatchEvent(new Event("pageshow"));
flush();
assert.equal(measurements, 3);
assert.equal(
  backdrops[0].dataset.buildStage,
  "2",
  "Restored pages use the new document offset"
);

doc.hidden = true;
scroll(200);
assert.equal(frames.size, 0);
doc.hidden = false;
doc.dispatchEvent(new Event("visibilitychange"));
flush();
assert.equal(backdrops[0].dataset.buildingLevel, "0");

scroll(500);
reducedMotion.matches = true;
reducedMotion.dispatchEvent(new Event("change"));
assert.equal(frames.size, 0, "Reduced motion cancels queued animation frames");
assert.equal(backdrops[0].dataset.buildStage, "3");
scroll(700);
assert.equal(frames.size, 0);
reducedMotion.matches = false;
reducedMotion.dispatchEvent(new Event("change"));
flush();
assert.equal(backdrops[0].dataset.buildStage, "0");
stop();
scroll(1000);
browser.dispatchEvent(new Event("resize"));
doc.dispatchEvent(new Event("visibilitychange"));
reducedMotion.dispatchEvent(new Event("change"));
assert.equal(frames.size, 0, "Unmount removes all scheduling listeners");
assert(observers.every((item) => item.targets.size === 0));

// Reveal initialization must not invalidate styles between geometry reads.
const operations = [];
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock;
browser.IntersectionObserver = IntersectionObserverMock;
const revealElements = Array.from({ length: 3 }, () => ({
  dataset: new Proxy(
    {},
    {
      set: (target, name, value) => {
        operations.push("write");
        target[name] = value;
        return true;
      },
    }
  ),
  getBoundingClientRect: () => {
    operations.push("read");
    return { top: 100 };
  },
}));
const revealRoot = Object.assign(new EventTarget(), {
  querySelectorAll: (selector) =>
    selector === "[data-motion]" ? revealElements : [],
});
const stopReveals = initializeSiteMotion(revealRoot);
assert(operations.lastIndexOf("read") < operations.indexOf("write"));
stopReveals();
console.log(
  "Motion checks passed: batched geometry reads, cached layout, forward/reverse scroll, resize, restoration, reduced motion, hidden tabs, cleanup."
);

// Verify the reveal/parallax controller now mounted on the public pages.
const desktop = Object.assign(new EventTarget(), { matches: true });
browser.matchMedia = (query) =>
  query.includes("prefers-reduced-motion") ? reducedMotion : desktop;
const liveObservers = [];
class LiveIntersectionObserver {
  targets = new Set();
  constructor(callback) {
    this.callback = callback;
    liveObservers.push(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  unobserve(target) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
  }
}
class MotionElement extends EventTarget {
  dataset = {};
  properties = new Map();
  style = {
    setProperty: (name, value) => this.properties.set(name, value),
    removeProperty: (name) => this.properties.delete(name),
  };
  constructor(top) {
    super();
    this.top = top;
  }
  getBoundingClientRect() {
    return { top: this.top, height: 400 };
  }
  contains() {
    return false;
  }
  closest() {
    return this;
  }
}
globalThis.Element = MotionElement;
globalThis.AnimationEvent = class extends Event {};
globalThis.IntersectionObserver = LiveIntersectionObserver;
const initialHeading = new MotionElement(100);
const reveal = new MotionElement(1100);
const photo = new MotionElement(1100);
photo.dataset.parallax = "vertical";
photo.parentElement = new MotionElement(1100);
const revealTargets = [initialHeading, reveal];
const liveRoot = Object.assign(new EventTarget(), {
  contains: (element) => revealTargets.includes(element),
  querySelectorAll: (selector) =>
    selector === "[data-motion]"
      ? revealTargets
      : selector === "[data-parallax]"
        ? [photo]
        : revealTargets.filter(
            (element) => element.dataset.motionState === "entered"
          ),
});
const stopLive = initializeSiteMotion(liveRoot);
assert.equal(
  initialHeading.dataset.motionState,
  "visible",
  "The first screen must not animate or delay LCP"
);
assert.equal(reveal.dataset.motionState, undefined);
const entrances = liveObservers.find((observer) =>
  observer.targets.has(reveal)
);
assert(entrances);
entrances.callback([{ target: reveal, isIntersecting: true }]);
assert.equal(reveal.dataset.motionState, "entered");
assert(
  !entrances.targets.has(reveal),
  "Each reveal must be observed only once"
);
const focusEvent = new Event("focusin");
Object.defineProperty(focusEvent, "target", { value: reveal });
liveRoot.dispatchEvent(focusEvent);
assert.equal(
  reveal.dataset.motionState,
  "visible",
  "Keyboard focus cancels an entrance"
);
const pictures = liveObservers.find((observer) =>
  observer.targets.has(photo.parentElement)
);
assert(pictures);
scroll(200);
assert.equal(frames.size, 0, "Offscreen photos must not schedule scroll work");
photo.parentElement.top = 300;
pictures.callback([{ target: photo.parentElement, isIntersecting: true }]);
scroll(210);
scroll(220);
assert.equal(frames.size, 1, "Scroll bursts share one animation frame");
flush();
assert(Math.abs(parseFloat(photo.properties.get("--photo-offset"))) <= 24);
scroll(240);
reducedMotion.matches = true;
reducedMotion.dispatchEvent(new Event("change"));
assert.equal(frames.size, 0);
assert(
  !photo.properties.has("--photo-offset"),
  "Reduced motion restores the original image position"
);
assert(liveObservers.every((observer) => observer.targets.size === 0));
reducedMotion.matches = false;
reducedMotion.dispatchEvent(new Event("change"));
assert.equal(
  reveal.dataset.motionState,
  "visible",
  "Preference changes do not replay completed reveals"
);
stopLive();
scroll(300);
assert.equal(frames.size, 0, "Route cleanup removes scheduling work");
assert(liveObservers.every((observer) => observer.targets.size === 0));
console.log(
  "Page motion checks passed: first-screen stability, once-only reveal, keyboard focus, offscreen idle, batched parallax, preference changes and route cleanup."
);
