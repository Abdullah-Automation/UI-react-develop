import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { Pagination } from '~/components/ui';
import { TableLoader } from '~/components/domain';
import { CollaborationsApi, ProjectsApi } from '~/api';
import { useAuth } from '~/context';

import { EmptyContent } from './EmptyContent';
import { ProjectRow } from './ProjectRow';
import { Cell } from './Style';
import { ProjectTool } from './ProjectTool';
import { ProjectTableHead } from './ProjectTableHead';

interface IProjectTable {
  isLoading: boolean;
  data: any;
  onUpload: (isManual: boolean) => void;
  refreshProjects: () => void;
  getSelectedProjects: (pageIndex: number) => void;
}

export const ProjectTable = ({
  isLoading = false,
  data,
  onUpload,
  refreshProjects,
  getSelectedProjects,
}: IProjectTable) => {
  const { currentUser } = useAuth();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [projects, setProjects] = useState<any[]>([]);

  const { mutate: deleteProject } = useMutation(
    (deleteProjectId: string) =>
      ProjectsApi.updateProject(deleteProjectId, { isDeleted: true }),
    {
      onSuccess: () => {
        refreshProjects();
      },
      onError: () => {},
    }
  );

  const { mutate: deleteSharedProject } = useMutation(
    (deleteSharedProjectId: string) =>
      CollaborationsApi.deleteSharedProject({
        projectId: deleteSharedProjectId,
      }),
    {
      onSuccess: () => {
        refreshProjects();
      },
      onError: () => {},
    }
  );

  const handlePageClick = (event: { selected: number }) => {
    getSelectedProjects(event.selected);
  };

  const handleCheckAll = (e: any) => {
    setCheckedAll(e.target.checked);
    setProjects(projects.map(item => ({ ...item, checked: e.target.checked })));
  };

  const handleCheck = (checked: boolean, projectId: string) => {
    const tempProjects = [...projects];
    const checkedProjectIndex = tempProjects.findIndex(
      project => project.id === projectId
    );
    tempProjects[checkedProjectIndex].checked = checked;

    setProjects([...tempProjects]);
  };

  const handleSelectedDelete = () => {
    const ids = projects
      .filter(project => project.checked)
      .map(project => {
        if (project.owner.id === currentUser?.id) {
          deleteProject(project.id);
        } else {
          deleteSharedProject(project.id);
        }

        return project.id;
      });

    setProjects(prevProjects =>
      prevProjects.filter(project => !ids.includes(project.id))
    );
  };

  useEffect(() => {
    if (data?.totalPages && data.results.length > 0) {
      setPageCount(data.totalPages);
      setProjects(
        data.results.map((item: any) => ({ ...item, checked: false }))
      );
    } else {
      setProjects([]);
    }
  }, [data?.totalPages, data?.results]);

  const checkedIndeterminate = useMemo(() => {
    if (projects.length > 0) {
      const filteredCheckIndex = projects.findIndex(
        item => item.checked === false
      );
      if (filteredCheckIndex === -1) {
        setCheckedAll(true);

        return false;
      }
      setCheckedAll(false);

      const filteredUnCheckIndex = projects.findIndex(
        item => item.checked === true
      );

      if (filteredUnCheckIndex === -1) {
        return false;
      }

      return true;
    }
    setCheckedAll(false);
    return false;
  }, [projects]);

  const checkedLength = useMemo(() => {
    return projects.filter(project => project.checked).length;
  }, [projects]);

  return (
    <Box pb='90px'>
      <ProjectTool
        checkedLength={checkedLength}
        onSelectedDelete={handleSelectedDelete}
        onUpload={() => onUpload(true)}
      />

      <Box sx={{ background: '#FFFFFF' }}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: window.innerHeight }}
        >
          <Table stickyHeader>
            <ProjectTableHead
              checkedAll={checkedAll}
              checkedIndeterminate={checkedIndeterminate}
              onCheckAll={handleCheckAll}
            />

            <TableBody>
              {projects.length > 0 ? (
                <>
                  {projects.map((project: any, index: number) => (
                    <ProjectRow
                      key={project.id}
                      project={project}
                      handleCheck={handleCheck}
                      refreshProjects={refreshProjects}
                      lastRow={index === projects.length - 1}
                    />
                  ))}
                </>
              ) : isLoading ? (
                [0, 1, 2, 3, 4].map(_item => (
                  <TableRow key={_item}>
                    <Cell colSpan={8}>
                      <TableLoader />
                    </Cell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{
                    '&:hover': {
                      backgroundColor: 'inherit',
                    },
                  }}
                >
                  <Cell colSpan={8} sx={{ borderBottom: 'none' }}>
                    <EmptyContent />
                  </Cell>
                </TableRow>
              )}
              {pageCount > 1 && (
                <TableRow>
                  <Cell colSpan={8}>
                    <Pagination
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={1}
                      pageCount={pageCount}
                    />
                  </Cell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
