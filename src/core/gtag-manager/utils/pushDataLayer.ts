export const pushDataLayer = (event: unknown): void => {
  if (typeof window !== 'object') {
    return;
  }

  if (typeof (window as any).dataLayer === 'undefined') {
    (window as any).dataLayer = [];
  }

  (window as any).dataLayer.push(event);
};

export const onHold10sToPushDataLayer = (
  event: unknown,
  imageElement: HTMLImageElement | null,
  videoElement: HTMLVideoElement | null,
) => {
  let timer: NodeJS.Timeout | null = null;

  function startTimer(): void {
    timer = setTimeout(() => {
      pushDataLayer(event);
    }, 10000); // 10 seconds
  }

  if (imageElement) {
    imageElement.addEventListener('load', () => {
      // Image loaded, start the timer.
      startTimer();
    });
  }

  if (videoElement) {
    videoElement.addEventListener('play', () => {
      startTimer();
    });
  }

  window.addEventListener('beforeunload', () => {
    if (timer) {
      clearTimeout(timer);
    }
  });

  startTimer();
};
