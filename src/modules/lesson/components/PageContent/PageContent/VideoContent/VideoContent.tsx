import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/core';
import { PageParams } from '@/domains/lesson/ports/payloads';
import { Typography } from '@/mx';
import { StudentLessonPage, StudentPageVideoContent } from '@/domains/student-lesson/entities';
import { useDataLayerAction } from '@/core/context/TagContext';
import { UserEntity } from '@/domains/user/entities';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';

interface ContentProps {
  content?: StudentLessonPage;
  paramContent?: PageParams;
  contentSize: ContentSizeEnum;
  currentUser: UserEntity;
  isDragged?: boolean;
}

export const VideoContentPage: React.FC<ContentProps> = (props: ContentProps) => {
  const { content, paramContent, contentSize, currentUser, isDragged } = props;
  const videoRef = useRef(null);
  const dataLayerAction = useDataLayerAction();
  const { fontBodyMatches, fontHeadingMatches, boxWrapperMatches, spacingContentMatches } =
    useResponsive();

  useEffect(() => {
    if (videoRef.current) {
      dataLayerAction({
        event: 'ON_VIDEO',
        data: {
          content: {
            user_id: currentUser?.id,
            fullname: currentUser?.fullName,
            role: currentUser?.givenName,
            pageContent: content?.content,
          },
          imageRef: null,
          videoRef: videoRef.current,
        },
      });
    }
  }, [videoRef]);

  const embedId =
    (
      paramContent?.videoParam?.video || (content?.content as StudentPageVideoContent)?.video
    )?.split('v=')[1] || '';
  const { t } = useAppContext();
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className={`${boxWrapperMatches(contentSize)} absolute top-0 `}>
        <div className=" border-left pl-4">
          <div className="mb-2">
            <Typography
              fontTypo={fontBodyMatches(contentSize)}
              content={`${t('lesson:part')} ${
                paramContent?.pageNumber || content?.pageNumber || '#'
              }`}
            />
          </div>
          <div className="mb-3">
            <Typography
              fontTypo={fontHeadingMatches(contentSize)}
              weight="bold"
              content={paramContent?.pageName || content?.pageName || t('lesson:sectionName')}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-[90%]">
        <iframe
          ref={videoRef}
          className="aspect-video rounded-xl"
          style={{ width: '63%' }}
          title="video"
          src={`https://youtube.com/embed/${embedId}`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};
