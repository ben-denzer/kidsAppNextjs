import styled from 'styled-components';
import { color1 } from '../../config/globalStyles';
const leftMargin = 25;

export const ButtonContainer = styled.div`
  margin: 15px 0 0 ${leftMargin}px;
`;

export const DetailLabel = styled.span`
  color: ${color1};
`;
export const DetailRow = styled.div`
  margin: 0 0 5px ${leftMargin}px;
  font-size: 18px;
  font-weight: bold;
`;
export const DetailText = styled.span`
`;

export const DetailTitle = styled.h2`
  text-align: left !important;
  margin-left: ${leftMargin}px;
`;
