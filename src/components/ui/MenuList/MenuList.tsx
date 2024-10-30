import * as React from 'react';
import { MenuList, Box } from '@mui/material';

import { CustomMenuItem } from '../MenuItem';

interface CustomMenuListProps {
  menuItems: React.ComponentProps<typeof CustomMenuItem>[];
}

export const CustomMenuList = ({ menuItems }: CustomMenuListProps) => {
  return (
    <Box sx={{ width: '280px' }}>
      <MenuList>
        {menuItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <CustomMenuItem key={index} {...item} />
        ))}
      </MenuList>
    </Box>
  );
};
