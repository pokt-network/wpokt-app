import styled, { css } from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

export const StyledChartContainer = styled(ResponsiveContainer)`
  min-height: ${75 * GU}px;
  max-height: ${75 * GU}px;

  ${media.sm`
    min-height: ${100 * GU}px;
    max-height: ${100 * GU}px;
  `}

  ${media.md`
    min-height: ${125 * GU}px;
    max-height: ${125 * GU}px;
  `}

  ${media.xl`
    max-width: ${160 * GU}px;
  `}
`;

export const StyledContentContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  ${media.xl`
    width: ${250 * GU}px;
  `}
`;

export const StyledExpandButton = styled.button`
  background: transparent;
  border: none;
  position: absolute;
  right: ${9 * GU}px;
  top: ${180 * GU}px;

  ${media.xs`
    right: ${12 * GU}px;
    top: ${200 * GU}px;
  `}

  ${media.sm`
    right: ${12 * GU}px;
    top: ${105 * GU}px;
  `}

  ${media.md`
    right: ${15 * GU}px;
    top: ${115 * GU}px;
  `}

  ${media.lg`
    top: ${80 * GU}px;
  `}

  ${media.xl`
    top: ${10 * GU}px;
  `}

  &:hover {
    cursor: pointer;
  }
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

interface IStyledHeader {
  farmSelected: boolean;
}

export const StyledHeader = styled.div<IStyledHeader>`
  align-items: flex-start;
  background: #000;
  border: ${GU}px solid #000000;
  border-bottom: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }

  ${media.sm`
    align-items: center;
    flex-direction: row;
  `}

  ${(props) =>
    props.farmSelected &&
    css`
      background: ${colors.yellow};
    `}
`;

export const StyledHeaderLeft = styled.div`
  align-items: center;
  display: flex;

  div#farm-title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: ${5 * GU}px ${5 * GU}px ${4 * GU}px;

    ${media.xs`
      padding: ${5 * GU}px ${6 * GU}px;
    `}

    ${media.sm`
      padding: ${7 * GU}px;
    `}
  }
`;

export const StyledHeaderRight = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${media.sm`
    flex-direction: row;
    width: ${104 * GU}px;
  `}

  ${media.md`
    width: ${140 * GU}px;
  `}

  ${media.lg`
    width: ${190 * GU}px;
  `}

  ${media.xl`
    width: ${340 * GU}px;
  `}

  div#estimated-reward {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    padding: ${4 * GU}px ${5 * GU}px;

    ${media.xs`
      padding: ${6 * GU}px ${7 * GU}px;
    `}

    ${media.sm`
      padding: ${7 * GU}px ${7 * GU}px ${7 * GU}px 0;
    `}
  }
`;

export const StyledLine = styled.div`
  background: ${colors.red};
  height: ${0.5 * GU}px;
  width: 100%;

  ${media.sm`
    height: ${5 * GU}px;
    margin: 0 ${2 * GU}px 0 0;
    width: ${GU}px;
  `}
`;

interface IStyledSelectorContainer {
  farmSelected: boolean;
}

export const StyledSelectorContainer = styled.div<IStyledSelectorContainer>`
  fill: #fff;
  height: ${5 * GU}px;
  margin-left: ${5 * GU}px;
  width: ${5 * GU}px;

  ${(props) =>
    props.farmSelected &&
    css`
      transform: rotate(90deg);
    `}
`;

export const StyledStakedText = styled.p`
  color: ${colors.white};
  font-family: PixelSplitter;
  font-size: 1rem;
  letter-spacing: 1px;

  ${media.xs`
    font-size: 1.6rem;
  `}

  ${media.md`
    font-size: 2.4rem;
  `}
`;

export const StyledSmallInfoCardsContainer = styled.div`
  align-items: center;
  background: #fff;
  border: ${GU}px solid #000000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${2 * GU}px ${2 * GU}px 0;
  position: relative;
  width: 100%;

  ${media.xs`
    padding: ${5 * GU}px ${5 * GU}px 0;
  `}

  ${media.sm`
    height: auto;
  `}

  ${media.md`
    padding: ${7 * GU}px ${7 * GU}px 0;
  `}

  ${media.lg`
    flex-direction: row;
  `}
`;