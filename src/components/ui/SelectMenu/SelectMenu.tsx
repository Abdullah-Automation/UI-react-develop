import React from 'react';
import { Box, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Add from '@mui/icons-material/Add';

import { CustomMenuItem } from '../MenuItem';

interface SelectedMenuProps {
  isSpeakerLabel?: boolean;
  options: string[];
}

export const SelectedMenu = ({
  isSpeakerLabel,
  options,
}: SelectedMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (value: string) => {
    setSelectedIndex(options.indexOf(value));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {isSpeakerLabel ? (
        <>
          <Button
            id='demo-customized-button'
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            variant='text'
            color='neutral'
            sx={{
              padding: '0px 0px',
              height: '20px',
              backgroundColor: 'transparent',
              color: 'rgba(144, 144, 148, 1)',
              typography: 'body2',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'rgba(27, 27, 31, 1)',
              },
              // Focus styles only apply if the button is not currently active
              '&:focus': {
                backgroundColor: 'transparent',
                color: 'rgba(144, 144, 148, 1)',
              },
              '&:active': {
                backgroundColor: 'transparent',
                color: 'rgba(27, 27, 31, 1)',
              },
            }}
            onClick={handleClick}
          >
            {options[selectedIndex]}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            sx={{ marginTop: '8px' }}
          >
            <Box sx={{ width: '200px' }}>
              <MenuList>
                {options.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <CustomMenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type='1-line'
                    secondaryText={item}
                    selected={index === selectedIndex}
                    onClick={() => handleSelect(item)}
                  />
                ))}
                <CustomMenuItem
                  leadingIcon={<Add />}
                  type='1-line'
                  primaryText='Add a new speaker'
                  divider
                />
              </MenuList>
            </Box>
          </Menu>
        </>
      ) : (
        <>
          <Button
            id='demo-positioned-button'
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            variant='text'
            color='neutral'
            sx={{ typography: 'body2', height: '32px' }}
            onClick={handleClick}
            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {options[selectedIndex]}
          </Button>
          <Menu
            id='demo-positioned-menu'
            aria-labelledby='demo-positioned-button'
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            sx={{ marginTop: '8px' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box sx={{ width: '280px' }}>
              <MenuList>
                {options.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <CustomMenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    type='1-line'
                    secondaryText={item}
                    selected={index === selectedIndex}
                    onClick={() => handleSelect(item)}
                  />
                ))}
              </MenuList>
            </Box>
          </Menu>
        </>
      )}
    </Box>
  );
};
