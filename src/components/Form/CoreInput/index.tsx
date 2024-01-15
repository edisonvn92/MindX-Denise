import React, { KeyboardEventHandler, ReactNode } from 'react';
import { Control, Controller, ControllerRenderProps, FieldError } from 'react-hook-form';
import { TextField } from '@mx/ui';
import TextEditor from '@/components/Editor';

/* eslint-disable */
export type TextFieldProps = {
  value?: string;
  control: Control<any>;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  sizeProps?: string;
  disabled?: boolean;
  error?: boolean;
  leftIcon?: boolean;
  leftIconSwap?: ReactNode;
  rightIcon?: boolean;
  rightIconSwap?: ReactNode;
  helperText?: string;
  type?: 'text' | 'textarea' | 'editor';
  maxLength?: number;
  onBlur?: () => void;
  onChange?(value: any): void;
  onKeyUp?: KeyboardEventHandler<Element>;
};

export const CoreInput: React.FC<TextFieldProps> = (props) => {
  const {
    className,
    control,
    name,
    label,
    type,
    onChange,
    onKeyUp,
    placeholder,
    maxLength,
    leftIcon,
    leftIconSwap,
    rightIcon,
    rightIconSwap,
  } = props;
  const customOnChange = onChange;

  const renderComponent = (
    type: string | undefined,
    error: FieldError | undefined,
    field: ControllerRenderProps<any, string>,
  ) => {
    if (type === 'textarea') {
      return (
        <TextField className="w-full" type="textarea" value={field.value} maxLength={maxLength} />
      );
    } else if (type === 'editor') {
      return (
        <TextEditor
          placeholder={placeholder || ''}
          field={field}
          onChange={(event: any) => {
            field.onChange(event);
            if (customOnChange) customOnChange(event);
          }}
          maxLength={maxLength}
        />
      );
    } else {
      return (
        <TextField
          className="w-full"
          type="text"
          value={field.value}
          onChange={(event: any) => {
            field.onChange(event);
            if (customOnChange) customOnChange(event);
          }}
          onBlur={field.onBlur}
          error={!!error}
          helperText={error?.message}
          placeholder={placeholder}
          maxLength={maxLength}
          leftIcon={leftIcon}
          leftIconSwap={leftIconSwap}
          rightIcon={rightIcon}
          rightIconSwap={rightIconSwap}
          onKeyUp={onKeyUp}
        />
      );
    }
  };

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div>{renderComponent(type, error, field)}</div>
        )}
      />
    </div>
  );
};
/* eslint-disable */
