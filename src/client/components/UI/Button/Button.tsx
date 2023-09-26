import ButtonUtils, {
  ButtonIconPositionType,
  ButtonSizesType,
  ButtonVariantsType,
} from '@/client/components/UI/Button/Button.utils';
import Spinner from '@/client/components/UI/Spinner/Spinner';
import SvgIcon, { SvgIconProps } from '@/client/components/UI/SvgIcon/SvgIcon';
import classNames from 'classnames';
import { ButtonHTMLAttributes, FC, useMemo } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<Pick<SvgIconProps, 'icon'>> {
  iconPosition?: ButtonIconPositionType;
  iconViewBox?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  icon,
  iconPosition = 'left',
  iconViewBox,
  isDisabled = false,
  isLoading = false,
  label,
  size = 'small',
  variant = 'primary',
  ...props
}) => {
  const computedClassName = useMemo(() => {
    const disabledClass = ButtonUtils.getDisabledClassName(isDisabled);
    const sizeClass = ButtonUtils.getSizeClassName(size);
    const variantClass = ButtonUtils.getVariantClassName(variant);
    return [disabledClass, sizeClass, variantClass].join(' ');
  }, [isDisabled, size, variant]);
  const iconColor = useMemo(() => ButtonUtils.getIconColor(variant), [variant]);

  const text = useMemo(() => {
    return children || label;
  }, [children, label]);

  return (
    <button
      className={classNames(
        'flex flex-row items-center rounded-md text-xs uppercase shadow',
        computedClassName,
        className,
      )}
      disabled={isDisabled}
      type={props.type || 'button'}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={classNames('flex', { 'mr-3': text })}>
          <SvgIcon color={iconColor} icon={icon} size={'small'} />
        </span>
      )}
      <span className="flex flex-row">
        {text}
        {isLoading && <Spinner className="ml-2.5" size="small" />}
      </span>
      {icon && iconPosition === 'right' && (
        <span className={classNames('flex', { 'ml-3': text })}>
          <SvgIcon color={iconColor} icon={icon} size={'small'} viewBox={iconViewBox} />
        </span>
      )}
    </button>
  );
};

export default Button;
