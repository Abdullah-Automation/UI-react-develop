import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Box, Checkbox, TableRow, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ProjectsApi, IUpdateProject } from '~/api';
import { useAuth, useToast } from '~/context';
import {
  duration,
  formattedDate,
  getLanguageLabel,
  getProjectDetails,
} from '~/utils/helpers';
import { DeleteProjectModal, ShareProjectModal } from '~/components/domain';
import { ArrowLeftBtn } from '~/components/ui';
import { ROUTES, STATUS_VALUES, Status } from '~/config';

import { StatusCard } from './StatusCard';
import { DetailTable } from './DetailTable';
import { ProjectMenu } from './ProjectMenu';
import { Cell } from './Style';
import { ProjectRowRename } from './ProjectRowRename';
import { ProjectRowThumbnail } from './ProjectRowThumbnail';

interface IProjectRow {
  project: any;
  refreshProjects: () => void;
  handleCheck: (checked: boolean, id: string) => void;
  lastRow?: boolean;
}

export const ProjectRow = ({
  project,
  refreshProjects,
  handleCheck,
  lastRow,
}: IProjectRow) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const btnProjectRef = useRef(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteProjetType, setDeleteProjectType] = useState<string>('general');
  const [openShareProjectModal, setOpenShareProjectModal] =
    useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string>('');
  const [deleteProjectName, setDeleteProjectName] = useState<string>('');
  const [deleteSharedProjectId, setDeleteSharedProjectId] =
    useState<string>('');
  const [updatedName, setUpdatedName] = useState<string>('');
  const [isRename, setIsRename] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | false>(false);

  const { showSuccessToast, showErrorToast } = useToast();
  const { currentUser } = useAuth();

  const { mutate: updateProject } = useMutation(
    (data: IUpdateProject) => ProjectsApi.updateProject(deleteProjectId, data),
    {
      onSuccess: () => {
        showSuccessToast('Rename success!');
        refreshProjects();
      },
      onError: () => {
        showErrorToast('Rename is failed!');
      },
    }
  );

  const toggleRow = (rowId: string) => {
    setExpanded(rowId === expanded ? false : rowId);
  };

  const handleRedirect = () => {
    if (project?.transcription?.status === Status.Complete) {
      router.push(`${ROUTES.PROJECTS}/${project.id}`);
    }
  };

  const handleProjectSetting = (
    e: React.MouseEvent<HTMLElement>,
    id: string,
    name: string
  ) => {
    e.stopPropagation();
    // @ts-ignore
    btnProjectRef?.current?.blur();
    setAnchorEl(e.currentTarget);
    setDeleteProjectId(id);
    setDeleteSharedProjectId(id);
    setDeleteProjectName(name);
    window.analytics.track(`Open project settings ${project.name}`, {
      project,
    });
  };

  const handleEditName = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
    setIsRename(true);
    setUpdatedName(deleteProjectName);
    window.analytics.track(`Open rename modal ${project.name}`, { project });
  };

  const handleDeleteProject = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
    setOpenDeleteModal(true);
    setDeleteProjectType('general');
    window.analytics.track(`Open Delete modal ${project.name}`, { project });
  };

  const handleDeleteSharedProject = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
    window.analytics.track(`Delete project for me ${project.name}`, {
      project,
    });
    setOpenDeleteModal(true);
    setDeleteProjectType('shared');
  };

  const handleShareProject = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
    setOpenShareProjectModal(true);
    window.analytics.track(`Open share modal ${project.name}`, {});
  };

  const handleDelete = (type: string) => {
    refreshProjects();
    setOpenDeleteModal(false);
    window.analytics.track(`Delete ${type} project modal ${project.name}`, {
      project,
    });
  };

  const handleRename = (e: any) => {
    e.stopPropagation();
    setUpdatedName(e.target.value);
    window.analytics.track(
      `Rename: project modal ${project.name} to ${e.target.value}`,
      {}
    );
  };

  const handleRenameSave = (e: any) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      setIsRename(false);
      updateProject({
        name: updatedName,
        isDeleted: false,
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckItem = (e: ChangeEvent<HTMLInputElement>) => {
    handleCheck(e.target.checked, project.id);
  };

  const getOwnerName = (owner: any) => {
    const ownerName = `${owner?.firstName} ${owner?.lastName}`;
    const authName = `${currentUser?.firstName} ${currentUser?.lastName}`;

    return ownerName === authName ? 'Me' : ownerName;
  };

  useEffect(() => {
    const isCompleteProject = project.translations.findIndex(
      (translation: any) =>
        STATUS_VALUES.includes(translation.status as Status) ||
        translation.dub.findIndex((dub: any) =>
          STATUS_VALUES.includes(dub.status as Status)
        ) !== -1
    );

    setExpanded(isCompleteProject !== -1 ? project.id : false);
  }, [project]);

  useEffect(() => {
    if (!openDeleteModal) {
      setDeleteProjectId('');
      setDeleteProjectName('');
    }
  }, [openDeleteModal]);

  useEffect(() => {
    if (!openShareProjectModal) {
      setDeleteProjectId('');
      setDeleteProjectName('');
    }
  }, [openShareProjectModal]);

  return (
    <>
      <TableRow aria-selected={open} data-cy={project.id}>
        <Cell
          style={{ width: '3%' }}
          isborder='none'
          onClick={e => e.stopPropagation()}
        >
          <Checkbox
            checked={project.checked}
            onChange={handleCheckItem}
            data-cy='selectProject'
          />
        </Cell>
        <Cell style={{ width: '41%' }} isborder='none' scope='row'>
          <Box display='flex' alignItems='center'>
            <ArrowLeftBtn
              disabled={project.transcription?.status !== Status.Complete}
              id={project.id}
              isArrowDown={expanded === project.id}
              onClick={toggleRow}
            />
            <ProjectRowThumbnail
              project={project}
              onRedirect={handleRedirect}
            />
            <ProjectRowRename
              isRename={isRename}
              updatedName={updatedName}
              deleteProjectId={deleteProjectId}
              project={project}
              onRename={handleRename}
              onRenameSave={handleRenameSave}
              onRedirect={handleRedirect}
            />
          </Box>
        </Cell>
        <Cell style={{ width: '10%' }} isborder='none' onClick={handleRedirect}>
          {getOwnerName(project.owner)}
        </Cell>
        <Cell style={{ width: '10%' }} isborder='none' onClick={handleRedirect}>
          {project.transcription?.status === Status.Complete ? (
            getLanguageLabel(project.transcription?.language)
          ) : (
            <StatusCard title='Transcribing' />
          )}
        </Cell>
        <Cell style={{ width: '10%' }} isborder='none' onClick={handleRedirect}>
          {project.content?.contentDuration
            ? duration(project.content?.contentDuration)
            : ' - '}
        </Cell>
        <Cell style={{ width: '12%' }} isborder='none' onClick={handleRedirect}>
          {project.createdAt ? formattedDate(project.createdAt) : ' - '}
        </Cell>
        <Cell style={{ width: '12%' }} isborder='none' onClick={handleRedirect}>
          {project.lastAccessed && project.lastAccessed[0]
            ? formattedDate(project.lastAccessed[0].lastAccessedDate)
            : ' - '}
        </Cell>
        <Cell
          style={{ width: '5%' }}
          isborder='none'
          onClick={e => e.stopPropagation()}
        >
          <IconButton
            aria-modal={open}
            ref={btnProjectRef}
            color='neutral'
            onClick={e => handleProjectSetting(e, project.id, project.name)}
          >
            <MoreVertIcon />
          </IconButton>
        </Cell>
      </TableRow>
      {expanded === project.id && (
        <DetailTable
          details={getProjectDetails(project)}
          onRedirect={handleRedirect}
        />
      )}
      {open && (
        <ProjectMenu
          data-cy='projectActions'
          open={open}
          anchorEl={anchorEl}
          projectId={project.id}
          ownerId={project.owner.id}
          currentUserId={currentUser?.id}
          lastRow={lastRow}
          handleClose={handleClose}
          handleShareProject={handleShareProject}
          handleDeleteProject={handleDeleteProject}
          handleDeleteSharedProject={handleDeleteSharedProject}
          handleEditName={handleEditName}
        />
      )}
      {openShareProjectModal && (
        <ShareProjectModal
          open={openShareProjectModal}
          projectName={deleteProjectName}
          projectId={project?.id}
          handleClose={() => setOpenShareProjectModal(false)}
        />
      )}
      {openDeleteModal && (
        <DeleteProjectModal
          open={openDeleteModal}
          deleteProjectId={
            deleteProjetType === 'shared'
              ? deleteSharedProjectId
              : deleteProjectId
          }
          type={deleteProjetType}
          deleteProjectName={deleteProjectName}
          onClose={() => setOpenDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
