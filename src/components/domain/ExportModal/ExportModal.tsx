import React, { useEffect, useState } from 'react';
import { Dialog, Typography } from '@mui/material';

import { useTranslate, useExport, useProject } from '~/context';
import { IconNames } from '~/components/ui';
import { trackExport } from '~/utils/helpers';
import { ENGLISH_EXPORT_OPTIONS, SPANISH_EXPORT_OPTIONS } from '~/config';

import { ModalContent, ModalTitle } from '../DeleteProjectModal';

import { ExportItem } from './ExportItem';

export interface IExport {
  title: string;
  desc: string;
  icon: keyof IconNames;
  exportURL: string;
}

interface IExportModalProps {
  open: boolean;
  type: string;
  handleClose: () => void;
}

export const ExportModal = ({ open, type, handleClose }: IExportModalProps) => {
  const { isDub } = useTranslate();
  const {
    project: { projectName: name },
    project,
  } = useProject();

  const {
    transcriptURL,
    srtURL,
    textURL,
    dubSrtURL,
    dubTextURL,
    dubAudioURL,
    dubSpeakerOnlyAudioURL,
    dubVideoURL,
    dubVideoAudioOnlyURL,
    translationURL,
    timingsURL,
    getExportURL,
    processTranscriptSRT,
    processTranslationSRT,
    saveTranscript,
    saveTranslation,
  } = useExport();
  const [tabItems, setTabItems] = useState<IExport[]>(SPANISH_EXPORT_OPTIONS);

  useEffect(() => {
    let currentItems: IExport[] = [];
    if (type !== 'Transcription') {
      const URLs = [
        { title: 'Video', url: dubVideoURL },
        { title: 'Video, Speaker Only Audio', url: dubVideoAudioOnlyURL },
        { title: 'Audio', url: dubAudioURL },
        { title: 'Speaker Only Audio', url: dubSpeakerOnlyAudioURL },
        { title: 'Text', url: dubTextURL },
        { title: 'Subtitles', url: dubSrtURL },
        { title: 'Translation Json', url: translationURL },
        { title: 'Segment Timings Json', url: timingsURL },
      ];

      // Show Export item if exportURL is available
      SPANISH_EXPORT_OPTIONS.forEach((option, index) => {
        if (URLs[index]) {
          if (option.title === URLs[index]?.title && URLs[index]?.url) {
            currentItems.push({ ...option, exportURL: URLs[index]?.url || '' });
          }
        }
      });
    } else {
      currentItems = ENGLISH_EXPORT_OPTIONS;
      if (currentItems[0]) {
        currentItems[0].exportURL = textURL;
      }

      if (currentItems[1]) {
        currentItems[1].exportURL = srtURL;
      }
      if (currentItems[2]) {
        currentItems[2].exportURL = transcriptURL;
      }
    }

    setTabItems([...currentItems]);
  }, [
    type,
    dubVideoURL,
    dubAudioURL,
    dubSpeakerOnlyAudioURL,
    dubTextURL,
    dubSrtURL,
    translationURL,
    timingsURL,
    textURL,
    srtURL,
    isDub,
    dubVideoAudioOnlyURL,
  ]);

  const detectAndHHandleExportText = async (
    exportID: string,
    title: string
  ) => {
    if (exportID !== '') {
      if (title === 'Text') {
        const element = document.createElement('a');
        const file = new Blob([exportID], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${name}_${type}.txt`;
        document.body.appendChild(element);
        element.click();
        trackExport({ fileType: 'txt', title, file: element.download });
      } else if (title === 'Captions') {
        // Assuming 'Subtitles' indicates SRT files
        // Example API call function, replace with your actual function to fetch SRT file

        const srtId = await processTranscriptSRT(project.transcription.id); // fetchSRTFile is an example, replace with your function
        const exportURL = await getExportURL(srtId);

        window.location.href = exportURL;
        trackExport({ fileType: 'srt', title, exportURL });
      } else if (title === 'Subtitles') {
        // Assuming 'Subtitles' indicates SRT files
        // Example API call function, replace with your actual function to fetch SRT file

        const srtId = await processTranslationSRT(project.translation.id); // fetchSRTFile is an example, replace with your function
        const exportURL = await getExportURL(srtId);

        window.location.href = exportURL;
        trackExport({ fileType: 'srt', title, exportURL });
      } else if (
        title.includes('Transcript Json') ||
        title.includes('Translation Json')
      ) {
        // Assuming the title contains 'Json' for JSON files
        if (title.includes('Transcript Json'))
          await saveTranscript(project.transcription.id);
        if (title.includes('Translation Json'))
          await saveTranslation(project.translation.id);

        const response = await fetch(await getExportURL(exportID));
        const data = await response.json();
        data.forEach((segment: any) => {
          if (segment.wordDetails) {
            delete segment.wordDetails; // Removes the `wordDetails` property from the segment
          }
        });
        const updatedFile = new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        });

        const downloadUrl = URL.createObjectURL(updatedFile);
        const element = document.createElement('a');
        element.href = downloadUrl;
        element.download = `${name}_${type}.json`;
        document.body.appendChild(element);
        element.click();
        trackExport({ fileType: 'json', title, file: element.download });
      } else {
        const exportURL = await getExportURL(exportID);
        window.location.href = exportURL;
        trackExport({ title, exportURL });
      }
    }
  };

  const handlePanelContent = () => {
    const items = tabItems.map(item => (
      <ExportItem
        key={item.title}
        title={item.title}
        desc={item.desc}
        icon={item.icon}
        exportURL={item.exportURL}
        detectAndHHandleExportText={detectAndHHandleExportText}
      />
    ));

    return items;
  };

  const onClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') {
      console.log(reason + event);
    } else {
      handleClose();
    }
  };

  return (
    <Dialog fullWidth maxWidth='xs' onClose={onClose} open={open}>
      <ModalTitle onClose={handleClose}>
        <Typography variant='h4' color='#1B1B1F'>
          Export - {type}
        </Typography>
      </ModalTitle>
      <ModalContent dividers>{handlePanelContent()}</ModalContent>
    </Dialog>
  );
};
