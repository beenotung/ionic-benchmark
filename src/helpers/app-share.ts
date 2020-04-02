import { routes } from '../components/app-root/routes';
import { i18n } from '../global/i18n';
import { share } from './share';

export function sharePost(post: {
  post_id: string;
  view_id?: string;
  title: string;
  author?: { nickname?: string };
}) {
  let text = post.author?.nickname;
  if (text) {
    text = 'by ' + text;
  }
  const url = location.origin + '#' + routes.post_detail(post);
  share({
    title: post.title,
    text,
    url,
    dialogTitle: i18n.forum['Share Post'],
  });
}
