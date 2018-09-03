import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  max-width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 20px 25px;
  background: #FFF;
  color: #333;
  font-family: Nunito;
  border-top: 1px solid rgba(0, 0, 0, .14);
  z-index: 4;
  overflow-y: scroll;
  animation: slideIn .6s ease-out forwards;

  &.hide {
    animation: slideOut .6s ease-out forwards;
  }

  @keyframes slideIn {
    from { right: -450px; }
    to { right: 0px; }
  }

  @keyframes slideOut {
    from { right: 0px; }
    to { right: -450px; }
  }
`;

export const Slide = styled.div`
  opacity: 0;
  transform: ${props => props.down ? 'translateY(-50px)' : 'translateY(50px)'};
  animation: ${props => props.down ? 'slideDown' : 'slideUp'} .4s .2s ease-out forwards;

  @keyframes slideDown {
    from { opacity: 0; transform: 'translateY(-50px)'; }
    to { opacity: 1; transform: translateY(0); }    
  }

  @keyframes slideUp {
    from { opacity: 0; transform: 'translateY(50px)'; }
    to { opacity: 1; transform: translateY(0); }    
  }
`;

export const TopIcons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  button {
    color: #333;
  }
  #close-bookPanel {
    justify-self: end;
  }
`;

export const CoverAndTitle = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 140px 1fr;
  text-align: center;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const BookTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

export const BookAuthor = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 700;
`;

export const BookCategory = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: #555;
`;

export const BookDescription = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #444;
  font-weight: 400;
  line-height: 1.5;
`;

export const BookOwner = styled.div`
  font-size: 14px;
  margin: 20px 0;
  padding: 20px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;


