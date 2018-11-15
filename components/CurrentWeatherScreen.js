import React, {Component} from 'react'
import {ActivityIndicator, SafeAreaView, Image, Button, Text, StyleSheet, View} from 'react-native';

export default class CurrentWeatherScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentWeather: {},
      forecast: {},
      isLoading: true,
      longitude: null,
      latitude: null
    }

    this.getLocationWeather = this.getLocationWeather.bind(this)
  }

  static navigationOptions = {
    title: 'Weather'
  };

  componentWillMount() {
    this.getLocationWeather()
  }

  componentDidMount() {
    navigator.geolocation.requestAuthorization()
  }

  getLocationWeather() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        this.setState({ 
          latitude: lat,
          longitude: lon
        })
        // Get current weather
        this.fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5f0806ccb9f09d1f597d6bf282e5d9ec`,
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5f0806ccb9f09d1f597d6bf282e5d9ec`
        )
      },
      (error) => {
        alert(error)
      })
  }

  fetchWeatherData(weatherUrl, forecastUrl) {
    this.setState({isLoading: true})
    try {
      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
          this.setState({currentWeather: data, isLoading: false})
          console.log(data)
        })
      } catch (error) {
        alert('Can not get location')
      }

    try {
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          this.setState({forecast: data, isLoading: false})
          console.log(data)
        })
      } catch (error) {
        alert('Can not get location')
      }
  }

  render() {
    let data = this.state.currentWeather
    let spinner = this.state.isLoading? <ActivityIndicator /> : null
    return(
      <SafeAreaView style={styles.container}>
        {spinner}
        <View style={styles.weatherViewContainer}>
          <View style={styles.weatherView}>
            <Image style={styles.imageView} source={{uri: 'https://www.ersshading.com/images/weather-sensors/icon-sun.png'}} />
            <View style={styles.weatherDetailsView}>
              <View style={styles.subHeaderView}>
                <Text style={{fontSize: 20}}>{data.main? Math.round(data.main.temp - 273.15) + '°C' : 'N/A'}</Text>
              </View>
              <View style={styles.subHeaderView}>
                <Text style={{fontSize: 20}}>{data.main? data.wind.speed + 'M/S' : 'N/A'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.locationView}>
            <View style={styles.buttonView}>
              <Button title="Get location" 
                color='black' 
                onPress={() => this.getLocationWeather()}
              />
            </View> 
          </View>
          <View style={styles.bottomView}>
            <View style={{flex: 2, alignItems: 'center'}}>
              <Text>{data.name}</Text>
              <Text>Latitude: {this.state.latitude}</Text>
              <Text>Longitude: {this.state.longitude}</Text>
            </View>
            <View style={{flex: 3}}>
              <View style={styles.buttonView}>
                <Button 
                  title="5 day forecast" 
                  color='black' 
                  onPress={() => this.props.navigation.navigate('Forecast', {forecast: this.state.forecast})} 
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  weatherViewContainer: {
    flex: 1
  },
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeaderView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherView: {
    flex: 2,
    flexDirection: 'row',
    padding: 40,
  },
  locationView: {
    flex: 2,
    justifyContent: 'center'
  },
  bottomView: {
    flex: 5,
    justifyContent: 'space-around'
  },
  imageView: {
    flex: 1
  },
  weatherDetailsView: {
    flex: 1
  },
  buttonView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: 200,
    borderRadius: 20
  }
});