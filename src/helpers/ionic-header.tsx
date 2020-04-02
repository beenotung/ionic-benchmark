import { h } from '@stencil/core';
import { VNode } from '@stencil/core/internal/stencil-core';
import { router } from '../global/router';

export let IonicHeaderDefaultProps = {
  menu: false,
  showBackButton: true,
};

export type IonicHeaderProps = {
  title: string | VNode;
  ionContentNoPadding?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  menu?: boolean;
  toolbarEndButtons?: VNode | VNode[];
  hidden?: boolean;
  secondToolbar?: VNode | VNode[];
};
export const IonicHeader = (props: IonicHeaderProps) => {
  let menu = IonicHeaderDefaultProps.menu;
  if (props.menu === false) {
    menu = false;
  }
  let showBackButton = IonicHeaderDefaultProps.showBackButton;
  if (props.showBackButton === false) {
    showBackButton = false;
  }
  const onBack = props.onBack || (() => router.back());
  return (
    <ion-header hidden={props.hidden}>
      <ion-toolbar color="light">
        <ion-buttons slot="start">
          {!menu ? (
            []
          ) : (
            <ion-menu-toggle>
              <ion-button>
                <ion-icon name="menu" />
              </ion-button>
            </ion-menu-toggle>
          )}
          {!showBackButton ? (
            []
          ) : (
            <ion-button onClick={onBack}>
              <ion-icon name="arrow-back" />
            </ion-button>
          )}
        </ion-buttons>
        {typeof props.title ? (
          <ion-title>{props.title}</ion-title>
        ) : (
          props.title
        )}
        {!props.toolbarEndButtons ? (
          []
        ) : (
          <ion-buttons slot="end">{props.toolbarEndButtons}</ion-buttons>
        )}
      </ion-toolbar>
      {props.secondToolbar}
    </ion-header>
  );
};
