import styled from 'styled-components';

export const BackgroundImage = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9475140397956058) 13%,
      rgba(0, 0, 0, 0.8130602582830007) 43%,
      rgba(255, 255, 255, 0) 100%
    ),
    url(${props => props.img});
  background-size: cover;
  background-position: center center;
  filter: brightness(200%);
`;
