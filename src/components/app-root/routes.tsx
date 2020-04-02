import { h } from '@stencil/core';
import { setRouter } from '../../global/router';

export let routes = {
  forum: '/forum',
  notices: '/notices',
  post_detail: (_: any) => '/mock',
  login: '/mock',
};

export let Router = () => (
  <ion-router useHash={true} ref={e => setRouter(e!)}>
    <ion-route-redirect from="/" to={routes.forum} />
    <ion-route component="app-tabs">
      <ion-route url={routes.forum} component="tab-forum">
        <ion-route component="forum-page" />
      </ion-route>
      <ion-route url={routes.notices} component="tab-notices">
        <ion-route component="notices-page" />
      </ion-route>
    </ion-route>
  </ion-router>
);
