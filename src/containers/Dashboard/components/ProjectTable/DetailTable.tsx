import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
} from '@mui/material';

import { Cell, Accordion, AccordionDetails } from './Style';
import { DetailRow } from './DetailRow';
import { DetailEmpty } from './DetailEmpty';
import { DetailTableHead } from './DetailTableHead';

interface IDetailTable {
  details: any[];
  onRedirect: () => void;
}

export const DetailTable = ({ details = [], onRedirect }: IDetailTable) => {
  const isDetailsEmpty = details.length === 0;

  return (
    <TableRow
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Cell colSpan={7} isborder='none'>
        {isDetailsEmpty ? (
          <DetailEmpty onRedirect={onRedirect} />
        ) : (
          <Accordion>
            <AccordionDetails>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: window.innerHeight }}
              >
                <Table stickyHeader sx={{ cursor: 'default' }}>
                  <DetailTableHead />
                  <TableBody>
                    {details.map((detail: any) => (
                      <DetailRow key={detail.id} detail={detail} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        )}
      </Cell>
    </TableRow>
  );
}
