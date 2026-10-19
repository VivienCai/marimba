document.addEventListener("DOMContentLoaded", init);

function init() {
  window.addEventListener("resize", viewportResized);
  setupCursorHideBehavior();
}

function setupCursorHideBehavior() {
  let hideTimeout;
  const hideDelay = 5_000;

  function showCursor() {
    document.body.classList.remove("cursor-hidden");
  }

  function hideCursor() {
    document.body.classList.add("cursor-hidden");
  }

  function resetCursorTimer() {
    clearTimeout(hideTimeout);
    showCursor();
    hideTimeout = setTimeout(hideCursor, hideDelay);
  }

  window.addEventListener("mousemove", resetCursorTimer);
  window.addEventListener("mousedown", resetCursorTimer);
  window.addEventListener("keydown", resetCursorTimer);

  resetCursorTimer();
}

let _isFullscreenCanvas;

function viewportResized() {
  if (
    typeof window.resizeCanvas !== "function" ||
    typeof window.windowWidth === "undefined" ||
    typeof window.width === "undefined"
  ) {
    return;
  }

  if (_isFullscreenCanvas === undefined) {
    _isFullscreenCanvas = width === windowWidth && height === windowHeight;
  }
  if (_isFullscreenCanvas) {
    resizeCanvas(windowWidth, windowHeight);
  }
}
