import React, { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';

import { CustomMenuItem } from '../MenuItem';

interface AvatarProps {
  letter: string;
  menuItems?: React.ComponentProps<typeof CustomMenuItem>[]; // Array of menu item labels
}

export const CustomAvatar = ({ letter, menuItems }: AvatarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatar = (letter: string) => {
    return (
      <Avatar
        sx={{
          bgcolor: 'rgba(69, 70, 79, 1)',
          width: 32,
          height: 32,
          fontSize: 14,
        }}
      >
        {letter}
      </Avatar>
    );
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {menuItems ? (
        <Box>
          <IconButton
            onClick={handleClick}
            color='neutral'
            sx={{
              width: 44,
              height: 44,
              borderRadius: 32,
            }}
          >
            {avatar(letter)}
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Box style={{ width: '280px' }}>
              <MenuList>
                {menuItems?.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <CustomMenuItem key={index} {...item} />
                ))}
              </MenuList>
            </Box>
          </Menu>
        </Box>
      ) : (
        avatar(letter)
      )}
    </>
  );
};
