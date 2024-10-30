import { Checkbox, TableHead, TableRow } from '@mui/material';

import { HeaderCell } from './Style';

interface IProjectTableHead {
  checkedAll: boolean;
  checkedIndeterminate: any;
  onCheckAll: (e: any) => void;
}

export const ProjectTableHead = ({
  checkedAll,
  checkedIndeterminate,
  onCheckAll,
}: IProjectTableHead) => {
  return (
    <TableHead>
      <TableRow>
        <HeaderCell style={{ width: '3%' }}>
          <Checkbox
            data-cy='selectAllProjects'
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
        <HeaderCell style={{ width: '41%' }}>Name</HeaderCell>
        <HeaderCell style={{ width: '10%' }}>Owner</HeaderCell>
        <HeaderCell style={{ width: '10%' }}>Source</HeaderCell>
        <HeaderCell style={{ width: '10%' }}>Duration</HeaderCell>
        <HeaderCell style={{ width: '12%' }}>Date Created</HeaderCell>
        <HeaderCell style={{ width: '12%' }}>Last Accessed</HeaderCell>
        <HeaderCell style={{ width: '5%' }} />
      </TableRow>
    </TableHead>
  );
};
