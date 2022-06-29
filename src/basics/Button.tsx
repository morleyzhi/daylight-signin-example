import styled from 'styled-components';

import Breakpoints from 'constants/breakpoints';
import { COLORS } from 'constants/colors';
import { px } from 'helpers/px';

export enum ButtonColor {
  dark = 'dark',
  white = 'white',
  whiteText = 'whiteText',
}

const ButtonColors = {
  [ButtonColor.dark]: {
    text: COLORS.white,
    textHover: COLORS.white,
    textActive: COLORS.white,
    background: COLORS.gravesend[2],
    backgroundHover: COLORS.gravesend[3],
    backgroundActive: COLORS.gravesend[0],
  },
  [ButtonColor.white]: {
    text: COLORS.black,
    textHover: COLORS.black,
    textActive: COLORS.black,
    background: COLORS.white,
    backgroundHover: COLORS.gray[-7],
    backgroundActive: COLORS.gray[-5],
  },
  [ButtonColor.whiteText]: {
    text: COLORS.white,
    textHover: COLORS.gray[-7],
    textActive: COLORS.gray[-5],
    background: 'transparent',
    backgroundHover: 'transparent',
    backgroundActive: 'transparent',
  },
};

const Button = styled.button<{ color?: ButtonColor }>`
  display: block;
  width: 100%;
  font-size: ${px(14)};
  line-height: ${px(17)};
  text-align: center;
  padding: ${px(12)} ${px(20)};
  border-radius: 2px;

  // less padding on text buttons
  ${(props) => {
    if ((props.color || '').indexOf('Text') !== -1) {
      return `
        padding: ${px(10)} 0 0;


        @media (min-width: ${Breakpoints.Large}) {
          padding: 0;
        }

    `;
    }
  }}

  /* color schemes */
  color: ${(props) =>
    ButtonColors[(props.color as keyof typeof ButtonColors) || ButtonColor.dark]
      .text};

  background: ${(props) =>
    ButtonColors[(props.color as keyof typeof ButtonColors) || ButtonColor.dark]
      .background};

  &:hover {
    color: ${(props) =>
      ButtonColors[
        (props.color as keyof typeof ButtonColors) || ButtonColor.dark
      ].textHover};

    background: ${(props) =>
      ButtonColors[
        (props.color as keyof typeof ButtonColors) || ButtonColor.dark
      ].backgroundHover};
  }

  &:active {
    color: ${(props) =>
      ButtonColors[
        (props.color as keyof typeof ButtonColors) || ButtonColor.dark
      ].textActive};

    background: ${(props) =>
      ButtonColors[
        (props.color as keyof typeof ButtonColors) || ButtonColor.dark
      ].backgroundActive};
  }

  &:not(:first-of-type) {
    margin-top: ${px(24)};
  }
`;

export default Button;
