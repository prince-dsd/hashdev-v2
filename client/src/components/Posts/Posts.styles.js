import styled from "styled-components/macro"
import { mixins } from "shared/styles"

export const ShareBoxContainer = styled.div`
    ${mixins.flexColumnCenter}
    ${mixins.card}
    max-width: 555px;
`

export const FeedEntryBoxContainer = styled.div`
    ${mixins.flexCenter}
    gap: 0.5rem;
`

export const MediaSelectionContainer = styled.div`
    ${mixins.flexCenter}
`

export const FeedInput = styled.div`
    ${mixins.flexCenter}
    border: 1px solid ${({ theme }) => theme.colors.textSecondary3};
    height: 4rem;
    width: 500px;
    border-radius: 1.3rem;
    &:hover {
        background-color: ${({ theme }) => theme.colors.background3};
        cursor: pointer;
    }
`

export const FeedInputText = styled.span`
    display: inline-block;
    font-weight: 600;
  
`

export const MediaAttachContainer = styled.div`
    ${mixins.flexCenterBetween}
    width: inherit;
    margin-top: 2rem;

`