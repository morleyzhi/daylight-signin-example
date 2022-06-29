import styled from 'styled-components';
import Breakpoints from 'constants/breakpoints';
import { ZINDEX } from 'constants/zindexes';
import { px } from 'helpers/px';

const Shade = styled.div`
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  height: 100vh;
  z-index: ${ZINDEX.shade};

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  @media (min-width: ${Breakpoints.Large}) {
    padding: ${px(24)};
  }
`;

export default Shade;
