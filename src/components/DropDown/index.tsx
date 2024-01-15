import React, { ReactNode, useEffect, useState } from 'react';
import { Typography } from '@mx/ui';
import './index.scss';
import { GetIcon } from '../Icons/Icons';

interface DropDownOption {
  label: string;
  value: string;
  isSelected?: boolean;
}
interface DropDownProps {
  optionSorting: DropDownOption[];
  onChange(ev: string | string[]): void;
  placeholder?: string;
  className?: string;
  leftIcon?: ReactNode;
  value: string;
}

const CoreDesignDropDown = (props: DropDownProps) => {
  const { optionSorting, placeholder, className, leftIcon, onChange, value } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [valueSelected, setValueSelected] = useState<string>('');

  useEffect(() => {
    setValueSelected(value);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e: any, item: DropDownOption) => {
    e.preventDefault();
    setIsOpen(false);
    onChange(item.value);
  };

  const clearOrderBy = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpen(false);
    setValueSelected('');
    onChange('');
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        className={`rounded-3xl border-2 border-mx-gray-200 border-solid text-white hover:bg-mx-gray-200 px-[12px] py-[6px] text-center flex justify-center items-center ${
          isOpen ? 'bg-mx-gray-200' : 'bg-mx-white'
        }`}
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={toggleDropdown}
      >
        {leftIcon}
        <Typography
          content={valueSelected ? `${placeholder}: ${valueSelected}` : placeholder}
          weight="semibold"
          fontTypo="body-l-desktop"
        />
        {valueSelected && (
          <div className="flex ml-2 z-50" onClick={clearOrderBy} aria-hidden="true">
            <GetIcon icon="IoCloseOutline" className="w-5 h-5 items-center" />
          </div>
        )}
      </button>

      {isOpen && (
        <div
          className="bg-mx-white absolute top-[105%] light05 w-full rounded-md overflow-auto z-5 h-auto border-mx-gray-200 border border-solid"
          id="dropdown"
        >
          <div className="px-4 py-3">
            <Typography content={placeholder} fontTypo="body-m-desktop" weight="semibold" />
          </div>
          <ul className="mb-0" aria-labelledby="dropdown">
            {optionSorting.length > 0 &&
              optionSorting.map((item: DropDownOption, index: number) => (
                <li
                  key={index}
                  className="p-3 cursor-pointer bg-mx-white hover:bg-mx-gray-200 flex"
                  onClick={(e) => closeDropdown(e, item)}
                  onKeyDown={(e) => closeDropdown(e, item)}
                >
                  <Typography content={item.label} weight="regular" fontTypo="body-s-desktop" />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CoreDesignDropDown;
