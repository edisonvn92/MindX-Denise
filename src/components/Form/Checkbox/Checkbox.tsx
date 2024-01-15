import React, { useEffect, useState } from 'react';
import checkboxChecked from '@/assets/images/Checkbox-checked.svg';
import checkboxUnchecked from '@/assets/images/Checkbox-unchecked.svg';

export type CheckBoxProps = {
  isChecked: boolean;
  onChange(ev: boolean): void;
  className?: string;
};

export const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {
  const { isChecked, className = '', onChange } = props;
  const [checked, setChecked] = useState<boolean>(isChecked);
  const onClickCheckBox = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  useEffect(() => setChecked(isChecked), [isChecked]);

  /* eslint-disable */
  return (
    <div className={className} onClick={onClickCheckBox}>
      <img
        src={checked ? checkboxChecked : checkboxUnchecked}
        alt={checked ? 'checked' : 'unchecked'}
        className="w-[18px] h-[18px]"
      />
    </div>
  );
  /* eslint-disable */
};
