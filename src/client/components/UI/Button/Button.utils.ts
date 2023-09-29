export type ButtonSizesType = 'large' | 'medium' | 'small';
export type ButtonVariantsType = 'primary' | 'secondary';
export type ButtonIconPositionType = 'left' | 'right';

const BUTTON_DISABLED_CLASSES = 'opacity-50 cursor-not-allowed';
const BUTTON_ICON_PRIMARY_COLOR = '#FFF';
const BUTTON_ICON_SECONDARY_COLOR = '#FFF';
const BUTTON_SIZE_SMALL_CLASSES = 'px-3 py-2';
const BUTTON_SIZE_LARGE_CLASSES = 'px-6 py-3';
const BUTTON_VARIANT_PRIMARY_CLASSES = 'bg-white font-bold text-special2';
const BUTTON_VARIANT_SECONDARY_CLASSES = 'bg-gray-500 font-semibold text-white';

const ButtonUtils = {
  getDisabledClassName: (isDisabled: boolean): string =>
    isDisabled ? BUTTON_DISABLED_CLASSES : '',
  getIconColor: (variant: ButtonVariantsType): string => {
    if (variant === 'primary') return BUTTON_ICON_PRIMARY_COLOR;
    if (variant === 'secondary') return BUTTON_ICON_SECONDARY_COLOR;
    return BUTTON_ICON_PRIMARY_COLOR;
  },
  getSizeClassName: (size: Omit<ButtonSizesType, 'medium'>): string => {
    if (size === 'small') return BUTTON_SIZE_SMALL_CLASSES;
    if (size === 'large') return BUTTON_SIZE_LARGE_CLASSES;
    return BUTTON_SIZE_SMALL_CLASSES;
  },
  getVariantClassName: (variant: ButtonVariantsType): string => {
    if (variant === 'primary') return BUTTON_VARIANT_PRIMARY_CLASSES;
    if (variant === 'secondary') return BUTTON_VARIANT_SECONDARY_CLASSES;
    return BUTTON_VARIANT_PRIMARY_CLASSES;
  },
};

export default ButtonUtils;
