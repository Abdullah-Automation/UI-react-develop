import { Checkbox, TableHead, TableRow } from '@mui/material';

import { HeaderCell } from '../ProjectTable/Style';

interface IReadyTranscribeHead {
  checkedAll: boolean;
  checkedIndeterminate: any;
  onCheckAll: (e: any) => void;
}

export const ReadyTranscribeHead = ({
  checkedAll,
  checkedIndeterminate,
  onCheckAll,
}: IReadyTranscribeHead) => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell>
          <Checkbox
            sx={{
              color: '#EFEDF5',
              '&.Mui-checked': {
                color: '#3E56F6',
              },
            }}
            checked={checkedAll}
            indeterminate={checkedIndeterminate}
            onChange={e => onCheckAll(e)}
          />
        </HeaderCell>
        <HeaderCell>Name</HeaderCell>
        <HeaderCell />
        <HeaderCell>Duration</HeaderCell>
        <HeaderCell style={{ textIndent: '14px' }}>Language</HeaderCell>
        <HeaderCell />
      </TableRow>
    </TableHead>
  );
}
