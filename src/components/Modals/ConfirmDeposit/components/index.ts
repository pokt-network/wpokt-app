import styled, { css } from 'styled-components/macro';
import { colors, GU } from 'components/theme';
import { media } from 'components/breakpoints';

export const StyledCloseContainer = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  display: flex;
  fill: ${colors.white};
  justify-content: center;
  position: absolute;
  right: ${1 * GU}px;
  top: ${2 * GU}px;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    fill: ${colors.yellow};
  }
`;

export const StyledCoinContainer = styled.div`
  height: ${12 * GU}px;
  width: ${12 * GU}px;
  margin-right: ${4 * GU}px;
`;

interface IStyledContentContainer {
  copied?: boolean;
}

export const StyledContentContainer = styled.div<IStyledContentContainer>`
  border-bottom: ${GU}px solid #000000;
  box-sizing: border-box;
  padding: ${4 * GU}px;

  button {
    background: transparent;
    border: none;

    ${(props) =>
      props.copied &&
      css`
        background: #000;
        border-radius: 5px;
        color: ${colors.white};
        font-family: PixelSplitter;
        font-size: 0.8rem;
        height: ${5 * GU}px;
        width: ${16 * GU}px;
      `}

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledDepositButtonContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${20 * GU}px;
  justify-content: center;
  width; 100%;

  button {
    background: transparent;
    border: none;
    transition: all 0.1s ease;

    &:hover {
      cursor: pointer;
      transform: translate3d(0, -2px, 0);
    }

    &:active {
      cursor: pointer;
      transform: translate3d(0, 2px, 0);
    }
  }
`;

export const StyledDetailHeader = styled.div`
  background: #000;
  padding: ${3 * GU}px;
`;

export const StyledFarmContainer = styled.div`
  height: ${7 * GU}px;
  margin-right: ${5 * GU}px;
  width: ${8 * GU}px;

  ${media.sm`
    height: ${10 * GU}px;
    margin-right: ${5 * GU}px;
    width: ${10 * GU}px;
  `}
`;

export const StyledModalContainer = styled.div`
  background: white;
  box-sizing: border-box;
  left: 50%;
  padding: ${2 * GU}px;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: ${75 * GU}px;
  z-index: 10000;

  ${media.sm`
    width: ${100 * GU}px;
  `}

  ${media.lg`
    width: ${120 * GU}px;
  `}
`;
