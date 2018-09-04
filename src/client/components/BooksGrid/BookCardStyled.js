import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  transition: transform .2s ease-out;
  &:hover {
    transform: translateY(-2px);
  }
  cursor: pointer;
`;

export const Cover = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Description = styled.div`
  padding: 12px 0;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const Author = styled.div`
  color: #999;
  font-size: 14px;
`;
