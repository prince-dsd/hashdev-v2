import React from 'react';
import * as S from './ShareBox.styles';
import { MdPermMedia, MdEvent, MdArticle, MdEditSquare } from 'react-icons/md';
import { TextArea, Button, Avatar } from 'shared/components';

const ShareBox = () => {
  return (
    <S.ShareContainer>
      <S.ShareModalHeader>
        <Avatar size='4rem' />
        <S.ShareModalAvatarInfo>
          <S.AvatarName>Noctis Lucis</S.AvatarName>
        </S.ShareModalAvatarInfo>
      </S.ShareModalHeader>
      <S.ShareModalContentContainer>
        <S.ShareModalText>
          <TextArea />
        </S.ShareModalText>
        <S.ShareModalIconContainer>
          <Button icon={<MdPermMedia />} iconSize='3rem' />
          <Button icon={<MdEvent />} iconSize='3rem' />
          <Button icon={<MdArticle />} iconSize='3rem' />
        </S.ShareModalIconContainer>
      </S.ShareModalContentContainer>
      <S.ShareModalAction>
        <Button backgroundColor='primaryLight' color='white1' icon={<MdEditSquare />} iconSize='2rem'>
          Post
        </Button>
      </S.ShareModalAction>
    </S.ShareContainer>
  );
};

export default ShareBox;
