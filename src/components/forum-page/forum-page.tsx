import { allNames } from '@beenotung/tslib/constant/character-name';
import { lowerCaseLetters, Random } from '@beenotung/tslib/random';
import { DAY } from '@beenotung/tslib/time';
import { Component, h, State } from '@stencil/core';
import { Block } from 'stencil-lib/components/block/block';
import { Author, DisplayOrder, PostType, VoteType } from '../../domain/types';
import { assets } from '../../global/assets';
import { config } from '../../global/config';
import { i18n } from '../../global/i18n';
import { router } from '../../global/router';
import { state } from '../../global/state';
import { sharePost } from '../../helpers/app-share';
import {
  DefaultDisplayOrder,
  getDisplayOrderOptions,
} from '../../helpers/display-order';
import { formatDateTime, isFullDateTime } from '../../helpers/format';
import { IonicPage } from '../../helpers/ionic-page';
import { JsonView, showToast } from '../../helpers/lib';
import { LoadingBar } from '../../helpers/loading';
import { Refresher } from '../../helpers/refresher';
import { ReportIcon } from '../../helpers/report-icon';
import { ShareIcon } from '../../helpers/share-icon';
import { ToggleDarkModeButton } from '../../helpers/toggle-dark-mode-button';
import { VoteButtons } from '../../helpers/vote-button';
import { routes } from '../app-root/routes';

function isLongDateTimeFormat(post: PostType, now: number) {
  return (
    post.last_time &&
    isFullDateTime(post.last_time, now) &&
    isFullDateTime(post.timestamp, now)
  );
}

@Component({
  tag: 'forum-page',
  styleUrl: 'forum-page.scss',
  scoped: true,
})
export class ForumPage {
  @State()
  posts: PostType[] = [];

  @State()
  loading = 0;

  @State()
  searchText = '';
  order: DisplayOrder | undefined = state.display_order;

  segment?: HTMLElement;

  @State()
  tick = {};

  connectedCallback() {
    this.refresh();
  }

  refresh = () => {
    const startTime = Date.now();
    this.loading++;
    setTimeout(() => {
      let posts: PostType[] = [];
      for (let i = 0; i < 50; i++) {
        const id = i + 1;
        const create_time = Date.now() - Math.random() * 28 * DAY;
        const timestamp = create_time + Math.random() * 3 * DAY;
        let last_time;
        if (Random.nextBool()) {
          last_time = timestamp + Math.random() * 2 * DAY;
        }
        let author: Author | undefined;
        if (Random.nextBool()) {
          let nickname: string | undefined;
          if (Random.nextBool()) {
            nickname = Random.element(allNames);
          }
          author = {
            user_id: 'user-' + Random.nextInt(42),
            nickname,
            avatar: assets.user_icon,
          };
        }
        const tags: string[] = [];
        while (Random.nextBool(0.6)) {
          tags.push(Random.nextString(Random.nextInt(7, 3), lowerCaseLetters));
        }
        const post: PostType = {
          post_id: 'post-' + id,
          title: 'title ' + id,
          timestamp,
          create_time,
          last_time,
          comments: Random.nextInt(42),
          has_my_comment: Random.nextBool() || undefined,
          own: Random.nextBool() || undefined,
          author,
          tags,
          up_vote: Random.nextInt(42),
          down_vote: Random.nextInt(42 / 3),
          my_vote: Random.element(['up', 'down', undefined]),
        };
        posts.push(post);
      }
      if (this.searchText) {
        posts = posts.filter(post =>
          JSON.stringify(post).includes(this.searchText),
        );
      }
      switch (this.order) {
        case 'hot':
          posts.sort(
            (a, b) => b.comments + b.up_vote - (a.comments + a.up_vote),
          );
          break;
        case 'latest_comment':
          posts.sort(
            (a, b) =>
              (b.last_time || b.timestamp) - (a.last_time || a.timestamp),
          );
          break;
        case 'latest_post':
          posts.sort((a, b) => b.timestamp - a.timestamp);
          break;
      }
      this.posts = posts;
      this.loading--;
      const passed = Date.now() - startTime;
      if (passed >= config.minimum_effect_duration) {
        // it has loaded long enough
        return this.finishRefresher();
      }
      // it load too fast, wait for a while
      const endTime = startTime + config.minimum_effect_duration;
      setTimeout(() => this.finishRefresher(), endTime - Date.now());
    }, 42);
  }

  finishRefresher() {
    document.querySelectorAll('ion-refresher').forEach(e => {
      (e as HTMLIonRefresherElement).complete();
    });
  }

  votePost({ vote, post_id }: { post_id: string; vote: VoteType }) {
    showToast({ message: vote + ' vote ' + post_id });
  }

  unVotePost({ post_id }: { post_id: string }) {
    showToast({ message: 'unvote ' + post_id });
  }

  search(text: string) {
    const oldText = this.searchText;
    this.searchText = text;
    if (oldText.trim() !== text.trim()) {
      this.refresh();
    }
  }

  renderPostRaw(post: PostType) {
    post = { ...post, author: undefined };
    return (
      <a href={'#' + routes.post_detail(post)}>
        <JsonView data={post} />
      </a>
    );
  }

  renderPostNew2(post: PostType) {
    const icon = assets.user_icon;
    return (
      <app-card onClick={() => router.push(routes.post_detail(post))}>
        <app-card-header class="ion-no-padding">
          <app-row>
            <app-col size="auto">
              {post.tags.map(tag => (
                <app-chip
                  onClick={(e: Event) => {
                    e.preventDefault();
                    this.search(tag);
                  }}
                >
                  {tag}
                </app-chip>
              ))}
            </app-col>
            <app-col />
            <app-col size="auto">
              <app-text class="timestamp">
                Po: {formatDateTime(post.create_time)}
              </app-text>
            </app-col>
          </app-row>
        </app-card-header>
        <app-card-content class="ion-no-padding">
          <app-row>
            <app-col size="auto">
              <h2>{post.title}</h2>
            </app-col>
            <app-col />
            <app-col size="auto">
              <app-buttons>
                <ReportIcon />
                <ShareIcon onClick={() => sharePost(post)} />
              </app-buttons>
            </app-col>
          </app-row>
          {post.author ? (
            <app-item>
              <ion-avatar slot="start">
                <img src={icon} alt={i18n.profile['User Avatar']} />
              </ion-avatar>
              <app-text>
                {post.author?.nickname || i18n.default_user_name}
              </app-text>
            </app-item>
          ) : (
            undefined
          )}
        </app-card-content>
        <app-card-footer>
          <app-row>
            <app-col size="auto">
              {post.last_time ? (
                <app-text class="timestamp">
                  CM: {formatDateTime(post.last_time)}
                </app-text>
              ) : (
                []
              )}
            </app-col>
            <app-col />
            <app-col size="auto">
              <app-buttons>
                <app-button color={post.has_my_comment ? 'primary' : 'medium'}>
                  {post.comments}
                  <ion-icon name="chatbubbles" />
                </app-button>
                <VoteButtons
                  votes={post}
                  vote={vote => this.votePost({ vote, post_id: post.post_id })}
                  unVote={() => this.unVotePost(post)}
                  reversed={true}
                />
              </app-buttons>
            </app-col>
          </app-row>
        </app-card-footer>
      </app-card>
    );
  }

  renderPostNew3(post: PostType, now: number) {
    return (
      <div
        class="card post ion-margin-half ion-padding-half-2"
        onAuxClick={e => console.log(e)}
      >
        <div class="tags">
          {post.tags.map(tag => (
            <span>{tag}</span>
          ))}
        </div>
        <h2 class="title">{post.title}</h2>
        <div class="time ion-text-end">
          Po: {formatDateTime(post.timestamp)}
        </div>
        {post.author ? (
          <div>
            <ion-avatar>
              <img src={assets.user_icon} />
            </ion-avatar>
            <span>{post.author?.nickname || i18n.default_user_name}</span>
          </div>
        ) : (
          []
        )}
        <div class="controls">
          <ion-buttons>
            <VoteButtons
              votes={post}
              vote={vote => this.votePost({ vote, post_id: post.post_id })}
              unVote={() => this.unVotePost(post)}
              reversed={false}
            />
            <ion-button color={post.has_my_comment ? 'primary' : 'medium'}>
              {post.comments}
              <ion-icon name="chatbubbles" />
            </ion-button>
          </ion-buttons>
          <ion-buttons class="right">
            <ReportIcon />
            <ShareIcon onClick={() => sharePost(post)} />
          </ion-buttons>
        </div>
        <div
          class={'footer ' + (isLongDateTimeFormat(post, now) ? 'long' : '')}
        >
          {post.last_time ? (
            <span class="time">CM: {formatDateTime(post.last_time)}</span>
          ) : (
            <span />
          )}
          {/*<span class='time right'>Po: {formatDateTime(post.timestamp)}</span>*/}
        </div>
      </div>
    );
  }

  renderPost(post: PostType) {
    const icon = assets.user_icon;
    return (
      <ion-card href={'#' + routes.post_detail(post)}>
        <ion-card-header class="ion-no-padding">
          <ion-row>
            <ion-col size="auto">
              {post.tags.map(tag => (
                <ion-chip
                  onClick={e => {
                    e.preventDefault();
                    this.search(tag);
                  }}
                >
                  {tag}
                </ion-chip>
              ))}
            </ion-col>
            <ion-col />
            <ion-col size="auto">
              <ion-text class="timestamp">
                Po: {formatDateTime(post.create_time)}
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-card-header>
        <ion-card-content class="ion-no-padding">
          <ion-row>
            <ion-col size="auto">
              <h2>{post.title}</h2>
            </ion-col>
            <ion-col />
            <ion-col size="auto">
              <ion-buttons>
                <ReportIcon />
                <ShareIcon onClick={() => sharePost(post)} />
              </ion-buttons>
            </ion-col>
          </ion-row>
          {post.author ? (
            <ion-item>
              <ion-avatar slot="start">
                <img src={icon} alt={i18n.profile['User Avatar']} />
              </ion-avatar>
              <ion-text>
                {post.author?.nickname || i18n.default_user_name}
              </ion-text>
            </ion-item>
          ) : (
            undefined
          )}
        </ion-card-content>
        <ion-card-footer>
          <ion-row>
            <ion-col size="auto">
              {post.last_time ? (
                <ion-text class="timestamp">
                  CM: {formatDateTime(post.last_time)}
                </ion-text>
              ) : (
                []
              )}
            </ion-col>
            <ion-col />
            <ion-col size="auto">
              <ion-buttons>
                <ion-button color={post.has_my_comment ? 'primary' : 'medium'}>
                  {post.comments}
                  <ion-icon name="chatbubbles" />
                </ion-button>
                <VoteButtons
                  votes={post}
                  vote={vote => this.votePost({ vote, post_id: post.post_id })}
                  unVote={() => this.unVotePost(post)}
                  reversed={true}
                />
              </ion-buttons>
            </ion-col>
          </ion-row>
        </ion-card-footer>
      </ion-card>
    );
  }

  changeOrder(value: string | undefined) {
    if (value !== this.order) {
      this.order = state.display_order = value as DisplayOrder;
      this.refresh();
    }
  }

  renderBody() {
    if (!this.loading && this.posts.length === 0) {
      return <p class="ion-text-center">No posts yet</p>;
    }
    const order: DisplayOrder = this.order || DefaultDisplayOrder;
    const now = Date.now();
    return (
      <Block>
        <ion-segment
          ref={e => (this.segment = e)}
          value={order}
          onIonChange={e => this.changeOrder(e.detail.value)}
        >
          {getDisplayOrderOptions().map(({ value, text }) => (
            <ion-segment-button value={value}>
              <ion-label>{text}</ion-label>
            </ion-segment-button>
          ))}
        </ion-segment>
        <ion-row>
          <ion-col>{this.posts.map(post => this.renderPostRaw(post))}</ion-col>
          <ion-col>
            {this.posts.map(post => this.renderPostNew3(post, now))}
          </ion-col>
          <ion-col>{this.posts.map(post => this.renderPost(post))}</ion-col>
        </ion-row>
      </Block>
    );
  }

  render() {
    return [
      <IonicPage
        title={
          <ion-searchbar
            value={this.searchText}
            placeholder={i18n.forum['Search Topics']()}
            onIonChange={e => this.search(e.detail.value || '')}
          />
        }
        showBackButton={false}
        toolbarEndButtons={[
          <ToggleDarkModeButton />,
          <ion-button
            slot="icon-only"
            onClick={this.refresh}
            title={i18n.Refresh}
          >
            <ion-icon name="refresh" />
          </ion-button>,
        ]}
        ionContentNoPadding={false}
      >
        <Refresher view={this} />
        <LoadingBar view={this} />
        {this.renderBody()}
      </IonicPage>,
    ];
  }
}
