import { Component, h, State } from '@stencil/core';
import { i18n } from '../../global/i18n';

// reference https://www.joshmorony.com/basic-and-advanced-tab-navigation-with-ionic-and-stencil-js/
@Component({
  tag: 'app-tabs',
  styleUrl: 'app-tabs.scss',
  scoped: true,
})
export class AppTabs {
  @State()
  newNotice = 0;

  render() {
    return (
      <ion-tabs>
        <ion-tab tab="tab-forum">
          <ion-nav />
        </ion-tab>
        <ion-tab tab="tab-notices">
          <ion-nav />
        </ion-tab>

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab-forum">
            <ion-icon name="chatbubbles" />
            <ion-label>{i18n.tabs.Forum}</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="tab-notices">
            <ion-icon name={this.newNotice > 0 ? 'mail-unread' : 'mail'} />
            <ion-badge hidden={this.newNotice < 1} color="danger">
              {this.newNotice}
            </ion-badge>
            <ion-label>{i18n.tabs.Notices}</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    );
  }
}
