import styled from "styled-components/macro";
import Image from 'react-image';


export const AvatarContainer = styled.div`
    display: flex;
    position: relative;
    height: ${({ size }) => size || '12rem'};
    width: ${({ size }) => size || '12rem'};
`

export const Avatar = styled(Image)`
    height: inherit;
    width: inherit;
    border-radius: 50%;
    position: absolute;
    display: block;
    object-fit: cover;
`;