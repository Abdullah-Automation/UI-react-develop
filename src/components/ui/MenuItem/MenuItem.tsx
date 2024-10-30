import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

interface CustomMenuItemProps {
  type: '1-line' | '2-line';
  leadingIcon?: React.ReactElement;
  divider?: boolean;
  primaryText?: string;
  secondaryText?: string;
  CustomAvatar?: React.ReactElement;
  selected?: boolean;
  onClick?: () => void;
}

export const CustomMenuItem = ({
  type,
  leadingIcon,
  divider = false,
  primaryText,
  secondaryText,
  CustomAvatar,
  selected = false,
  onClick,
}: CustomMenuItemProps) => {
  return (
    <>
      {divider && <Divider />}
      {type === '2-line' && CustomAvatar && (
        <MenuItem
          selected={selected}
          onClick={onClick}
          sx={{
            '&:hover': {
              cursor: 'text', // Change cursor to text cursor on hover
              backgroundColor: 'transparent',
            },
            '&:focus': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ListItemIcon style={{ marginRight: '16px' }}>
            {CustomAvatar}
          </ListItemIcon>
          <ListItemText
            primary={primaryText}
            secondary={secondaryText}
            primaryTypographyProps={{
              variant: 'h6',
            }}
            secondaryTypographyProps={{
              style: { fontSize: '14px' }, // Example styles for secondary text
            }}
          />
        </MenuItem>
      )}
      {leadingIcon && type === '1-line' && (
        <MenuItem selected={selected} onClick={onClick}>
          <ListItemIcon sx={{ minWidth: 'auto', '& svg': { fontSize: 18 } }}>
            {leadingIcon}
          </ListItemIcon>
          <ListItemText
            primary={primaryText}
            secondary={secondaryText}
            primaryTypographyProps={{
              variant: 'body2',
            }}
            secondaryTypographyProps={{
              style: { fontSize: '14px' }, // Example styles for secondary text
            }}
          />
        </MenuItem>
      )}
      {!primaryText && type === '1-line' && (
        <MenuItem
          selected={selected}
          onClick={onClick}
          sx={{
            '&&.Mui-selected': {
              backgroundColor: 'rgba(131, 42, 208, 1)',
              '.MuiListItemText-secondary': {
                // Targeting the secondary text specifically
                color: 'white',
              },
            },
            '&:focus': {
              backgroundColor: 'rgba(131, 42, 208, 1)',
              '.MuiListItemText-secondary': {
                // Targeting the secondary text specifically
                color: 'white',
              },
            },
          }}
        >
          <ListItemText secondary={secondaryText} />
        </MenuItem>
      )}
    </>
  );
};
