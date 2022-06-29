import { COLORS } from 'constants/colors';
import { px } from 'helpers/px';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  background: transparent;
  color: ${COLORS.gray[-4]};
  font-size: ${px(14)};
  line-height: ${px(17)};
  border-radius: 4px;
  outline: none;

  // take some 1px off for the border
  padding: ${px(11)} ${px(11)};
  border: 1px solid ${COLORS.gravesend[2]};

  &::placeholder {
    color: ${COLORS.gray[1]};
  }

  &:focus {
    border-color: ${COLORS.gray[1]};
  }
`;

export default Input;
