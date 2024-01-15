import { useAppContext } from '@/core';

export const useTourSteps = () => {
  const { t } = useAppContext();

  const tours = [
    {
      target: '.slick-next',
      placement: 'left',
      content: t('common:guideNextSlide'),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: false,
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: '.editor-tab',
      placement: 'left',
      content: t('common:guideBackSlide'),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: false,
      spotlightClicks: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: '.lesson-tab',
      placement: 'left',
      content: t('common:guideEditor'),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: false,
      spotlightClicks: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      target: '.support-btn',
      placement: 'left',
      content: t('common:guideSupportChat'),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: false,
      spotlightClicks: false,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
  ];

  return { tours };
};
