import Breakpoints from 'constants/breakpoints';
import { COLORS } from 'constants/colors';
import { px } from 'helpers/px';
import styled from 'styled-components';

type ModalProps = {
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  return <El>{children}</El>;
};

const El = styled.div`
  background: ${COLORS.gravesend[2]};

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  padding: ${px(24)};

  @media (min-width: ${Breakpoints.Large}) {
    position: static;

    max-width: ${px(570)};
    min-height: ${px(379)};
    border-radius: ${px(8)};
    padding: ${px(48)} ${px(48)} ${px(32)};

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default Modal;
