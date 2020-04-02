import { h } from '@stencil/core';
import { VNode } from '@stencil/core/internal/stencil-core';
import { IonicHeader, IonicHeaderProps } from './ionic-header';

export type IonicPageProps = {
  ionContentClass?: string;
} & IonicHeaderProps;

export const IonicPage = (props: IonicPageProps, children: VNode[]) => {
  let ionContentClass = props.ionContentClass || '';
  if (!props.ionContentNoPadding) {
    ionContentClass += ' ion-padding';
  }
  return [
    <IonicHeader {...props} />,
    <ion-content class={ionContentClass} hidden={props.hidden}>
      {children}
      {/* this margin is only for desktop */}
      <div style={{ margin: '1rem' }} />
    </ion-content>,
  ];
};
