import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  background: #555;
  opacity: 0;
  animation: show .4s ease-out forwards;

  &.hide {
    animation: hide .4s ease-out forwards;
  }

  @keyframes show {
    from { opacity: 0; }
    to { opacity: 0.8; }
  }

  @keyframes hide {
    from { opacity: 0.8; }
    to { opacity: 0; }
  }
`; 

export const Container = styled.div`
  width: 400px;
  max-width: 100%;
  position: fixed;
  top: 72px;
  bottom: 0;
  right: 0;
  padding: 20px 25px;
  background: #FFF;
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

export const Close = styled.i`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 36px;
  color: #555;
  cursor: pointer;
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

export const BookAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

export const BookTitle = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

export const BookCategory = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #777;
  text-align: center;
`;

export const BookDescription = styled.div`
  margin-top: 40px;
  font-size: 16px;
  color: #555;
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


