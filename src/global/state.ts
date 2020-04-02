import { DisplayOrder } from '../domain/types';
import { router } from './router';

const storageCache: any = {};
export let noop = () => {
  // place holder
};

function setStorage(key: string, value: string | null) {
  if (value) {
    storageCache[key] = value;
    localStorage.setItem(key, value);
  } else {
    delete storageCache[key];
    localStorage.removeItem(key);
  }
}

function getStorage(key: string): string | null {
  return storageCache[key] || localStorage.getItem(key);
}

export type ColorTheme = 'dark' | 'light';

class State {
  dev = true;
  localDev = this.dev && location.hostname === 'localhost';

  get mode(): 'local' | 'test' | 'prod' {
    if (this.localDev) {
      return 'local';
    }
    if (this.dev) {
      return 'test';
    }
    return 'prod';
  }

  get token(): string | undefined {
    return getStorage('token') || undefined;
  }

  set token(token: string | undefined) {
    setStorage('token', token || '');
  }

  get user_id(): string | undefined {
    return getStorage('user_id') || undefined;
  }

  set user_id(user_id: string | undefined) {
    setStorage('user_id', user_id || null);
  }

  get color_theme(): ColorTheme | undefined {
    return getStorage('color_theme') as ColorTheme;
  }

  set color_theme(color: ColorTheme | undefined) {
    setStorage('color_theme', color || null);
  }

  get display_order(): DisplayOrder | undefined {
    return getStorage('display_order') as DisplayOrder;
  }

  set display_order(order: DisplayOrder | undefined) {
    setStorage('display_order', order || null);
  }

  postLogin() {
    router.push('mock', 'root');
  }
}

export let state = new State();
