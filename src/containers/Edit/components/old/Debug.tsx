import { Typography } from '@mui/material';

interface IDebugDub {
  dubId: string;
  formattedDate: any;
  contentFileUUID: string;
  dubStatus: string;
  targetAccent: string;
  targetVoice: string;
}

export const DebugDub = ({
  dubId,
  formattedDate,
  contentFileUUID,
  dubStatus,
  targetAccent,
  targetVoice,
}: IDebugDub) => {
  return (
    <Typography
      color='black'
      fontWeight='500'
      variant='body2'
      sx={{
        position: 'absolute',
        top: 0, // adjust these values
        left: 0, // as per your requirements
        ml: 1,
        backgroundColor: 'white',
        padding: '5px', // Optional: add some padding so the text doesn't touch the borders of the background
      }}
    >
      Dub Id: {dubId}
      <br />
      Dub Updated Date: {formattedDate} <br />
      fileUUID: {contentFileUUID} <br />
      Dub Status: {dubStatus} <br />
      User Accent: : {targetAccent} <br />
      Matching:{targetVoice}
    </Typography>
  );
}
