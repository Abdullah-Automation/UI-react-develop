import React from 'react';
import ContentLoader from 'react-content-loader';

export const SegmentLoader = () => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      viewBox='0 0 689 60'
    >
      <rect x='24.5' y='16.3636' width='142' height='9.9596' rx='4.9798' />
      <rect x='24.5' y='42.3232' width='640' height='9.9596' rx='4.9798' />
    </ContentLoader>
  );
};
