'use strict';

import {StackNavigator} from 'react-navigation';
import LandingPage from './LandingPage';

const App = StackNavigator({
  Home: {
    screen: LandingPage,
  },
});

export default App;
