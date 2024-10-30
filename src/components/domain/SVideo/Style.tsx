import {
  Box,
  styled,
  Switch,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';

export const PlayWrapper = styled(Box)<{ type: string }>(
  ({ type = 'video' }) => ({
    position: 'absolute',
    right: '24px',
    top: type === 'audio' ? '8px' : '12px',
    zIndex: 1,
  })
);

export const TooltipWrapper = styled(Box)<{ type: string }>(
  ({ type = 'video' }) => ({
    position: 'absolute',
    top: type === 'audio' ? '8px' : '12px',
    left: '24px',
    zIndex: 1,
    background: '#1B1B1F',
    padding: '4px 12px 4px 12px',
    borderRadius: '4px',
  })
);

export const AntSwitch = styled(Switch)(() => ({
  width: 26,
  height: 10.4,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    width: 15.6,
    height: 15.6,
  },
  '& .MuiSwitch-track': {
    height: 10.4,
  },
}));

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: '#45464F',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    color: '#fff',
    marginLeft: '6px !important',
  },
}));
