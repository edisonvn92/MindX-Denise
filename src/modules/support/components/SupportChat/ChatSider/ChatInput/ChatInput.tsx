import React from 'react';
import { useWatch } from 'react-hook-form';
import { Button, Typography } from '@mx/ui';
import { CoreInput, GetIcon } from '@/components';
import { useCoreContext } from '@/core';
import './index.scss';

export const ChatInput: React.FC = () => {
  const { chatPrefixList, chatForm, actionEnterChat } = useCoreContext();
  const { control, getValues, setValue } = chatForm;
  const prefix = useWatch({
    control,
    name: 'prefix',
  });

  const onClickPrefixButton = (pre: string) => {
    if (pre === getValues('prefix')) setValue('prefix', null);
    else setValue('prefix', pre);
  };

  return (
    <>
      <div className="flex mb-2 w-full overflow-x-auto min-h-[50px]">
        {chatPrefixList.map((pre: string) => {
          return (
            <Button
              className={`rounded-md border mr-2 min-h-[38px] border-mx-gray-600 whitespace-nowrap ${
                pre === getValues('prefix') ? 'bg-mx-brand-50' : 'bg-mx-gray-50'
              }`}
              style={{ borderWidth: '1px' }}
              type="outlined-primary"
              size="medium"
              key={pre}
              content={<Typography content={`[${pre}]...`} fontTypo="body-m-desktop" />}
              onClick={() => onClickPrefixButton(pre)}
            />
          );
        })}
      </div>
      <div className="flex">
        <CoreInput
          control={control}
          name="chatText"
          placeholder={`[${prefix}]...`}
          className="grow mr-2"
          onKeyUp={(ev) => {
            if (ev.key === 'Enter') actionEnterChat();
          }}
        />
        <Button
          type="filled-primary"
          size="medium"
          className="h-10 hover:h-10 border-none"
          leftIcon={<GetIcon icon="IoSendOutline" className="w-4 h-4 ml-0.5" />}
          onClick={() => actionEnterChat()}
        />
      </div>
    </>
  );
};
