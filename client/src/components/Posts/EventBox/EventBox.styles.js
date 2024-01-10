import { mixins } from 'shared/styles';
import styled from 'styled-components/macro';
import { MdPhotoCamera } from 'react-icons/md';

export const EventBoxContainer = styled.div`
    ${mixins.flexColumnStart}
    height: 40rem;

`

export const EvenHeader = styled.h3`
    border-bottom: 1px solid ${({ theme }) => theme.colors.white4};
    width: 100%;
    padding-bottom: 1rem;
`

export const EventCoverImage = styled.div`

    ${mixins.flexColumnCenter}
    min-height: 12rem;
    width: 100%;
`

export const EventDetails = styled.div`

`

export const EventType = styled.div`

`

export const EventName = styled.div`

`

export const EventTimezoneContainer = styled.div``

export const EventStartContainer = styled.div``

export const EventEndContainer = styled.div``

export const EventCoverIcon = styled(MdPhotoCamera)`
    height: 12rem;
    width: 12rem;
`

export const EventCoverText = styled.h3`
`

export const EventCoverSubText = styled.span``