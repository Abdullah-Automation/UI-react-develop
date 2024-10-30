import { Box, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { LightTooltip } from '~/components/ui';

interface IDubTooltip {
  showOriginalTooltip: boolean;
}

export const DubTooltip = ({ showOriginalTooltip = false }: IDubTooltip) => {
  return (
    <Box position='absolute' top='6px' right='-28px'>
      <LightTooltip
        placement='top'
        title={
          <Box width='314px'>
            <Typography
              variant='caption'
              fontWeight={400}
              pb='10px'
              sx={{ display: 'block' }}
            >
              {showOriginalTooltip
                ? `Native speaker: Optimize for voice characteristics of native speaker/s in target language`
                : `This dialect currently only supports using the voice of original speaker.`}
            </Typography>
            <Typography variant='caption' fontWeight={400}>
              Original speaker: Optimize for original speaker voice
              characteristics
            </Typography>
          </Box>
        }
      >
        <InfoOutlinedIcon sx={{ fontSize: 20, color: '#909094' }} />
      </LightTooltip>
    </Box>
  );
};
