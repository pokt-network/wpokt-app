import React from 'react';
import 'styled-components/macro';
import { media } from 'components/breakpoints';
import { colors, GU } from 'components/theme';

import { ReactComponent as SelectorSvg } from 'assets/icons/selector.svg';
import { ReactComponent as DiscrodSvg } from 'assets/icons/discord.svg';
import { ReactComponent as TwitterSvg } from 'assets/icons/twitter.svg';
import { ReactComponent as TelegramSvg } from 'assets/icons/telegram.svg';

import {
  StyledInnerContainer,
  StyledLink,
  StyledFooterContainer,
  StyledNavigationItems,
  StyledSocialContainer,
  StyledLayerContainer,
} from 'components/Footer/components';
import Spacer from 'components/Spacer';
import { P1, P2 } from 'components/Typography';

const Footer: React.FC = () => {
  return (
    <StyledFooterContainer>
      <StyledInnerContainer>
        <TopLayer />
        <Spacer size={'md'} />
        <BottomLayer />
      </StyledInnerContainer>
    </StyledFooterContainer>
  );
};

export default Footer;

const TopLayer: React.FC = () => {
  return (
    <StyledLayerContainer>
      <StyledNavigationItems>
        <li>
          <a
            css={`
              margin-right: ${6 * GU}px;

              ${media.lg`
                margin-right: ${8 * GU}px;
              `}

              ${media.xl`
                margin-right: ${10 * GU}px;
              `}
            `}
            href={'https://discord.gg/FK4A8AFrHZ'}
            target={'_blank'}
            rel={'noreferrer noopener'}
          >
            Support
          </a>
        </li>
        <li>
          <a href={'https://www.pokt.network/'} target={'_blank'} rel={'noreferrer noopener'}>
            About POKT
          </a>
        </li>
        <li>
          <StyledLink exact activeClassName="active" to="/propose-app">
            <div>
              <SelectorSvg />
            </div>
            Propose App
          </StyledLink>
        </li>
      </StyledNavigationItems>
      <Spacer size={'md'} />
      <StyledSocialContainer>
        <a href={'https://discord.com/invite/uYs6Esum3r'} target={'_blank'} rel={'noreferrer noopener'}>
          <DiscrodSvg />
        </a>
        <a href={'https://twitter.com/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TwitterSvg />
        </a>
        <a href={'https://t.me/POKTnetwork'} target={'_blank'} rel={'noreferrer noopener'}>
          <TelegramSvg />
        </a>
      </StyledSocialContainer>
    </StyledLayerContainer>
  );
};

const BottomLayer: React.FC = () => {
  return (
    <StyledLayerContainer>
      <P2 color={'#fff'}>
        By using this app you accept Pocket{' '}
        <a
          css={`
            color: ${colors.green};
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          `}
          href={'/'}
          target={'_blank'}
          rel={'noreferrer noopener'}
        >
          Terms of Service
        </a>
      </P2>
      <Spacer size={'md'} />
      <P1
        color={'#fff'}
        css={`
          font-family: 'Podkova', serif;
          text-transform: uppercase;
        `}
      >
        ©2021 Pocket Network Inc.
      </P1>
    </StyledLayerContainer>
  );
};