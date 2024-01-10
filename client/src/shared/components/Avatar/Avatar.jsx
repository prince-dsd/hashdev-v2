import React from 'react'
import * as S from "./Avatar.styles"
import defaultAvatar from 'assets/img/profile/avatar/default-thumbnail.jpeg';

const Avatar = ({size}) => {
  return (
    <S.AvatarContainer size={size}>
        <S.Avatar
            className="avatar"
            src={[defaultAvatar]}
            alt="Profile avatar"
        />
    </S.AvatarContainer>
  )
}

export default Avatar