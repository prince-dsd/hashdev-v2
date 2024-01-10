import React from 'react';

import * as S from './MediaBox.styles';
import { Button } from 'shared/components';

const MediaBox = () => {
  return (
    <S.MediaBoxContainer>
      <S.MediaUploadIcon />
      <S.MediaUploadHeader>Share Images or video in your post</S.MediaUploadHeader>
      <Button backgroundColor='primaryLight' color='white1' iconSize='2rem'>
        Upload
      </Button>
    </S.MediaBoxContainer>
  );
};

export default MediaBox;
