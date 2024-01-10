import styled from "styled-components/macro";
import { mixins } from "shared/styles";

export const ShareContainer = styled.div`
   ${mixins.flexColumnStart}
    height: 500px;
    padding: 2rem;
`
export const ShareModalHeader = styled.div`
    ${mixins.flexCenterLeft};
    width: 100%;
    padding-bottom: 2rem;
    gap: 1rem;

`;

export const ShareModalContentContainer = styled.div`
    ${mixins.flexColumnStart}
    justify-content: space-between;
    min-height: 354px;
    width: 100%;
`;

export const ShareModalText = styled.div`
    ${mixins.flexColumnStart}
    width: 100%;
`;

export const ShareModalIconContainer = styled.div`
    ${mixins.flexCenterLeft};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border3};
    width: 100%;
    padding-bottom: 2rem;
    gap: 2rem;
`;

export const ShareModalAction = styled.div`
    ${mixins.flexCenterRight}
    padding-top: 2rem;
    width: 100%;
`;

export const ShareModalAvatarInfo = styled.div`
    ${mixins.flexCenterLeft}
`

export const AvatarName = styled.h3`

`