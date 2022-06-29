import React from 'react';
import { IconProps } from 'types/icons';

const Wallet: React.FC<IconProps> = ({ size }) => (
  <svg
    width={size || 32}
    height={size || 32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.6666 11V23C25.6666 24.4728 24.4727 25.6667 22.9999 25.6667H8.99992C7.52716 25.6667 6.33325 24.4728 6.33325 23V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.0001 17.3334C22.0001 17.7015 21.7015 18.0001 21.3334 18.0001C20.9653 18.0001 20.6667 17.7015 20.6667 17.3334C20.6667 16.9653 20.9653 16.6667 21.3334 16.6667C21.7015 16.6667 22.0001 16.9653 22.0001 17.3334Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.9999 10.9999H25.6666M22.9999 10.9999H8.66659C7.37792 10.9999 6.33325 9.95525 6.33325 8.66659C6.33325 7.37792 7.37792 6.33325 8.66659 6.33325H20.3333C21.8061 6.33325 22.9999 7.52716 22.9999 8.99992V10.9999Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Wallet;
