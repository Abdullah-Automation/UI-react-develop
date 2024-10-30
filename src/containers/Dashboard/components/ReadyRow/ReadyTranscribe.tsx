import { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import _ from 'lodash';
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material';

import { FileUploader } from '~/utils/helpers';
import { ITranscribe, ProjectsApi } from '~/api';
import { useToast, useTranscribe } from '~/context';
import { trackFileUploaded } from '~/utils/helpers/track';

import { ReadyRow } from './ReadyRow';
import { ReadyTranscribeHead } from './ReadyTranscribeHead';
import { ReadyTranscribeTool } from './ReadyTranscribeTool';

interface IFileProgress {
  percentage: number;
  fileKey: string;
  fileUuid: string;
  duration: number;
  thumbnail: string;
}

export interface IProject {
  id: number;
  name: string;
  fileUuid: string;
  fileKey: string;
  language: string;
  contentDuration: number;
  thumbnail: string;
  filenameToReturn: string;
  size: number;
  checked: boolean;
  type: string;
  file: File;
}

interface IReadyTranscribe {
  files: File[];
  refetch: () => void;
  removeFiles: (files: File[]) => void;
}

export const ReadyTranscribe = ({
  files,
  refetch,
  removeFiles,
}: IReadyTranscribe) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { currentSourceLang } = useTranscribe();
  const [newProjects, setNewProjects] = useState<IProject[]>([]);
  const [uploadedProject, setUploadedProject] = useState<
    IProject | undefined
  >();
  const [percentage, setPercentage] = useState<any>({
    value: 0,
    projectId: -1,
  });
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && files.length > 0) {
      const tempProjects = Array.from(files).map((file, index) => {
        return {
          id:
            index +
            1 +
            (newProjects[newProjects.length - 1]
              ? // @ts-ignore
                newProjects[newProjects.length - 1].id
              : 0),
          name: file.name,
          fileUuid: '',
          fileKey: '',
          language: currentSourceLang !== '' ? currentSourceLang : 'en',
          contentDuration: 0,
          thumbnail: ' ',
          percentage: 0,
          checked: false,
          filenameToReturn: file.name,
          size: file.size,
          type: file.type,
          file,
        };
      });

      setNewProjects([...newProjects, ...tempProjects]);
      removeFiles([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSourceLang, files]);

  useEffect(() => {
    const notUploadedFileIndex = newProjects.findIndex(
      project => project.contentDuration === 0
    );

    if (
      notUploadedFileIndex > -1 &&
      percentage.value === 0 &&
      // @ts-ignore
      percentage.projectId !== newProjects[notUploadedFileIndex].id
    ) {
      handleUploadFiles(
        // @ts-ignore
        newProjects[notUploadedFileIndex].file,
        // @ts-ignore
        newProjects[notUploadedFileIndex].id
      );
    }
  }, [newProjects]);

  const { mutate: createProjectAndTranscribe } = useMutation(
    (data: ITranscribe) => ProjectsApi.createProjectAndTranscribe(data),
    {
      onSuccess: res => {
        showSuccessToast(
          <Box display='flex' alignItems='center' flexWrap='wrap'>
            <Typography
              variant='subtitle2'
              display='inline'
              sx={{
                fontWeight: '700',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                wordBreak: 'break-word',
                WebkitLineClamp: '1',
                '-webkit-box-orient': 'vertical',
              }}
            >
              {res?.project?.name}&nbsp;
            </Typography>{' '}
            has been submitted for transcribing.
          </Box>
        );
        refetch();
        window.analytics.track(
          `${res?.project?.name} has been submitted for transcribing.`,
          { project: res?.project }
        );
      },
      onError: () => {
        showErrorToast('Error!');
      },
    }
  );

  const handleCancel = (fileName: string) => {
    setPercentage({
      value: 0,
      projectId: -1,
    });
    setNewProjects(newProjects.filter(project => project.name !== fileName));
    window.analytics.track(`Cancel upload`, { fileName });
  };

  const handleUploadFiles = (file: File, fileIndex: number) => {
    const uploader = new FileUploader({
      fileName: file.name,
      file,
    });

    if (percentage.value < 99) {
      uploader.complete(undefined);
    }

    setPercentage({
      value: 0,
      projectId: fileIndex,
    });

    uploader.start();

    uploader
      .onProgress(
        ({
          percentage: newPercentage,
          fileKey,
          fileUuid,
          duration: contentDuration,
          thumbnail,
        }: IFileProgress) => {
          if (newPercentage <= 99) {
            setPercentage({
              value: newPercentage,
              projectId: fileIndex,
            });
          }

          if (contentDuration > 0 && thumbnail !== '') {
            setPercentage({
              value: 0,
              projectId: -1,
            });
            newProjects.forEach(project => {
              if (project.id === fileIndex) {
                setUploadedProject({
                  ...project,
                  id: fileIndex,
                  fileUuid,
                  fileKey,
                  contentDuration,
                  checked: true,
                  thumbnail: thumbnail || ' ',
                });
              }
            });
            trackFileUploaded({ fileKey, fileUuid });
          }
        }
      )
      .onError(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // @ts-ignore
    if (uploadedProject?.contentDuration > 0) {
      const newTempProjects = newProjects.map(project => {
        // @ts-ignore
        if (project.id === uploadedProject.id) {
          return uploadedProject;
        }

        return project;
      });

      // @ts-ignore
      setNewProjects(newTempProjects);
      setUploadedProject(undefined);
    }
  }, [uploadedProject]);

  const handleCheckItem = (checked: boolean, projectId: number) => {
    const checkedProjectIndex = newProjects.findIndex(
      project => project.id === projectId
    );
    const tempProjects = newProjects;
    const currentProject = tempProjects[checkedProjectIndex];
    // @ts-ignore
    currentProject.checked = checked;

    setNewProjects([...tempProjects]);
    window.analytics.track(`Check project transcribe`, {
      currentProject,
    });
  };

  const handleSelectedTranscribe = () => {
    const projects = newProjects.filter(
      project => project.checked && project.contentDuration !== 0
    );
    projects.forEach(project => {
      createProjectAndTranscribe({
        fileUuid: project.fileUuid || '',
        fileKey: project.fileKey || '',
        name: project.name || '',
        filenameToReturn: project.filenameToReturn || '',
        language: project.language || '',
        contentDuration: project.contentDuration || 0,
        thumbnail: project.thumbnail || '',
      });
    });

    const projectNames = projects.map(project => project.name);

    setNewProjects(
      newProjects.filter(
        project => projectNames.findIndex(name => name === project.name) === -1
      )
    );
    window.analytics.track(`Transcribe projects`, { projects });
  };

  const handleSelectedDelete = () => {
    const names = newProjects
      .filter(project => project.checked)
      .map(project => project.name);

    setNewProjects(
      newProjects.filter(
        project => names.findIndex(name => name === project.name) === -1
      )
    );

    window.analytics.track(`Delete projects transcribe`, {});
  };

  const handleCheckAll = (e: any) => {
    setCheckedAll(e.target.checked);

    const tempProjects = newProjects.map((item: any) => {
      return {
        ...item,
        checked: e.target.checked,
      };
    });
    setNewProjects(tempProjects);
    window.analytics.track(`Check all projects`, { projects: tempProjects });
  };

  const checkedIndeterminate = useMemo(() => {
    const filteredCheckIndex = newProjects.findIndex(
      item => item.checked === false
    );
    if (filteredCheckIndex === -1) {
      setCheckedAll(true);

      return false;
    }
    setCheckedAll(false);

    const filteredUnCheckIndex = newProjects.findIndex(
      item => item.checked === true
    );

    if (filteredUnCheckIndex === -1) {
      return false;
    }

    return true;
  }, [newProjects]);

  const checkedLength = useMemo(() => {
    return newProjects.filter(project => project.checked).length;
  }, [newProjects]);

  if (newProjects.length === 0) {
    return null;
  }

  const handleSourceLangChange = (projectId: string, newLang: string) => {
    const tempProjects = newProjects.map((item: any) => {
      if (item.id === projectId) {
        return {
          ...item,
          language: newLang,
        };
      }

      return item;
    });

    setNewProjects(tempProjects);
  };

  return (
    <Box mb='58px'>
      <ReadyTranscribeTool
        checkedLength={checkedLength}
        onSelectedTranscribe={handleSelectedTranscribe}
        onSelectedDelete={handleSelectedDelete}
      />

      <Box sx={{ background: '#FFFFFF' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <ReadyTranscribeHead
              checkedAll={checkedAll}
              checkedIndeterminate={checkedIndeterminate}
              onCheckAll={handleCheckAll}
            />
            <TableBody>
              {newProjects.map((project: IProject) => (
                <ReadyRow
                  key={project.id}
                  project={project}
                  percentage={percentage}
                  handleCheckItem={handleCheckItem}
                  handleCancel={handleCancel}
                  handleSourceLangChange={handleSourceLangChange}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
