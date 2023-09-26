import Button from '@/client/components/UI/Button/Button';
import { IconButton } from '@/client/components/UI/IconButton/IconButton';
import { FC, PropsWithChildren } from 'react';

interface ModalProps {
  cancelLabel?: string;
  confirmLabel?: string;
  isOpen: boolean;
  onCancel?: () => void;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  cancelLabel,
  children,
  confirmLabel,
  isOpen,
  onCancel,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center">
      <div className="flex h-auto w-1/4 flex-col rounded bg-slate-800 p-4 px-6 shadow">
        <div className="relative">
          <div className="absolute right-0 top-0">
            <IconButton icon={'cross'} onClick={onClose} variant="secondary" />
          </div>
          <div className="py-5">{children}</div>
          {(cancelLabel || confirmLabel) && (
            <div className="flex justify-end gap-2 border-t border-t-gray-500 pt-3">
              {cancelLabel && (
                <Button onClick={onCancel} variant="secondary">
                  {cancelLabel}
                </Button>
              )}
              {confirmLabel && <Button onClick={onConfirm}>{confirmLabel}</Button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
