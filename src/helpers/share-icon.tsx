import { h } from '@stencil/core';

export const ShareIcon = (props: { onClick: () => void }) => {
  const onClick = (e: Event) => {
    e.preventDefault();
    props.onClick();
  };
  return (
    <ion-button onClick={onClick}>
      <ion-icon
        name="share"
        color="dark"
        size="small"
        class="ios"
        onClick={onClick}
      />
      <ion-icon
        name="share-social"
        color="dark"
        size="small"
        class="md"
        onClick={onClick}
      />
    </ion-button>
  );
};
