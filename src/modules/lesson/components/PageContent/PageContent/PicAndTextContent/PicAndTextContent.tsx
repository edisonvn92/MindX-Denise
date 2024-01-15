import React, { useEffect, useRef, useState } from 'react';
import { isNull } from 'lodash';
import { useAppContext } from '@/core';
import { PageParams } from '@/domains/lesson/ports/payloads';
import { Typography } from '@/mx';
import './index.scss';
import {
  StudentLessonPage,
  StudentPagePictureAndTextContent,
} from '@/domains/student-lesson/entities';
import { useDataLayerAction } from '@/core/context/TagContext';
import { UserEntity } from '@/domains/user/entities';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { useResponsive } from '@/core/hooks/useResponsive';

interface ContentProps {
  content?: StudentLessonPage;
  paramContent?: PageParams;
  contentSize: ContentSizeEnum;
  currentUser: UserEntity;
}

export const PicAndTextContentPage: React.FC<ContentProps> = (props: ContentProps) => {
  const { t } = useAppContext();
  const { content, paramContent, contentSize, currentUser } = props;
  const dataLayerAction = useDataLayerAction();
  const {
    fontBodyMatches,
    fontHeadingMatches,
    marginContentMatches,
    spacingContentMatches,
    boxWrapperMatches,
  } = useResponsive();

  const imageOrTextRef = useRef<HTMLImageElement | null>(null);
  const [textArray, setTextArray] = useState<string[]>([]);
  const imageURL =
    paramContent?.pictureAndTextParam?.introductionPicture ||
    (content?.content as StudentPagePictureAndTextContent)?.introductionPicture ||
    undefined;

  const hasImage =
    (paramContent && paramContent?.pictureAndTextParam?.hasIntroductionPicture) ||
    (content &&
    isNull((content?.content as StudentPagePictureAndTextContent)?.hasIntroductionPicture)
      ? true
      : (content?.content as StudentPagePictureAndTextContent)?.hasIntroductionPicture);

  const renderImage = () => {
    if (hasImage)
      return imageURL ? (
        <img
          ref={imageOrTextRef}
          src={imageURL}
          alt={imageURL}
          className="aspect-square object-cover rounded-xl w-full"
        />
      ) : (
        <div className="aspect-square rounded-xl bg-mx-gray-500 w-full" />
      );
    return undefined;
  };

  useEffect(() => {
    if (paramContent) setTextArray(paramContent?.pictureAndTextParam?.content.split('\n') || []);
  }, [paramContent?.pictureAndTextParam?.content]);

  useEffect(() => {
    if (imageOrTextRef.current) {
      // Wait at least 10 seconds for pushing the date layer to the GTM
      dataLayerAction({
        event: 'PICTURE_AND_TEXT',
        data: {
          content: {
            user_id: currentUser?.id,
            fullname: currentUser?.fullName,
            role: currentUser?.givenName,
            pageContent: content?.content,
          },
          imageRef: imageOrTextRef.current,
          videoRef: null,
        },
      });
    }
  }, [imageOrTextRef]);

  useEffect(() => {
    if (content)
      setTextArray(
        (content?.content as StudentPagePictureAndTextContent).content.split('\n') || [],
      );
  }, [content?.content]);

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
        <div className={`gap-[8.33%] ${hasImage ? 'w-2/3 grid grid-cols-2' : 'w-1/2'}`}>
          {renderImage()}
          <div className="flex flex-col justify-center h-full">
            <div
              ref={imageOrTextRef}
              className={` border border-solid rounded-xl light03 border-mx-gray-200 ${spacingContentMatches(
                contentSize,
              )}`}
            >
              {textArray.length > 1 || textArray[0] !== '' ? (
                <div
                  className={`editor ${fontBodyMatches(contentSize)}`}
                  dangerouslySetInnerHTML={{
                    __html:
                      paramContent?.pictureAndTextParam?.content ||
                      (content?.content as StudentPagePictureAndTextContent)?.content,
                  }}
                />
              ) : (
                <Typography
                  fontTypo={fontBodyMatches(contentSize)}
                  weight="semibold"
                  content={t('lesson:content')}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
