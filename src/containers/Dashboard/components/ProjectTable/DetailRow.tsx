import { useRouter } from 'next/router';
import { TableRow } from '@mui/material';

import { formattedDate, getVoiceLabel, getLanguageInfo } from '~/utils/helpers';
import {
  PROJECT_ACCESSED_LANGUAGE,
  ROUTES,
  STATUS_VALUES,
  Status,
} from '~/config';
import { useLocalStorage } from '~/utils/hooks';

import { StatusCard } from './StatusCard';
import { Cell } from './Style';

interface IDetailRow {
  detail: any;
}

export const DetailRow = ({ detail }: IDetailRow) => {
  const router = useRouter();
  const [projectLangList, setProjectLangList] = useLocalStorage(
    PROJECT_ACCESSED_LANGUAGE,
    []
  );

  const handleStatus = (status: any, dubStatus: Status) => {
    if (status === Status.Submitted) {
      return <StatusCard title='Submitted' />;
    }
    if (STATUS_VALUES.includes(dubStatus) || STATUS_VALUES.includes(status)) {
      return (
        <StatusCard
          title={STATUS_VALUES.includes(dubStatus) ? 'Dubbing' : 'Translating'}
        />
      );
    }
    if (status === Status.Error || dubStatus === Status.Error) {
      return <StatusCard title='Error' variant='secondary' />;
    }
    if (status === Status.Complete || dubStatus === Status.Complete) {
      return (
        <StatusCard
          title={dubStatus === Status.Complete ? 'Dubbed' : 'Translated'}
          variant='success'
        />
      );
    }
    return ' - ';
  };

  const handleEdit = () => {
    // Setting selected language, accent, voice into localStorage
    const projectData = {
      projectId: detail.projectId,
      language: detail.language,
      dialect: detail.dub?.language,
      voice: detail.dub?.voiceMatchingMode,
    };
    const filterIndex = projectLangList?.findIndex(
      (projectLang: any) => projectLang.projectId === detail.projectId
    );
    if (filterIndex !== -1) {
      projectLangList[filterIndex] = projectData;
    } else {
      projectLangList.push(projectData);
    }
    setProjectLangList(projectLangList);

    router.push(`${ROUTES.PROJECTS}/${detail.projectId}`);
  };

  return (
    <TableRow
      key={detail.id}
      sx={{ height: '56px' }}
      onClick={handleEdit}
      data-cy={detail.dub?.id}
    >
      <Cell>
        {
          getLanguageInfo(
            detail.dub?.language ? detail.dub?.language : detail.language
          ).lang
        }
      </Cell>
      <Cell>{getLanguageInfo(detail.dub?.language).dialect}</Cell>
      <Cell>{getVoiceLabel(detail.dub?.voiceMatchingMode)}</Cell>
      <Cell>{handleStatus(detail.status, detail.dub?.status)}</Cell>
      <Cell>{formattedDate(detail.updatedAt)}</Cell>
      <Cell style={{ width: '40%' }} />
    </TableRow>
  );
};
