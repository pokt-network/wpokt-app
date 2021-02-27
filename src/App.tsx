import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalFonts from 'fonts/font';

// Components
import Navigation from 'components/Navigation';
import Wrapper from 'components/Wrapper';

const App: React.FC = () => {
  return (
    <Wrapper>
      <GlobalFonts />
      <Router>
        <Navigation />
        <Switch>
          <Route exact path='/'>
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100%' }}>
              <div style={{ alignItems: 'center', background: 'white', display: 'flex', height: '50px', justifyContent: 'center', textAlign: 'center', width: '200px' }}>Home</div>
            </div>
          </Route>
          <Route exact path='/propose'>
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100%' }}>
              <div style={{ alignItems: 'center', background: 'white', display: 'flex', height: '50px', justifyContent: 'center', textAlign: 'center', width: '200px' }}>Propose App</div>
            </div>
          </Route>
          <Route exact path='/new-farm'>
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100%' }}>
              <div style={{ alignItems: 'center', background: 'white', display: 'flex', height: '50px', justifyContent: 'center', textAlign: 'center', width: '200px' }}>New Farm</div>
            </div>
          </Route>
          <Route exact path='/stats'>
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100%' }}>
              <div style={{ alignItems: 'center', background: 'white', display: 'flex', height: '50px', justifyContent: 'center', textAlign: 'center', width: '200px' }}>Stats</div>
            </div>
          </Route>
          <Route exact path='/my-farm'>
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100%' }}>
              <div style={{ alignItems: 'center', background: 'white', display: 'flex', height: '50px', justifyContent: 'center', textAlign: 'center', width: '200px' }}>My Farm</div>
            </div>
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

export default App;
