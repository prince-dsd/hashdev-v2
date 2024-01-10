import styled from 'styled-components/macro';
import { mixins } from 'shared/styles';

export const ProfileItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const SpinnerContainer = styled.div`
    ${mixins.flexCenter}
    min-height: 50vh;
`;

export const ProfileItemList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, 284px);
    grid-gap: 20px;
    justify-content: center;
    align-items: start;
    `;
