import Shade from 'components/Shade';
import Modal from 'components/Modal';

import Wallet from 'icons/Wallet';
import Button, { ButtonColor } from 'basics/Button';
import styled from 'styled-components';
import { px } from 'helpers/px';
import { COLORS } from 'constants/colors';
import { isMobile } from 'helpers/isMobile';
import { useHandshake } from 'hooks/useHandshake';
import { useDisconnect } from 'wagmi';

const SignMessageModal: React.FC = () => {
  const { isSigningMessage, isSigningIn, requestSignature } = useHandshake();
  const { disconnect } = useDisconnect();

  const isLoading = isSigningMessage || isSigningIn;

  const title = isMobile()
    ? 'Sign a message in your wallet to continue'
    : 'Sign the message we sent to your wallet to continue';
  return (
    <Shade>
      <Modal>
        <div>
          <IconEl>
            <Wallet />
          </IconEl>

          <TitleEl>{title}</TitleEl>

          <ParagraphEl>
            Your signature verifies that you are the owner of this wallet.
          </ParagraphEl>
        </div>

        <div>
          <Button
            color={ButtonColor.white}
            onClick={() => requestSignature()}
            disabled={isLoading}
          >
            {isLoading ? 'Waiting…' : 'Continue'}
          </Button>
          <Button color={ButtonColor.whiteText} onClick={() => disconnect()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </Shade>
  );
};

const IconEl = styled.div`
  width: fit-content;
  margin: 0 auto ${px(16)};
`;

const TitleEl = styled.h2`
  margin-bottom: ${px(16)};
  text-align: center;
  font-size: ${px(18)};
  line-height: ${px(27)};
  color: ${COLORS.white};
`;

const ParagraphEl = styled.p`
  margin-bottom: ${px(16)};
  text-align: center;
  font-size: ${px(14)};
  line-height: ${px(22)};
  color: ${COLORS.gray[-4]};
`;

export default SignMessageModal;
