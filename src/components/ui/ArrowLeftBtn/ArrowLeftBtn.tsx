import { IconButton } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IArrowLeftBtn {
  disabled: boolean;
  id: string;
  isArrowDown: boolean;
  onClick: (id: string) => void;
}

export const ArrowLeftBtn = ({
  disabled,
  id,
  isArrowDown,
  onClick,
}: IArrowLeftBtn) => {
  return (
    <IconButton disabled={disabled} onClick={() => onClick(id)} color='neutral'>
      {isArrowDown ? (
        <ArrowDropDownIcon sx={{ color: '#000' }} />
      ) : (
        <ArrowRightIcon sx={{ color: '#000' }} />
      )}
    </IconButton>
  );
}
