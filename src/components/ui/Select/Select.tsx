import React from 'react';
import {
  Box,
  Divider,
  MenuItem,
  Select as MuiSelect,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';

import { lightModeColors } from '~/config/theme/colors';

import { SelectProps } from './Select.types';

export const Select = ({
  value,
  placeholder,
  options,
  MenuProps,
  labelIcon,
  label,
  ...props
}: SelectProps) => {
  return (
    <MuiSelect
      value={value}
      // eslint-disable-next-line react/no-unstable-nested-components
      IconComponent={props => (
        <KeyboardArrowDownIcon {...props} sx={{ fontSize: '18px' }} />
      )}
      renderValue={value => (
        <Box display='flex' alignItems='center' gap={1}>
          {labelIcon}
          {label && (
            <Typography
              variant='h6'
              color='#45464F'
              textTransform='capitalize'
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'pre',
              }}
            >
              {label(value as string)}
            </Typography>
          )}
        </Box>
      )}
      style={{ height: '32px' }}
      MenuProps={{
        ...MenuProps,
        PaperProps: {
          ...MenuProps?.PaperProps,
          // style: {
          //   marginTop: '7px',
          // },
        },
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      }}
      {...props}
    >
      {(value === '' || value === 'none') && (
        <MenuItem value='none' disabled>
          <Typography
            color={lightModeColors.black10}
            variant='body2'
            textTransform='capitalize'
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'pre',
            }}
          >
            {placeholder}
          </Typography>
        </MenuItem>
      )}
      {options.map(option => [
        option.hasDivider && <Divider />,
        <MenuItem
          key={option.value}
          selected={option.value === value}
          value={option.value}
          disabled={option?.disabled ? option?.disabled : false}
          onClick={option.onClick ? option.onClick : null}
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Box display='flex' alignItems='center' gap='12px'>
              {option?.icon && (
                <DashboardCustomizeOutlinedIcon sx={{ fontSize: 18 }} />
              )}
              <Typography
                color={
                  option.value === value
                    ? 'rgba(131, 42, 208, 1)'
                    : lightModeColors.black10
                }
                variant='body2'
                textTransform='capitalize'
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'pre',
                }}
              >
                {option.name}
              </Typography>
            </Box>
            {/* {option.value === value && (
              <CheckIcon
                sx={{ fontSize: '18px', color: lightModeColors.purple }}
              />
            )} */}
          </Box>
        </MenuItem>,
      ])}
    </MuiSelect>
  );
};
