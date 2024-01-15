import { Toggle, Typography } from '@mx/ui';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

export type SwitchProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  className?: string;
  loading?: boolean;
  formatValue?: boolean;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?(value: any): void;
  size?: 'small' | 'default';
};

export const CoreSwitch: React.FC<SwitchProps> = (props) => {
  const {
    control,
    name,
    loading,
    className,
    formatValue,
    label,
    onChange,
    size = 'default',
    ...nativeProps
  } = props;
  const customOnChange = onChange;

  return (
    /* eslint-disable */
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const changeValue =
            String(value) === 'ACTIVE' ? true : String(value) === 'INACTIVE' ? false : value;
          return (
            <div className="flex">
              <Toggle
                onChange={(e) => {
                  onChange(e);
                  if (customOnChange) customOnChange(e);
                }}
                checked={formatValue ? changeValue : value}
                // loading={loading}
                className="ml-2"
                {...nativeProps}
              />
              <Typography content={label} fontTypo="body-l-desktop" />
            </div>
          );
        }}
      />
    </div>
    /* eslint-disable */
  );
};
