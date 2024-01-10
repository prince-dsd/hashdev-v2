import React from 'react';
import * as S from './Posts.styles';
import { MdPermMedia, MdEvent, MdArticle } from 'react-icons/md';

import { Avatar, Button } from 'shared/components';
import { ShareBox, PostModal, MediaBox, EventBox } from 'components';

const StartPostTrigger = open => (
  <S.FeedInput onClick={open}>
    <S.FeedInputText>Start a post</S.FeedInputText>
  </S.FeedInput>
);

const Posts = () => {
  return (
    <S.ShareBoxContainer>
      <S.FeedEntryBoxContainer>
        <Avatar size='4rem' />
        <PostModal trigger={StartPostTrigger} renderContent={props => <ShareBox {...props} />} />
      </S.FeedEntryBoxContainer>
      <S.MediaAttachContainer>
        <PostModal icon={<MdPermMedia />} renderContent={props => <MediaBox {...props} />} />
        <PostModal icon={<MdEvent />} renderContent={props => <EventBox {...props} />} />
        <PostModal icon={<MdArticle />} renderContent={() => []} />
      </S.MediaAttachContainer>
    </S.ShareBoxContainer>
  );
};

export default Posts;
