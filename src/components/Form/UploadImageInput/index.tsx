import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Button, Typography } from '@mx/ui';
import { FileUploader } from './FileUploader/FileUploader';
import { config } from '@/config';
import { GetIcon } from '@/components/Icons/Icons';

export type UploadImageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
  imageUrl?: string;
  setImageUrl(url: string): void;
};

export const CoreUploadImageInput: React.FC<UploadImageProps> = (props: UploadImageProps) => {
  const {
    resources: { uploadEndpoint, rootEndpoint },
  } = config;
  const { control, name, label, className, imageUrl, setImageUrl } = props;

  const getFileName = (fileUrl: string) => {
    const splitList = fileUrl.split('/');
    return splitList[splitList.length - 1];
  };

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <FileUploader
            uploadInputType="button"
            uploadURL={uploadEndpoint}
            accept="image/*"
            onChange={(data) => {
              const file = data.fileList[0];
              if (file && file.status === 'done') {
                const relativeLink = file.url;
                setImageUrl(`${rootEndpoint}${relativeLink}`);
              }
            }}
            error={Boolean(error)}
            defaultFileList={
              imageUrl
                ? [
                    {
                      url: imageUrl,
                      name: getFileName(imageUrl),
                    },
                  ]
                : []
            }
            button={
              <Button
                type="outlined-primary"
                size="large"
                content={
                  <Typography content={label} fontTypo="body-xl-desktop" weight="semibold" />
                }
                className="w-full border-mx-gray-200 flex justify-center"
                leftIcon={<GetIcon icon="IoShareOutline" className="w-6 h-6 mr-2" />}
              />
            }
            helperText={error?.message}
          />
        )}
      />
    </div>
  );
};
