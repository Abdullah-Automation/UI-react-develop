import { Box, Typography, IconButton, styled } from '@mui/material';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CompressIcon from '@mui/icons-material/Compress';
import AddIcon from '@mui/icons-material/Add';

interface ISegmentTool {
  index: number;
  onAddSegment: (index: number, type: string) => void;
  onMergeSegment: (index: number, type: string) => void;
  onDeleteSegment: (index: number, type: string) => void;
}

export const SegmentTool = ({
  index,
  onAddSegment,
  onMergeSegment,
  onDeleteSegment,
}: ISegmentTool) => {
  return (
    <>
      <ToolWrapper direction='add'>
        <SegmentIconToolBtn
          onClick={() => onAddSegment(index, 'transcription')}
          size='small'
          color='neutral'
        >
          <AddIcon sx={{ fontSize: 16 }} />
        </SegmentIconToolBtn>
      </ToolWrapper>
      <ToolWrapper direction='merge'>
        <SegmentIconToolBtn
          onClick={() => onMergeSegment(index, 'transcription')}
          size='small'
          color='neutral'
        >
          <CompressIcon sx={{ fontSize: 16 }} />
        </SegmentIconToolBtn>
      </ToolWrapper>
      <ToolWrapper>
        <SegmentIconToolBtn
          onClick={() => onDeleteSegment(index, 'transcription')}
          size='small'
          color='neutral'
        >
          <DeleteOutlineIcon sx={{ fontSize: 16 }} />
        </SegmentIconToolBtn>
      </ToolWrapper>
    </>
  );
};

interface IPlayback {
  segmentDubUrl: string;
  isPlaying: boolean;
  isDub: boolean | 'progress';
  segment: any;
  handlePause: () => void;
  handlePlayClick: () => void;
  handleRefresh: (info: any) => void;
}

export const TranslationPlayback = ({
  isDub,
  isPlaying,
  segmentDubUrl,
  handlePause,
  handlePlayClick,
}: IPlayback) => {
  const playIconDisabled =
    isDub === true && (!segmentDubUrl || segmentDubUrl === '');

  if (!isDub) {
    return null;
  }

  return (
    <IconButton
      onClick={
        isPlaying ? handlePause : playIconDisabled ? undefined : handlePlayClick
      }
      size='small'
      sx={{
        color: playIconDisabled ? '#B0B0B0' : 'inherit',
      }}
    >
      {isPlaying ? (
        <PauseCircleOutlineIcon />
      ) : (
        <PlayCircleOutlineIcon
          sx={{
            opacity: playIconDisabled ? 0.5 : 1,
          }}
        />
      )}
    </IconButton>
  );
};

export const AudioWrapper = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#EFF0F4',
        p: '37px',
        mb: 1,
      }}
    >
      <HeadphonesOutlinedIcon sx={{ color: '#c5c7cb', fontSize: '40px' }} />
    </Box>
  );
};

interface IErrorSection {
  mediaCategory: string;
  isOverlap?: boolean;
}

export const ErrorSection = ({ mediaCategory }: IErrorSection) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p:
            mediaCategory === 'video'
              ? '127px 153px 127px 153px'
              : '37px 324px 37px 324px',
          background: mediaCategory === 'video' ? '#1B1B1F' : '#EFF0F4',
        }}
      >
        <ErrorIcon
          sx={{
            fontSize: '40px',
            color: mediaCategory === 'video' ? '#FFFFFF' : '#45464F',
            opacity: mediaCategory === 'video' ? 1 : 0.24,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: '',
          padding: '16px 14px 16px 14px',
          gap: '11px',
          border: '0.5px solid #C4441C',
          background: '#C4441C14',
          borderRadius: '4px',
          mt: 2,
        }}
      >
        <ErrorIcon sx={{ color: '#C4441C' }} />
        <Typography variant='body2' color='#45464F'>
          Something went wrong with this dub and our team is working hard on it
          for you. Please come back later. Meanwhile you can check the status in
          the dashboard.
        </Typography>
      </Box>
    </Box>
  );
};

export const VideoWrapper = styled(Box)<{ isaudio?: string }>(
  // @ts-ignore
  ({ isaudio }) => ({
    height: 'calc(100vh - 148px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      cursor: 'pointer',
    },
  })
);

export const SegmentTextAreaWrapper = styled(Box)<{
  isborder: string;
  isscrollbar: string;
  isloading: string;
}>(({ isborder, isscrollbar = 'true', isloading = false }) => ({
  position: 'relative',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: isloading === 'true' ? 'center' : 'flex-start',
  gap: '12px',
  padding: '16px 16px 16px 20px',
  paddingRight:
    isborder === 'true' ? '12px' : isscrollbar === 'false' ? '12px' : '6px',
  borderBottom: '1px solid #E0E1EC',
  borderRight: isborder === 'true' ? '1px solid #E0E1EC' : 'none',
}));

export const EditorWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const Editor = styled(`textarea`)({
  width: '100%',
  color: '#1B1B1F',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: 'Inter, Arial, sans-serif, -apple-system',
  height: 'auto',
  border: 'none',
  outline: 'none',
  resize: 'none',
  overflow: 'hidden',
  lineHeight: '20px',
  padding: '0px',
});

export const Overlay = styled(Box)<{ isbackground?: string }>(
  ({ isbackground = 'true' }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:
      isbackground === 'true' ? 'rgba(255, 255, 255, 0.5)' : 'unset', // Light grey with opacity
    zIndex: 3,
  })
);

export const SegmentIconToolBtn = styled(IconButton)({
  borderRadius: '8px',
  background: '#fff',
  border: '1px solid #C4C5D0',
});

export const ToolWrapper = styled(Box)<{ direction?: string }>(
  ({ direction = 'delete' }) => ({
    position: 'absolute',
    bottom: direction === 'delete' ? '50%' : '-12px',
    left:
      direction === 'delete'
        ? 'calc(50% + 3px)'
        : direction === 'merge'
        ? 'calc(50% - 41px)'
        : 'calc(50% - 9px)',
    transform: direction === 'delete' ? 'translate(-50%, 50%)' : 'none',
    zIndex: 2,
  })
);
