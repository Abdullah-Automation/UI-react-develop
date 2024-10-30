import { styled } from '@mui/material/styles';
import { TableCell, Box } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const HeaderCell = styled(TableCell)<{ islarge?: string }>(
  ({ islarge = 'true' }) => ({
    fontWeight: islarge === 'true' ? 600 : 500,
    fontSize: '14px',
    color: islarge === 'true' ? '#8F9099' : '#909094',
    lineHeight: '20px',
    padding: '16px',
    borderBottom: islarge === 'true' ? 'none' : '1px solid #E0E1EC',
    cursor: 'default',
  })
);

export const Cell = styled(TableCell)<{
  isborder?: string;
}>(({ isborder = 'true' }) => ({
  fontWeight: '500',
  fontSize: '14px',
  color: '#45464F',
  padding: '16px',
  letterSpacing: '0.1px',
  borderBottom: isborder === 'true' ? '1px solid #E0E1EC' : 'none',
  cursor: 'pointer',
}));

export const Transcription = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
  borderRadius: '5px',
  width: '55px',
  height: '32px',
  zIndex: 9,
});

export const Audio = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'radial-gradient(62.3% 62.3% at 50% 50%, #FFFFFF 0%, #F4F6FF 100%)',
  borderRadius: '5px',
  width: '55px',
  height: '32px',
});

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  margin: '-8px',
  border: `none`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '8px 0px 16px 96px',
  border: 'none',
}));
