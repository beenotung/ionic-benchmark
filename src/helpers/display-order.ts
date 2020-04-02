import { DisplayOrder } from '../domain/types';
import { i18n } from '../global/i18n';

export let DefaultDisplayOrder: DisplayOrder = 'latest_comment';
export let getDisplayOrderOptions = (): Array<{
  value: DisplayOrder;
  text: string;
}> => [
  { value: 'latest_comment', text: i18n.forum.order['Latest Comment'] },
  { value: 'hot', text: i18n.forum.order.Hot },
  { value: 'latest_post', text: i18n.forum.order['Latest Post'] },
];
