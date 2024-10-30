import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { SvgImage } from '~/components/ui';

interface IPwdValidate {
  pwd: string;
}

export const PwdValidate = ({ pwd }: IPwdValidate) => {
  const [hasLength, setHasLength] = useState<boolean>(false);
  const [hasUppercase, setHasUppercase] = useState<boolean>(false);
  const [hasLowercase, setHasLowercase] = useState<boolean>(false);
  const [hasNumber, setHasNumber] = useState<boolean>(false);

  useEffect(() => {
    if (pwd.length > 7) {
      setHasLength(true);
    } else {
      setHasLength(false);
    }

    const containsUpperCase = (str: string): boolean =>
      str !== str.toLowerCase();
    setHasUppercase(containsUpperCase(pwd));

    const containsLowerCase = (str: string): boolean =>
      str !== str.toUpperCase();
    setHasLowercase(containsLowerCase(pwd));

    const containsNumber = (str: string): boolean => /\d/.test(str);
    setHasNumber(containsNumber(pwd));
  }, [pwd, pwd.length]);

  return (
    <Box mt={1}>
      <Typography variant='subtitle2' color='#1B1B1F'>
        Your password must contain:
      </Typography>
      <Box display='flex' alignItems='center' gap={1} mt='2px'>
        <PwdTxt isValid={hasLength}>
          <SvgImage name={hasLength ? 'CheckGreenIcon' : 'CheckIcon'} /> 8
          characters
        </PwdTxt>
        <PwdTxt isValid={hasUppercase}>
          <SvgImage name={hasUppercase ? 'CheckGreenIcon' : 'CheckIcon'} /> 1
          uppercase
        </PwdTxt>
        <PwdTxt isValid={hasLowercase}>
          <SvgImage name={hasLowercase ? 'CheckGreenIcon' : 'CheckIcon'} /> 1
          lowercase
        </PwdTxt>
        <PwdTxt isValid={hasNumber}>
          <SvgImage name={hasNumber ? 'CheckGreenIcon' : 'CheckIcon'} /> 1
          number
        </PwdTxt>
      </Box>
    </Box>
  );
}

const PwdTxt = styled(Box)<{ isValid: boolean }>(({ isValid }) => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '20px',
  color: isValid ? '#3A4ADE' : '#C4C5D0',
  '&:hover': {
    cursor: 'pointer',
  },
}));
