import { COLORS } from 'constants/colors';
import styled from 'styled-components';

const TextButton = styled.button`
  display: inline;
  text-decoration: underline;
  color: inherit;

  &:hover {
    color: ${COLORS.gray[-2]};
  }

  &:active {
    color: ${COLORS.gray[0]};
  }
`;

export default TextButton;
