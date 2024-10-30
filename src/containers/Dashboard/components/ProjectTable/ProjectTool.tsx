import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IProjectTool {
  checkedLength: number;
  onUpload: () => void;
  onSelectedDelete: () => void;
}

export const ProjectTool = ({
  checkedLength,
  onUpload,
  onSelectedDelete,
}: IProjectTool) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      height='32px'
      mb={2}
    >
      <Typography variant='h4'>My Dubs</Typography>
      <Box display='flex' gap={1}>
        <Button
          color='secondary'
          size='medium'
          startIcon={<AddIcon />}
          onClick={onUpload}
        >
          Upload file
        </Button>
        <Button
          variant='outlined'
          color='neutral'
          size='medium'
          disabled={!(checkedLength > 0)}
          startIcon={<DeleteOutlineIcon />}
          onClick={onSelectedDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
