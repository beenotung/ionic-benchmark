export let router: HTMLIonRouterElement;
export let setRouter = (e: HTMLIonRouterElement) => (router = e);

export function toRoot(url: string) {
  router.push(url, 'root');
}
