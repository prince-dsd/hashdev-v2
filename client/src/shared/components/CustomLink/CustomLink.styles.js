import styled from 'styled-components/macro';
import { buttonStyles } from 'shared/styles';
import OutboundLink from './OutboundLink';
import LinkWrapper from './LinkWrapper';

export const StyledLink = styled(LinkWrapper)`
    display: flex;
    flex-direction: column;
    ${buttonStyles}
`;

export const StyledOutboundLink = styled(OutboundLink)`
    ${buttonStyles}
`;
