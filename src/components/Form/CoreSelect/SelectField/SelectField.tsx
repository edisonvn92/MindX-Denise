import React, { useEffect, useMemo, useState } from 'react';
import { CheckBox } from '../../Checkbox/Checkbox';
import { Button, Typography } from '@/mx';
import { GetIcon } from '@/components/Icons/Icons';
import checkmark from '@/assets/images/Checkmark.svg';
import './index.scss';

/* eslint-disable */
export type PropsCoreSelect = {
  optionProps: Option[];
  placeholder?: string;
  sizeProps?: 'large' | 'medium' | 'small';
  loading?: boolean;
  value?: string | string[];
  allowClear?: boolean;
  mode?: 'tags' | 'multiple' | undefined;
  label?: string;
  required?: boolean;
  helpText?: string;
  error?: boolean;
  defaultActiveFirstOption?: boolean;
  optionsHeight?: string;
  disabled?: boolean;
  onChange(ev: string | string[]): void;
  className?: string;
};

type Option = {
  value: string;
  label: string;
  isSelected?: boolean;
};

const SelectField: React.FC<PropsCoreSelect> = (props: PropsCoreSelect) => {
  const {
    optionProps,
    onChange,
    value,
    placeholder,
    mode = undefined,
    label,
    required,
    helpText,
    error,
    optionsHeight,
    disabled = false,
    className,
    sizeProps = 'medium',
  } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    mode === 'multiple' ? (value as string[]) : [value as string],
  );
  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState<string>('');

  const [id] = useState(crypto.randomUUID());

  const onSelect = (val: string) => {
    if (mode === 'multiple') {
      let newSelected = [];
      if (selectedOptions.includes(val)) {
        newSelected = selectedOptions.filter((o) => o !== val);
      } else {
        newSelected = [...selectedOptions, val];
      }
      onChange(newSelected);
      setSelectedOptions(newSelected);
    } else {
      onChange(val);
      setSelectedOptions([val]);
    }
  };

  const optionFormat = useMemo(() => {
    return optionProps.map((option) => {
      if (selectedOptions.includes(option.value)) option.isSelected = true;
      else option.isSelected = false;
      return option;
    });
  }, [optionProps, selectedOptions]);

  useEffect(() => {
    setButtonText(
      optionFormat
        .filter((o) => o.isSelected)
        .map((o) => o.label)
        .join(', '),
    );
  }, [optionFormat]);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!e.target.closest(`#Toggle-${id}`) && !e.target.closest(`#Select-${id}`)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    onChange(value as string);
    setSelectedOptions([value as string]);
  }, [value]);

  return (
    <div className={className}>
      {label ? (
        <div className="flex mb-2">
          <Typography content={`${label}`} fontTypo="body-m-desktop" weight="regular" />
          {required ? (
            <Typography
              content="*"
              fontTypo="body-m-desktop"
              weight="regular"
              className="text-mx-red-600"
            />
          ) : undefined}
        </div>
      ) : undefined}
      <div id={`Select-${id}`} className="relative flex flex-col items-center justify-center">
        <Button
          id={`Toggle-${id}`}
          className="w-full rounded-lg bg-mx-white border-mx-gray-600 select-button"
          type={'outlined-primary'}
          size={'large'}
          content={
            <Typography
              content={buttonText && value ? buttonText : placeholder}
              fontTypo="body-m-desktop"
              weight={buttonText && value ? 'regular' : 'light'}
              className={`grow text-start ${!buttonText && !value ? 'italic' : ''}`}
            />
          }
          disabled={disabled}
          rightIcon={<GetIcon icon={open ? 'IoChevronUp' : 'IoChevronDown'} className="h-4 w-4" />}
          onClick={() => setOpen((p) => !p)}
        />
        <div
          id="options"
          className={`absolute top-[110%] left-0 light05 rounded-md overflow-auto transition-all z-5 ${
            mode === 'tags' ? 'w-auto' : 'w-full'
          }
          ${open ? 'h-auto' : 'max-h-0'}
        `}
          style={{ height: optionsHeight || '' }}
        >
          {optionFormat.map((o, i) => (
            <div
              key={i}
              className="p-4 cursor-pointer bg-mx-white hover:bg-mx-gray-200 flex min-w-max"
              onClick={() => {
                onSelect(o.value);
                if (mode !== 'multiple') setOpen(false);
              }}
            >
              {mode === 'multiple' ? (
                <CheckBox
                  isChecked={o.isSelected as boolean}
                  onChange={(ev) => {}}
                  className="mt-0.5 mr-2"
                />
              ) : o.isSelected && mode !== 'tags' ? (
                <img src={checkmark} alt="checkmark" className="mr-2" />
              ) : undefined}

              <Typography
                fontTypo={sizeProps === 'small' ? 'body-s-desktop' : 'body-m-desktop'}
                content={o.label}
              />
            </div>
          ))}
        </div>
      </div>

      {helpText && (
        <Typography
          content={`${helpText}`}
          fontTypo="body-xs-desktop"
          weight="regular"
          className={error ? 'text-mx-red-600' : ''}
        />
      )}
    </div>
  );
};

export default SelectField;
/* eslint-disable */
