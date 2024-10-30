import React, { useState, useEffect } from 'react';

import { Page } from '~/components/ui';
import { trackScreenResolution } from '~/utils/helpers';
import { useVariants } from '~/context';

import { ProjectTable, UploadSection, ReadyTranscribe } from './components';

export const DashboardPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isManualUpload, setIsManualUpload] = useState<boolean>(false);
  const { isFetching, projects, refetchProjects, setEnabledProjectsAPI } =
    useVariants({ currentPage });

  useEffect(() => {
    // @ts-ignore
    window?.analytics?.page(DashboardPage.displayName);
    trackScreenResolution({
      resolution: `${window.screen.width}x${window.screen.height}`,
    });
  }, []);

  const handleFiles = (files: File[]) => {
    setFiles(files);
    setIsManualUpload(false);
    window.analytics.track(`Handle files`, {});
  };

  const handleSelectedProjects = (pageIndex: number) => {
    setCurrentPage(pageIndex + 1);
    setEnabledProjectsAPI(true);
  };

  const handleManualUpload = (isAllow: boolean) => {
    setIsManualUpload(isAllow);
  };

  return (
    <Page isPrivate>
      <UploadSection
        handleFiles={handleFiles}
        handleManualUpload={handleManualUpload}
        isManualUpload={isManualUpload}
      />
      <ReadyTranscribe
        files={files}
        refetch={refetchProjects}
        removeFiles={handleFiles}
      />
      <ProjectTable
        isLoading={isFetching}
        data={projects}
        onUpload={handleManualUpload}
        refreshProjects={refetchProjects}
        getSelectedProjects={handleSelectedProjects}
      />
    </Page>
  );
};

DashboardPage.displayName = 'Dashboard Page';
