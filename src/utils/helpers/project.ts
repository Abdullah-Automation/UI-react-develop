export const getProjectDetails = (project: any) => {
  const data: any[] = [];
  project.translations.forEach((detail: any) => {
    if (detail.dub.length > 0) {
      detail.dub.forEach((dub: any) => {
        data.push({ ...detail, dub, projectId: project.id });
      });
    } else {
      data.push({ ...detail, projectId: project.id });
    }
  });

  return data;
};

export const calculateNewHeight = (textarea: any) => {
  return Math.max(textarea.scrollHeight, textarea.clientHeight);
};

export const setTextareaHeight = (textarea: any, height: number) => {
  textarea.style.height = `${height}px`;
};

export const adjustTextareaHeight = (
  calIndex: number,
  segmentType: string,
  textarea: any
) => {
  const currentWrapper = document.querySelector(
    `.${segmentType}-wrapper .segment-editor:nth-child(${calIndex + 1})`
  );

  if (!textarea || !currentWrapper) return;
  if (textarea.scrollHeight > textarea.clientHeight) {
    // @ts-ignore
    currentWrapper.style.height = 'auto';
    setTextareaHeight(textarea, calculateNewHeight(textarea));
  }

  const correspondingWrapperClass =
    segmentType === 'transcription' ? 'translation' : 'transcription';
  const correspondingWrapper = document.querySelector(
    `.${correspondingWrapperClass}-wrapper`
  );
  if (!correspondingWrapper) return;

  const correspondingTextWrapper = correspondingWrapper.querySelector(
    `.segment-editor:nth-child(${calIndex + 1})`
  );

  if (!correspondingTextWrapper) return;
  if (correspondingTextWrapper.clientHeight > currentWrapper.clientHeight) {
    setTextareaHeight(
      currentWrapper,
      correspondingTextWrapper.clientHeight - 32
    );
  } else if (
    correspondingTextWrapper.clientHeight < currentWrapper.clientHeight
  ) {
    setTextareaHeight(
      correspondingTextWrapper,
      currentWrapper.clientHeight - 32
    );
  }
};
