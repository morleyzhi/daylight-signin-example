import Color from 'color';

// https://web-app-daylight.vercel.app/palette to look up colors!

const MULT = 0.08;

const daylight = '#f89f1a';
const gravesend1 = '#262630';
const gravesend2 = '#1c1c25';
const gravesend3 = '#14141a';
const phyli1 = '#74b949';
const phyli2 = '#5eaf2c';
const phyli3 = '#58a32a';
const globin1 = '#e17670';
const globin2 = '#d75951';
const globin3 = '#c54a42';
const lagoona1 = '#3da89c';
const lagoona2 = '#24978a';
const lagoona3 = '#148b7e';
const gray1 = '#FFFFFF';
const gray2 = '#f1f1f5';
const gray3 = '#A6A6B1';
const gray4 = '#000000';

export const COLORS_ORIGINAL = {
  [gravesend1]: true,
  [gravesend2]: true,
  [gravesend3]: true,
  [phyli1]: true,
  [phyli2]: true,
  [phyli3]: true,
  [globin1]: true,
  [globin2]: true,
  [globin3]: true,
  [lagoona1]: true,
  [lagoona2]: true,
  [lagoona3]: true,
  [gray1]: true,
  [gray2]: true,
  [gray3]: true,
  [gray4]: true,
};

export const COLORS = {
  daylight: {
    // official colors
    '2': '#f89f1a',

    // filler
    '-4': Color(daylight)
      .lighten(MULT * 6)
      .hex(),
    '-3': Color(daylight)
      .lighten(MULT * 5)
      .hex(),
    '-2': Color(daylight)
      .lighten(MULT * 4)
      .hex(),
    '-1': Color(daylight)
      .lighten(MULT * 3)
      .hex(),
    '0': Color(daylight)
      .lighten(MULT * 2)
      .hex(),
    '1': Color(daylight)
      .lighten(MULT * 1)
      .hex(),
    '3': Color(daylight)
      .darken(0.045 * 1)
      .hex(),
    '4': Color(daylight)
      .darken(0.045 * 2)
      .hex(),
  },
  gravesend: {
    // official
    '2': '#262630',
    '3': '#1c1c25',
    '4': '#171820',

    // filler
    '-4': Color(gravesend1)
      .lighten(MULT * 6)
      .hex(),
    '-3': Color(gravesend1)
      .lighten(MULT * 5)
      .hex(),
    '-2': Color(gravesend1)
      .lighten(MULT * 4)
      .hex(),
    '-1': Color(gravesend1)
      .lighten(MULT * 3)
      .hex(),
    '0': Color(gravesend1)
      .lighten(MULT * 2)
      .hex(),
    '1': Color(gravesend1)
      .lighten(MULT * 1)
      .hex(),
  },
  phyli: {
    // official
    '2': '#74b949',
    '3': '#5eaf2c',
    '4': '#58a32a',

    // filler
    '-4': Color(phyli1)
      .lighten(MULT * 6)
      .hex(),
    '-3': Color(phyli1)
      .lighten(MULT * 5)
      .hex(),
    '-2': Color(phyli1)
      .lighten(MULT * 4)
      .hex(),
    '-1': Color(phyli1)
      .lighten(MULT * 3)
      .hex(),
    '0': Color(phyli1)
      .lighten(MULT * 2)
      .hex(),
    '1': Color(phyli1)
      .lighten(MULT * 1)
      .hex(),
  },
  globin: {
    // official
    '2': '#e17670',
    '3': '#d75951',
    '4': '#c54a42',

    // filler
    '-4': Color(globin1)
      .lighten(MULT * 6)
      .hex(),
    '-3': Color(globin1)
      .lighten(MULT * 5)
      .hex(),
    '-2': Color(globin1)
      .lighten(MULT * 4)
      .hex(),
    '-1': Color(globin1)
      .lighten(MULT * 3)
      .hex(),
    '0': Color(globin1)
      .lighten(MULT * 2)
      .hex(),
    '1': Color(globin1)
      .lighten(MULT * 1)
      .hex(),
  },
  lagoona: {
    // official
    '2': '#3da89c',
    '3': '#24978a',
    '4': '#148b7e',

    // filler
    '-4': Color(lagoona1)
      .lighten(MULT * 6)
      .hex(),
    '-3': Color(lagoona1)
      .lighten(MULT * 5)
      .hex(),
    '-2': Color(lagoona1)
      .lighten(MULT * 4)
      .hex(),
    '-1': Color(lagoona1)
      .lighten(MULT * 3)
      .hex(),
    '0': Color(lagoona1)
      .lighten(MULT * 2)
      .hex(),
    '1': Color(lagoona1)
      .lighten(MULT * 1)
      .hex(),
  },
  gray: {
    // official
    '-7': '#f1f1f5',
    '-4': '#A6A6B1',

    // filler
    '-6': Color(gray2)
      .darken(0.051 * 1)
      .hex(),
    '-5': Color(gray2)
      .darken(0.051 * 2)
      .hex(),
    '-3': Color(gray3)
      .darken(0.051 * 1)
      .hex(),
    '-2': Color(gray3)
      .darken(0.051 * 2)
      .hex(),
    '-1': Color(gray3)
      .darken(0.051 * 3)
      .hex(),
    '0': Color(gray3)
      .darken(0.051 * 4)
      .hex(),
    '1': Color(gray3)
      .darken(0.051 * 5)
      .hex(),
    '2': Color(gray3)
      .darken(0.051 * 6)
      .hex(),
    '3': Color(gray3)
      .darken(0.051 * 7)
      .hex(),
    '4': Color(gray3)
      .darken(0.051 * 8)
      .hex(),
    '5': Color(gray3)
      .darken(0.051 * 9)
      .hex(),
    '6': Color(gray3)
      .darken(0.051 * 10)
      .hex(),
    '7': Color(gray3)
      .darken(0.051 * 11)
      .hex(),
  },
  white: '#FFFFFF',
  black: '#000000',
};
