import React from 'react';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga4';
import { config } from '@/config';

type InitScriptsProps = {
  scripts: string[];
};

TagManager.initialize({ gtmId: config.google.ggTagManagerId });
ReactGA.initialize(config.google.ggAnalystId);

export const InitScripts = ({ scripts = [] }: InitScriptsProps): JSX.Element => {
  const scriptElements = scripts.map((script: string, idx: number) => (
    <script key={idx} dangerouslySetInnerHTML={{ __html: script }} />
  ));
  return <div>{scriptElements}</div>;
};
