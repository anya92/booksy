import { css } from 'styled-components';

const sizes = {
  desktop: 856,
  untilDesktop: 855,
  tablet: 600,
  phone: 599,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media all and (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  
  if (label == 'phone' || label == 'untilDesktop') {
    acc[label] = (...args) => css`
      @media all and (max-width: ${sizes[label]}px) {
        ${css(...args)}
      }
    `;
  }

  return acc;
}, {});

export default media;
