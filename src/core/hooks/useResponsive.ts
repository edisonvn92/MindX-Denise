import { ContentSizeEnum } from '../context/AppContext';
import { useMediaQuery } from './useMediaQuery';

/* eslint-disable */
export const useResponsive = () => {
  const XLScreenWidth = 1728;
  const LargeScreenWidth = 1280;
  const XLScreenHeight = 960;
  const LargeScreenHeight = 720;
  const matchesXLScreen = useMediaQuery(
    `(min-width: ${XLScreenWidth}px) and (min-height: ${XLScreenHeight}px)`,
  );
  const matchesLargeScreen = useMediaQuery(
    `((min-width: ${LargeScreenWidth}px) and (max-width: ${
      XLScreenWidth - 1
    }px)) and ((min-height: ${LargeScreenHeight}px) and (max-height: ${XLScreenHeight - 1}px)`,
  );
  const matchesMediumScreen = useMediaQuery(
    `(max-width: ${LargeScreenWidth - 1}px) or (max-height: ${LargeScreenHeight - 1}px)`,
  );

  const buttonActionWithSlideMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        return matchesXLScreen ? 'large' : 'medium';
      case ContentSizeEnum.Large:
        return matchesXLScreen ? 'medium' : 'small';
      default:
        return 'small';
    }
  };

  const fontPartLessonMatches = (contentSize: ContentSizeEnum) =>
    contentSize === ContentSizeEnum.Small ? 'mb-1' : 'mb-2';

  const fontBodyMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'body-xxl-desktop';
        if (matchesLargeScreen) return 'body-xl-desktop';
        return 'body-l-desktop';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'body-xl-desktop';
        if (matchesLargeScreen) return 'body-l-desktop';
        return 'body-m-desktop';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'body-l-desktop';
        if (matchesLargeScreen) return 'body-m-desktop';
        return 'body-s-desktop';
      default:
        return 'body-s-desktop';
    }
  };

  const iconSizeMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen || matchesLargeScreen) return 'w-6 h-6';
        return 'w-5 h-5';
      case ContentSizeEnum.Large:
        if (matchesXLScreen || matchesLargeScreen) return 'w-5 h-5';
        return 'w-4 h-4';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen || matchesLargeScreen) return 'w-4 h-4';
        return 'w-3 h-3';
      default:
        return 'w-3 h-3';
    }
  };

  const boxWrapperMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'px-10';
        if (matchesLargeScreen) return 'px-8';
        return 'px-6';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'px-8';
        if (matchesLargeScreen) return 'px-6';
        return 'px-4';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'px-6';
        if (matchesLargeScreen) return 'px-4';
        return 'px-2';
      default:
        return 'px-2';
    }
  };

  const topPaddingWrapperMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'pt-10';
        if (matchesLargeScreen) return 'pt-8';
        return 'pt-6';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'pt-8';
        if (matchesLargeScreen) return 'pt-6';
        return 'pt-4';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'pt-6';
        return 'pt-4';
      default:
        return 'pt-4';
    }
  };

  const fontHeadingMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'heading-xxl-desktop';
        if (matchesLargeScreen) return 'heading-xl-desktop';
        return 'heading-l-desktop';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'heading-xl-desktop';
        if (matchesLargeScreen) return 'heading-l-desktop';
        return 'heading-m-desktop';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'heading-l-desktop';
        if (matchesLargeScreen) return 'heading-m-desktop';
        return 'body-xl-desktop';
      default:
        return 'body-xl-desktop';
    }
  };

  const marginContentMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'mt-20';
        if (matchesLargeScreen) return 'mt-10';
        return 'mt-6';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'mt-16';
        return 'mt-6';
      default:
        return 'mt-6';
    }
  };

  const spacingContentMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'ml-20 p-6';
        if (matchesLargeScreen) return 'ml-16 p-4';
        return 'ml-8 p-2';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'ml-16 p-4';
        if (matchesLargeScreen) return 'ml-8 p-3';
        return 'ml-8 p-2';
      default:
        return 'ml-8 p-2';
    }
  };

  const logoMatches = (contentSize: ContentSizeEnum) => {
    // switch (contentSize) {

    //   default:
    //     return 'sm';
    // }
    // if (isDragged) return 'md';
    // if (matchesXLScreen) return contentSize;
    // if (matchesLargeScreen) return 'lg';
    // else return 'md';
    return contentSize;
  };

  // Responsive for Quiz Page
  const answerSpacingMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'mt-8 pt-8';
        if (matchesLargeScreen) return 'mt-6 pt-6';
        return 'mt-5 pt-5';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'mt-6 pt-6';
        if (matchesLargeScreen) return 'mt-5 pt-5';
        return 'mt-4 pt-4';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'mt-4 pt-4';
        if (matchesLargeScreen) return 'mt-3 pt-3';
        return 'mt-2 pt-1';
      default:
        return 'mt-2 pt-1';
    }
  };

  const fontAnswerMatches = (contentSize: ContentSizeEnum, requireSmallSize?: boolean) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return requireSmallSize ? 'body-l-desktop' : 'body-xl-desktop';
        if (matchesLargeScreen) return requireSmallSize ? 'body-m-desktop' : 'body-l-desktop';
        return 'body-m-desktop';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return requireSmallSize ? 'body-m-desktop' : 'body-l-desktop';
        if (matchesLargeScreen) return requireSmallSize ? 'body-s-desktop' : 'body-m-desktop';
        return 'body-s-desktop';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return requireSmallSize ? 'body-s-desktop' : 'body-m-desktop';
        if (matchesLargeScreen) return requireSmallSize ? 'body-xs-desktop' : 'body-s-desktop';
        return 'body-xs-desktop';
      default:
        return 'body-xs-desktop';
    }
  };

  const answerBoxSpacingMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'mb-4 p-5';
        if (matchesLargeScreen) return 'mb-3 p-4';
        return 'mb-2 p-2';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'mb-3 p-4';
        return 'mb-2 p-2';
      case ContentSizeEnum.Medium:
        return 'mb-2 p-2';
      default:
        return 'mb-1 p-1';
    }
  };

  const marginAnswerContentMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'px-6 pb-6';
        if (matchesLargeScreen) return 'px-4 pb-4';
        return 'px-3 pb-3';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'px-4 pb-4';
        return 'px-3 pb-3';
      case ContentSizeEnum.Medium:
        return 'px-3 pb-3';
      default:
        return 'px-2 pb-2';
    }
  };

  const marginCheckAnswerMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return 'p-6';
        if (matchesLargeScreen) return 'p-5';
        return 'p-4';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return 'p-5';
        if (matchesLargeScreen) return 'p-4';
        return 'p-3';
      case ContentSizeEnum.Medium:
        if (matchesXLScreen) return 'p-3';
        return 'p-2';
      default:
        return 'p-1';
    }
  };

  const checkAnswerButtonMatches = (contentSize: ContentSizeEnum) => {
    switch (contentSize) {
      case ContentSizeEnum.ExtraLarge:
        if (matchesXLScreen) return '200px';
        if (matchesLargeScreen) return '160px';
        return '120px';
      case ContentSizeEnum.Large:
        if (matchesXLScreen) return '120px';
        return '100px';
      default:
        return '100px';
    }
  };

  const marginHeadingMatched = () => {
    return matchesXLScreen ? 'mb-3' : 'mb-1';
  };

  return {
    fontBodyMatches,
    fontHeadingMatches,
    marginContentMatches,
    spacingContentMatches,
    logoMatches,
    answerSpacingMatches,
    answerBoxSpacingMatches,
    marginAnswerContentMatches,
    marginCheckAnswerMatches,
    checkAnswerButtonMatches,
    fontAnswerMatches,
    fontPartLessonMatches,
    buttonActionWithSlideMatches,
    boxWrapperMatches,
    topPaddingWrapperMatches,
    marginHeadingMatched,
    iconSizeMatches,
  };
};
/* eslint-disable */
