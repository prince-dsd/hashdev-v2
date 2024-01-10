import { mixins } from "shared/styles";
import { ImUpload } from 'react-icons/im';

import styled from "styled-components/macro";

export const MediaBoxContainer = styled.div`
    ${mixins.flexColumnCenter}
    height: 500px;
`

export const MediaUploadIcon = styled(ImUpload)`
    height: 8rem;
    width: 8rem;
`

export const MediaUploadHeader = styled.h2``
