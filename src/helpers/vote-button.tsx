import { h } from '@stencil/core';
import { VoteType, VoteViewType } from '../domain/types';

export const VoteButtons = (props: {
  reversed?: boolean;
  votes: VoteViewType;
  vote: (vote: VoteType) => void;
  unVote: () => void;
}) => {
  const res = [
    <ion-button
      color={props.votes.my_vote === 'up' ? 'primary' : 'medium'}
      onClick={(evt: Event) => {
        evt.preventDefault();
        props.votes.my_vote === 'up' ? props.unVote() : props.vote('up');
      }}
    >
      {props.votes.up_vote}
      <ion-icon name="thumbs-up" />
    </ion-button>,
    <ion-button
      color={props.votes.my_vote === 'down' ? 'primary' : 'medium'}
      onClick={(evt: Event) => {
        evt.preventDefault();
        props.votes.my_vote === 'down' ? props.unVote() : props.vote('down');
      }}
    >
      {props.votes.down_vote}
      <ion-icon name="thumbs-down" />
    </ion-button>,
  ];
  if (props.reversed) {
    res.reverse();
  }
  return res;
};
