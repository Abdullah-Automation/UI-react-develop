import React from 'react';
import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { SvgIconProps } from '@mui/material/SvgIcon';

// Only include variant, size, color, disabled
// type ButtonBaseProps = Pick<MuiButtonProps, 'variant' | 'size' | 'color' | 'disabled' >;

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'neutral' | 'error' | 'tertiary';
  size?: 'small' | 'medium';
  variant?: 'contained' | 'outlined' | 'text';
  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  loading = false,
  size,
  startIcon,
  endIcon,
  ...props
}: ButtonProps) => {
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return '14px';
      case 'medium':
        return '18px';
      default:
        return '18px'; // default size for large and undefined
    }
  };

  const iconStyle = { fontSize: getIconSize() };

  const renderIcon = (icon: React.ReactElement<SvgIconProps> | undefined) => {
    return icon ? React.cloneElement(icon, { style: iconStyle }) : null;
  };

  return (
    <MuiButton
      size={size}
      startIcon={renderIcon(startIcon)}
      endIcon={renderIcon(endIcon)}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <CircularProgress
          sx={{ color: props.color === 'error' ? '#C4441C' : '#EFEFEF' }}
          size={18}
        />
      ) : (
        children
      )}
    </MuiButton>
  );
};

// const BootstrapButton = styled(Button)<IButtonProps>`
//   ${({ theme, ...props }) => css`
//     ${props.texttransform &&
//     css`
//       text-transform: ${props.texttransform} !important;
//     `}
//     ${props.padding &&
//     css`
//       padding: ${props.padding} !important;
//     `}
//     ${props.rounded === 'true' &&
//     css`
//       border-radius: 20px;
//     `}
//     ${props.bgcolor &&
//     css`
//       background-color: ${props.bgcolor} !important;
//     `}
//   `}
// `;
