import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { media } from 'components/breakpoints';
import { colors } from 'components/theme';

export const StyledCloseContainer = styled.div`
  fill: ${colors.white};
  position: absolute;
  right: 2rem;
  top: 4rem;
  transition: all 0.3s ease;

  &:hover,
  &:active,
  &:focus {
    color: ${colors.yellow};
  }
`;

export const StyledLink = styled(NavLink)`
  color: ${colors.white};
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: 1em;

  &:focus {
    color: ${colors.yellow};
  }
  &.active {
    color: ${colors.yellow};
  }
`;

export const StyledNav = styled.nav`
  ul {
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    font-size: 1.8rem;
    height: 15rem;
    justify-content: space-between;
    letter-spacing: 3px;
    margin-top: 10rem;

    li {
      align-items: center;
      display: flex;
      justify-content: flex-start;
    }
  }
`;

interface IStyledSidebarBackground {
  active: boolean;
}

export const StyledSidebarBackground = styled.div<IStyledSidebarBackground>`
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.9);
  display: none;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;

  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}

  ${media.sm`
        display: none;
    `}
`;
