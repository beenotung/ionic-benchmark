import { h } from '@stencil/core';

/**
 * @deprecated use LoadingBar instead
 *    this will cause the layout to rearrange when used with if-then-else
 * */
export const Loading = () => (
  <div class="ion-text-center">
    <ion-note>Load 緊 ...</ion-note>
    <ion-progress-bar type="indeterminate" />
  </div>
);
export type LoadingView = {
  loading: number | boolean;
  loading_text?: string;
};
export const LoadingBar = ({ view }: { view: LoadingView }) => (
  <div class="ion-text-center" style={{ opacity: view.loading ? '1' : '0' }}>
    <ion-note hidden={!view.loading_text}>{view.loading_text}</ion-note>
    <ion-progress-bar type="indeterminate" />
  </div>
);
