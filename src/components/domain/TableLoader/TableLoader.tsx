import React from 'react';
import ContentLoader from 'react-content-loader';

export const TableLoader = () => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      viewBox='0 0 900 34'
    >
      <rect x='0' y='0' rx='3' ry='3' width={900} height={34} />
    </ContentLoader>
  );
}
