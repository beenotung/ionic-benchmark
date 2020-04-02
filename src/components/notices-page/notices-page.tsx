import { Component, h } from '@stencil/core';
import { i18n } from '../../global/i18n';
import { IonicPage } from '../../helpers/ionic-page';

@Component({
  tag: 'notices-page',
  styleUrl: 'notices-page.scss',
  scoped: true,
})
export class NoticesPage {
  render() {
    return (
      <IonicPage
        title={i18n.notices.title()}
        showBackButton={false}
        ionContentNoPadding={false}
      >
        <p class="ion-text-center">No notices yet</p>
      </IonicPage>
    );
  }
}
