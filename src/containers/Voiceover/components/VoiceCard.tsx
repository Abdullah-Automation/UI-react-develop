import { styled } from '@mui/styles';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface IVoiceCard {
  title: string;
  desc: string;
  onClick: () => void;
}

export const VoiceCard = ({ title, desc, onClick }: IVoiceCard) => {
  return (
    <Wrapper onClick={onClick}>
      <Box display='flex' flexDirection='column' maxWidth='168px' gap={1}>
        <Typography variant='h5' color='#1B1B1F'>
          {title}
        </Typography>
        <Typography variant='caption' color='#5D5E66'>
          {desc}
        </Typography>
      </Box>
      <IconButton sx={{ p: 0, width: '40px', height: '40px' }}>
        <AddIcon sx={{ fontSize: 40, color: '#1B1B1F' }} />
      </IconButton>
    </Wrapper>
  );
}

const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '70px',
  background: '#45464F14',
  borderRadius: '4px',
  cursor: 'pointer',
  padding: '16px 24px',
});
