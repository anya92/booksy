import styled from 'styled-components';

import media from './mediaQueries';

export const Container = styled.div`
  display: grid;
  ${media.phone`
    grid-gap: 20px;
  `}
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  justify-content: center;
  padding-top: 20px;
`;

export const Book = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  &:hover {
    /* ??? */
  }
  cursor: pointer;
`;

export const BookCover = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BookDescription = styled.div`
  padding: 12px 0;
`;

export const BookTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const BookAuthor = styled.div`
  color: #999;
  font-size: 14px;
`;
