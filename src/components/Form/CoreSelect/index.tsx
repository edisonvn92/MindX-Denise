import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import SelectField, { PropsCoreSelect } from './SelectField/SelectField';

/* eslint-disable */
type SelectProps = PropsCoreSelect & {
  control: any;
  name: string;
  onChange?(value: any): void;
  className?: string;
};
/* eslint-disable */

export const CoreSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const { optionProps, name, control, className = '', onChange, ...restProps } = props;

  const customOnChange = onChange;

  const optionsFormat = useCallback(() => {
    if (Array.isArray(optionProps) && optionProps.length > 0) {
      return optionProps.map((option: any) => {
        return {
          value: option['value'],
          label: option['label'],
        };
      });
    }
    return optionProps;
  }, [optionProps]);

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <SelectField
              optionProps={optionsFormat()}
              onChange={(event: any) => {
                onChange(event);
                if (customOnChange) customOnChange(event);
              }}
              value={value}
              error={!!error}
              helpText={error?.message}
              {...restProps}
            />
          );
        }}
      />
    </div>
  );
};
