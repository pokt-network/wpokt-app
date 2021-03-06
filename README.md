<div align="center">
  <a href="https://www.pokt.network">
    <img src="https://user-images.githubusercontent.com/16605170/74199287-94f17680-4c18-11ea-9de2-b094fab91431.png" alt="Pocket Network logo" width="340"/>
  </a>
</div>

# Project Title

Frontend for wPOKT, allowing wPOKT purchasers to stake and crowdsource infrastructure for their favorite applications.

## Overview

The wPOKT app adds a new opportunity for users to profit from supporting Pocket Network’s economy: by staking wPOKT as a Farmer – earning farming rewards, subsidizing relays for Apps, and liquidizing the network. This creates a virtuous cycle that provides a compounded and synergic reward.

By augmenting Pocket Network’s core market with a Data Farming economy, we direct liquidity farming mechanisms towards a noble purpose – being the supercharger on the flywheel of a true public good. This revolutionary new economy will coordinate DeFi “degenerates” towards a regenerative outcome – planting rather than extracting value – by decommissioning centralized points of failure and bringing crypto back to its decentralized roots.

## Rinkeby Addresses
wPOKT: `0x362067F3833a232786354e1366b0d3797583C7E1`\
TokenGeyser: `0xC32eB16f016b193966caC6980F5EB25d498E8DC9`\
Unlocked wPOKT Pool: `0x39b79EF73F25413BBA2624f818eA924b74B83EBF` \
Locked wPOKT Pool: `0x5368e433d65E2De1188dC0B9a0B9a74e7DD1AC3A`

## Getting Started
To get started, create a `.env` file:
`cp .env.example .env`

... then run `yarn` to install libraries.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Documentation

### Components
All components were built with [`styled-components`](https://styled-components.com/).

#### `Card`
Primary card to hold content.

#### `InnerCardContainer`
An inner container to separate sections within a card.

**Properties:**
```
borderBottom: boolean
```

#### `MediumInfoCard`
Card for holding a medium amount of info.

**Properties:**
```
amount: string;
header: string;
icon: 'chest' | 'clock' | 'diamond' | 'key' | 'padlock' | 'rake' | 'rewards' | 'star';
size: 'sm' | 'md';
```

#### `SmallInfoCard`
Card for holding a small amount of info.
```
statContent: string;
statFill?: number;
statTitle: string;
iconType: 'question' | 'caret';
```

#### `MediumDepositWithdrawLinks`
Styled link to switch between deposit and withdraw functions.

**Properties:**
```
onDepositWithdrawLink: (actionType: 'deposit' | 'withdraw') => void;
```

#### `MediumStatsFaqLinks`
Component that holds medium-sized Stat and FAQ links.

#### `SmallInfoCardExtraLinks`
Component that holds small-sized Stat and FAQ links.

**Properties:**
```
showOnDesktop?: boolean;
showOnMobile?: boolean;
```

#### `Button`
Basic button to wrap SVGs.

#### `Flex`
Shortcut container to easily style with flex-box.

**Properties:**
```
align?: 'flex-start' | 'center' | 'flex-end';
direction?: string;
full?: boolean;
justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
```

#### `Spacer`
Shortcut container for adding uniform spacing between components.

**Properties:**
```
size: 'xs' | 'sm' | 'md' | 'lg';
```

#### Typography
All typography takes the same properties.

**Properties:**
```
center?: boolean;
color?: string;
```

## Running the tests

```
yarn test
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/pokt-network/repo-template/blob/master/CONTRIBUTING.md) for details on contributions and the process of submitting pull requests.

## Support & Contact

<div>
  <a  href="https://twitter.com/poktnetwork" ><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"></a>
  <a href="https://t.me/POKTnetwork"><img src="https://img.shields.io/badge/Telegram-blue.svg"></a>
  <a href="https://www.facebook.com/POKTnetwork" ><img src="https://img.shields.io/badge/Facebook-red.svg"></a>
  <a href="https://research.pokt.network"><img src="https://img.shields.io/discourse/https/research.pokt.network/posts.svg"></a>
</div>


## License

This project is licensed under the MIT License; see the [LICENSE.md](LICENSE.md) file for details.
