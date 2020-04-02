import { copyToClipboard } from '@beenotung/tslib/dom';
import { Plugins } from '@capacitor/core';
import { showToast } from './lib';

type ShareOption = {
  title: string | undefined;
  text: string | undefined;
  url: string | undefined;
  dialogTitle: string | undefined;
};

export function share(options: ShareOption) {
  Plugins.Share.share(options).catch(e => {
    console.error('failed to share content:', e);
    let text = '';
    if (options.title) {
      text += options.title + '：\r\n';
    }
    if (options.text) {
      text += options.text + '\r\n';
    }
    if (options.url) {
      if (text) {
        text += ' ';
      }
      text += options.url + '\r\n';
    }
    text = text.trim();
    copyToClipboard(text);
    return showToast({ message: '已復製到剪貼板，請自行到相應 app 貼上' });
  });
}
