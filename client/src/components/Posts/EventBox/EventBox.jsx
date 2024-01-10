import React from 'react';

import * as S from './EventBox.styles';

const EventBox = () => {
  return (
    <S.EventBoxContainer>
      <S.EvenHeader>Create an event</S.EvenHeader>

      <S.EventCoverImage>
        <S.EventCoverIcon />
        <S.EventCoverText>Upload Cover Image</S.EventCoverText>
        <S.EventCoverSubText>Minimum width 480 pixels, 16:9 recommended</S.EventCoverSubText>
      </S.EventCoverImage>
    </S.EventBoxContainer>
  );
};

export default EventBox;
