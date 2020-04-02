export let i18n = {
  app_name: 'ionic benchmark',
  default_user_name: '㊙',
  Refresh: '',
  'Dark Mode': '',
  refresher: {
    'Pull to refresh': '',
    'Refreshing...': '',
  },
  tabs: {
    Forum: '',
    Notices: '',
  },
  forum: {
    title: () => `${i18n.app_name} ${i18n.tabs.Forum}`,
    'Search Topics': () => ``,
    order: {
      Hot: '',
      'Latest Post': '',
      'Latest Comment': '',
    },
    'Share Post': '',
  },
  profile: {
    'User Avatar': '',
  },
  notices: {
    title: () => i18n.tabs.Notices,
  },
};

function setDefault(o: any) {
  if (!o || typeof o !== 'object') {
    return;
  }
  Object.entries(o).forEach(([key, value]) => {
    if (typeof value === 'function') {
      return;
    }
    if (value === '') {
      o[key] = key;
      return;
    }
    setDefault(value);
  });
}

setDefault(i18n);
