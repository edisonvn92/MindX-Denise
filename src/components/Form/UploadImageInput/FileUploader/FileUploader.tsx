import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { get } from 'lodash';
import { Typography, useToast } from '@mx/ui';
import { GetIcon } from '@/components/Icons/Icons';
import { Loading } from '@/components/Loading/Loading';

export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export type FileInput = {
  name: string;
  status?: UploadFileStatus;
  lasModifiedAt?: string;
  url?: string;
  error?: string;
};

export type UploadFileProps = {
  uploadInputType: 'button' | 'dragAndDrop';
  accept?: string;
  uploadURL?: string;
  button?: ReactNode;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  defaultFileList?: FileInput[];
  className?: string;
  onChange?(data: { fileList: FileInput[] }): void;
};

export const FileUploader: React.FC<UploadFileProps> = (props: UploadFileProps) => {
  const {
    uploadInputType,
    button,
    accept,
    uploadURL,
    multiple = false,
    error,
    helperText,
    className = '',
    defaultFileList = [],
    onChange,
  } = props;
  const [fileList, setFileList] = useState<FileInput[]>(defaultFileList);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    let link = '';
    const form = new FormData();
    form.append('files', file);
    if (uploadURL) {
      await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })
        .then(async (res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            const data = await res.json();
            link = get(data, 'link');
          }
        })
        .catch((err: Error) => {
          throw err;
        });
    }
    return link;
  };

  const onChangeFileInput = async (ev: ChangeEvent<HTMLInputElement>) => {
    // need change if multiple file upload
    if (ev.target.files![0]) {
      const file: any = ev.target.files![0];
      file.status = 'uploading';
      setFileList([file]);
      try {
        const url = await uploadFile(file);
        file.status = 'done';
        file.url = url;
        setFileList([file]);
      } catch (e: any) {
        file.status = 'error';
        file.error = e.message;
        useToast().addToast({
          status: 'error',
          header: e.message,
        });
        setFileList([file]);
      } finally {
        if (onChange) onChange({ fileList: [file] });
      }
    }
  };

  const removeFile = (index: number) => {
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
    // need change if multiple file uploaded
    (fileInputRef.current!.value as any) = null;
  };

  /* eslint-disable */
  return (
    <div className={className}>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept={accept}
        multiple={multiple}
        onChange={onChangeFileInput}
      />
      {uploadInputType === 'button' ? (
        <div onClick={() => fileInputRef.current!.click()}>{button}</div>
      ) : undefined}
      {error && helperText ? (
        <Typography
          content={helperText}
          fontTypo="body-s-desktop"
          className="text-mx-red-500 mt-4"
        />
      ) : undefined}
      <div className="mt-4">
        {fileList.map((file, index) => {
          return (
            <div
              key={index}
              className={`rounded-lg bg-mx-gray-50 px-4 py-2 border-solid flex justify-between ${
                file.status === 'error' ? 'border-mx-red-500 border-2' : 'border-mx-gray-200 border'
              }`}
            >
              <div>
                <Typography content={file.name} fontTypo="body-s-desktop" />
                {file.status === 'error' ? (
                  <Typography
                    content={file.error}
                    fontTypo="body-s-desktop"
                    className="text-mx-red-500"
                  />
                ) : undefined}
              </div>

              <div className="flex gap-2 py-1">
                {file.status === 'error' ? (
                  <GetIcon icon="IoAlertCircleOutline" className="text-mx-red-500 w-4 h-4" />
                ) : undefined}
                {file.status === 'uploading' ? (
                  <Loading />
                ) : (
                  <div className=" cursor-pointer" onClick={() => removeFile(index)}>
                    <GetIcon icon="IoCloseOutline" className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  /* eslint-disable */
};
