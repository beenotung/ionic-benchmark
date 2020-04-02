import { h } from '@stencil/core';
import { i18n } from '../global/i18n';
import { toggleDarkMode } from '../global/theme';

export const ToggleDarkModeButton = () => (
  <ion-button
    slot="icon-only"
    onClick={() => toggleDarkMode()}
    title={i18n['Dark Mode']}
  >
    <ion-icon name="moon" />
  </ion-button>
);
