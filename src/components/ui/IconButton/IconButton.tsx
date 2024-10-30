import React from 'react';
import {
  IconButton as MuiIconButton,
  IconButtonProps as MUIIconButtonProps,
} from '@mui/material';
import Icon from '@mui/material/Icon';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface IconButtonProps extends MUIIconButtonProps {
  icon?: React.ReactElement<SvgIconProps>;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'neutral' | 'dark';
  size?: 'small' | 'medium';
  disabled?: boolean;
}

export const IconButton = ({
  icon,
  onClick,
  color,
  size,
  disabled,
  ...props
}: IconButtonProps) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return '16px'; // why the icon is not centered
      case 'medium':
        return '24px';
      default:
        return '24px'; // default size for large and undefined
    }
  };

  const iconStyle = { fontSize: getIconSize() };

  const renderIcon = (icon: React.ReactElement<SvgIconProps> | undefined) => {
    return icon ? React.cloneElement(icon, { style: iconStyle }) : null;
  };

  return (
    <MuiIconButton
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <Icon>{renderIcon(icon)}</Icon>
    </MuiIconButton>
  );
};
