import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// TODO push notice
// https://stenciljs.com/docs/service-workers

// https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
const generateSWConfig = {
  globPatterns: [
    '**/*.{js,css,json,html,ico,png,svg,jpg}',
  ],
  importWorkboxFrom: 'local',
};

// https://stenciljs.com/docs/config
export const config: Config = {
  plugins: [
    sass(),
  ],
  outputTargets: [{
    type: 'www',
    serviceWorker: {
      ...generateSWConfig as any,
    },
  }],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
};
