import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CustomSpinner = () => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '24px',
        height: '24px',
        border: '3px solid rgba(0, 0, 0, 0.1)',
        borderTop: '3px solid #000',
        borderRadius: '50%',
        animation: `${spin} 1s linear infinite`
      }}
    />
  );
};

export default CustomSpinner;
