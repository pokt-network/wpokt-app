import React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { NavLink } from 'react-router-dom';
import 'styled-components/macro';

import { ReactComponent as LogoSvg } from 'assets/icons/logo.svg';
import MetaMaskImage from 'assets/images/metamask.png';
import NavigationBarImage from 'assets/images/navigation_bar_long.png';
import { ReactComponent as SandwichMenu } from 'assets/icons/sandwich_menu.svg';
import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';

import {
  StyledLink,
  StyledConnectWalletButton,
  StyledLogoContainer,
  StyledMetaMaskImageContainer,
  StyledNavigationContainer,
  StyledNavigationItems,
  StyledSandwichMenuContainer,
} from 'components/Navigation/components';
import { Flex } from 'components/Containers';

import { Web3Context } from 'contexts/Web3';

import { shortenAddress } from 'utils';

interface INavigation {
  onConnectButton: () => Promise<boolean | undefined>;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: React.FC<INavigation> = ({ onConnectButton, setSidebar }) => {
  const { address } = React.useContext(Web3Context);

  return (
    <StyledNavigationContainer
      css={`
        background-image: url(${NavigationBarImage});
      `}
    >
      <NavLink exact activeClassName="active" to="/">
        <StyledLogoContainer>
          <VisuallyHidden>Home</VisuallyHidden>
          <LogoSvg />
        </StyledLogoContainer>
      </NavLink>
      <StyledNavigationItems>
        <ul>
          <li>
            <StyledLink exact activeClassName="active" to="/">
              <SelectorSvg />
              Home
            </StyledLink>
          </li>
          <li>
            <StyledLink exact activeClassName="active" to="/stats">
              <SelectorSvg />
              Stats
            </StyledLink>
          </li>
          <li>
            <StyledLink exact activeClassName="active" to="/my-farms">
              <SelectorSvg />
              My Farms
            </StyledLink>
          </li>
        </ul>
      </StyledNavigationItems>
      <Flex align={'center'}>
        <StyledConnectWalletButton connected={address ? true : false} onClick={onConnectButton}>
          {address ? shortenAddress(address) : 'Connect'}
          <StyledMetaMaskImageContainer
            css={`
              background-image: url(${MetaMaskImage});
            `}
          />
        </StyledConnectWalletButton>
        <StyledSandwichMenuContainer onClick={() => setSidebar(true)}>
          <VisuallyHidden>Menu</VisuallyHidden>
          <SandwichMenu />
        </StyledSandwichMenuContainer>
      </Flex>
    </StyledNavigationContainer>
  );
};

export default Navigation;
