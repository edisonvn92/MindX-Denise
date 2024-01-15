import React, { useEffect } from 'react';
import { useAppContext } from '@/core';
import { CoverContent } from '@/domains/lesson/entities';
import './index.scss';
import { Typography } from '@/mx';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';
import { GetIcon } from '@/components';

interface ContentProps {
  content: CoverContent;
  contentSize: ContentSizeEnum;
}

export const CoverPageContent: React.FC<ContentProps> = (props: ContentProps) => {
  const { content, contentSize } = props;
  const { t } = useAppContext();
  const {
    fontBodyMatches,
    fontHeadingMatches,
    logoMatches,
    spacingContentMatches,
    boxWrapperMatches,
    marginHeadingMatched,
    iconSizeMatches,
  } = useResponsive();

  return (
    <div className="w-full h-full">
      <div className={`flex ${boxWrapperMatches(contentSize)}`}>
        {content.logo ? (
          <img
            src={content.logo}
            alt={content.logo}
            className={`rounded-xl object-cover logo-${logoMatches(contentSize)}`}
          />
        ) : (
          <div className={`logo-${logoMatches(contentSize)} rounded-xl bg-mx-gray-500 p-2 `} />
        )}

        <div className="ml-4 flex flex-col justify-center">
          <div className={`${marginHeadingMatched()}`}>
            <Typography
              fontTypo={fontBodyMatches(contentSize)}
              content={`${t('lesson:exercise')} ${content.lessonNumber || '#'}`}
            />
          </div>
          <div className={`${marginHeadingMatched()}`}>
            <Typography
              fontTypo={fontHeadingMatches(contentSize)}
              weight="bold"
              content={content.lessonName || t('lesson:lessonName')}
            />
          </div>
          <div className={`${marginHeadingMatched()} flex`}>
            <div className="mr-2">
              <GetIcon
                icon="IoTime"
                className={`text-mx-gray-500 mt-0.5 ${iconSizeMatches(contentSize)}`}
              />
            </div>
            <Typography
              fontTypo={fontBodyMatches(contentSize)}
              className="text-mx-gray-600"
              content={`${t('lesson:learningTime')}: ${content.learnTime || 'X'} ${t(
                'common:minute',
              )}`}
            />
          </div>
        </div>
      </div>
      <div className={`flex items-center justify-center ${spacingContentMatches(contentSize)}`}>
        {content.coverImage ? (
          <img
            src={content.coverImage}
            alt={content.coverImage}
            className="w-1/2 aspect-video object-cover rounded-xl"
          />
        ) : (
          <div className="w-1/2 aspect-video rounded-xl bg-mx-gray-500" />
        )}
      </div>
    </div>
  );
};
