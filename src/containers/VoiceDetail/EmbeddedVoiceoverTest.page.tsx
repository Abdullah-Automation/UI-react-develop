// pages/iframeTest.tsx

import { NextPage } from 'next';

import { Page } from '~/components/ui';

export const EmbeddedVoiceoverTest: NextPage = () => {
  return (
    <Page>
      <div>
        <h1>Iframe Test Page</h1>
        <iframe
          src='http://localhost:3000/embeddedVoiceoverDetail'
          width='800'
          height='600'
          frameBorder='0'
         />
      </div>
    </Page>
  );
};
