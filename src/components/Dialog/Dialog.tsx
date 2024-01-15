import React, { ReactNode } from 'react';
import { Modal } from '@/mx';
import './index.scss';

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type CoreDialogProps = ContainerProps & {
  open: boolean;
  onClose(value: boolean): void;
  body: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  className?: string;
  closeIcon?: ReactNode;
  maskClosable?: boolean;
};

export const CoreDesignDialog = (props: CoreDialogProps) => {
  const { open, onClose, body, className, title, footer, closeIcon, maskClosable } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={className}
      maskClassName="modal-mask"
      maskClosable={maskClosable}
      closeIcon={closeIcon}
      bodyClassName={`light03 p-4 rounded-xl ${className}`}
    >
      {title}
      {body}
      {footer}
    </Modal>
  );
};
