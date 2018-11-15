import react from 'react'
import CurrentWeatherScreen from './components/CurrentWeatherScreen'
import ForecastScreen from './components/ForecastScreen'
import {
  createStackNavigator,
} from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: CurrentWeatherScreen },
  Forecast: { screen: ForecastScreen}
});

export default App;