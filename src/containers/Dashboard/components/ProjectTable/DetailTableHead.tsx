import { TableHead, TableRow } from '@mui/material';

import { HeaderCell } from './Style';

export const DetailTableHead = () => {
  return (
    <TableHead>
      <TableRow sx={{ height: '56px' }}>
        <HeaderCell islarge='false'>Target</HeaderCell>
        <HeaderCell islarge='false'>Dialect</HeaderCell>
        <HeaderCell islarge='false'>Voice</HeaderCell>
        <HeaderCell islarge='false'>Status</HeaderCell>
        <HeaderCell islarge='false'>Last Edited</HeaderCell>
        <HeaderCell islarge='false' sx={{ width: '48%' }} />
      </TableRow>
    </TableHead>
  );
}
