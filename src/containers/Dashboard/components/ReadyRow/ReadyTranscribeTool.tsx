import { Box, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Button } from '~/components/ui';

interface IReadyTranscribeTool {
  checkedLength: number;
  onSelectedTranscribe: () => void;
  onSelectedDelete: () => void;
}

export const ReadyTranscribeTool = ({
  checkedLength,
  onSelectedTranscribe,
  onSelectedDelete,
}: IReadyTranscribeTool) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      height='32px'
      mb={2}
    >
      <Typography variant='h4' sx={{ color: '#1B1B1F' }}>
        Ready to transcribe
      </Typography>
      <Box>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          sx={{ mr: 2 }}
          disabled={!(checkedLength > 0)}
          onClick={onSelectedTranscribe}
        >
          Transcribe
        </Button>
        <Button
          variant='outlined'
          color='neutral'
          size='small'
          disabled={!(checkedLength > 0)}
          startIcon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />}
          onClick={onSelectedDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
