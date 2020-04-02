import { Component, h } from '@stencil/core';
import { Router } from './routes';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  componentDidLoad() {
    const div = document.querySelector('body > .loading') as HTMLDivElement;
    div.style.display = 'none';
  }

  render() {
    return (
      <ion-app>
        <Router />
        <ion-nav />
      </ion-app>
    );
  }
}
