import { h } from '@stencil/core';
import { i18n } from '../global/i18n';
export const Refresher = (props: {
  view: {
    refresh: () => void;
    ionRefresher?: HTMLIonRefresherElement;
  };
}) => (
  <ion-refresher slot="fixed" onIonRefresh={() => props.view.refresh()}>
    <ion-refresher-content
      pulling-icon="arrow-dropdown"
      pulling-text={i18n.refresher['Pull to refresh']}
      refreshing-spinner="circles"
      refreshing-text={i18n.refresher['Refreshing...']}
    />
  </ion-refresher>
);
