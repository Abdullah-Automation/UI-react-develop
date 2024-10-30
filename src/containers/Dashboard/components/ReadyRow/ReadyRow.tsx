import { useState } from 'react';
import {
  Box,
  Checkbox,
  TableRow,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useVariants } from '~/context';
import { Select } from '~/components/ui';
import { duration, sortLanguage } from '~/utils/helpers';

import { Cell } from '../ProjectTable/Style';

import { ReadyRowSetting } from './ReadyRowSetting';
import { Thumbnail } from './Thumbnail';
import { Rename } from './Rename';

interface IReadyRow {
  project: any;
  percentage: any;
  handleCheckItem: (checked: boolean, projectId: number) => void;
  handleCancel: (fileName: string) => void;
  handleSourceLangChange: (id: string, lang: string) => void;
}

export const ReadyRow = ({
  project,
  percentage,
  handleCheckItem,
  handleCancel,
  handleSourceLangChange,
}: IReadyRow) => {
  const { variants } = useVariants({});

  const [isRename, setIsRename] = useState<boolean>(false);
  const [updatedName, setUpdatedName] = useState<string>('');

  const handleEditName = (projectName: string) => {
    setIsRename(true);
    setUpdatedName(projectName);
  };

  const handleRename = (value: string) => {
    setUpdatedName(value);
  };

  const handleRenameSave = () => {
    setIsRename(false);
    project.name = updatedName;
  };

  const handleLangChange = (e: any) => {
    handleSourceLangChange(project.id, e.target.value);
  };

  return (
    <TableRow key={project.id}>
      <Cell style={{ width: '5%' }}>
        <Checkbox
          sx={{
            color: '#EFEDF5',
            '&.Mui-checked': {
              color: '#3E56F6',
            },
          }}
          checked={project.checked}
          onChange={e => handleCheckItem(e.target.checked, project.id)}
        />
      </Cell>
      <Cell scope='row'>
        <Box display='flex' alignItems='center'>
          <Thumbnail project={project} />
          <Rename
            project={project}
            isRename={isRename}
            updatedName={updatedName}
            onRename={handleRename}
            onRenameSave={handleRenameSave}
          />
        </Box>
      </Cell>
      <Cell style={{ width: '11%' }}>
        {percentage.projectId === project.id ? (
          <Box width='100%'>
            <LinearProgress
              variant='determinate'
              value={percentage.projectId === project.id ? percentage.value : 0}
            />
          </Box>
        ) : null}
      </Cell>
      <Cell style={{ width: '11%' }}>
        <Typography color='#45464F' variant='h6'>
          {project.contentDuration
            ? duration(project.contentDuration)
            : `Uploading...${
                percentage.projectId === project.id ? percentage.value : 0
              }%`}
        </Typography>
      </Cell>
      <Cell style={{ width: '11%' }}>
        <Select
          options={sortLanguage(variants, 'label').map(language => ({
            name: language.label,
            value: language.code,
          }))}
          disableUnderline
          sx={{ color: '#45464F', paddingLeft: '6px' }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 226,
              },
            },
          }}
          variant='filled'
          value={project.language}
          onChange={(e: any) => handleLangChange(e)}
          label={(value?: string) =>
            variants.filter(lang => lang.code === value)[0]?.label || ''
          }
        />
      </Cell>
      <Cell style={{ width: '5%' }}>
        {project.contentDuration > 0 ? (
          <ReadyRowSetting
            name={project.name}
            onEditName={handleEditName}
            handleCancel={handleCancel}
          />
        ) : (
          <IconButton
            color='neutral'
            onClick={() => handleCancel(project.name)}
          >
            <HighlightOffIcon />
          </IconButton>
        )}
      </Cell>
    </TableRow>
  );
}
