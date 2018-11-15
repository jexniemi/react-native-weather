import React, {Component} from 'react'
import {Platform, ActivityIndicator, SafeAreaView, Image, Button, Text, StyleSheet, View} from 'react-native';

export default class CurrentWeatherScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weatherData: {},
      isLoading: true,
      longitude: null,
      latitude: null
    }

    this.getLocation = this.getLocation.bind(this)
  }

  static navigationOptions = {
    title: 'Current Weather',
  };

  componentWillMount() {
    this.fetchWeatherData()
  }

  componentDidMount() {
    navigator.geolocation.requestAuthorization()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => {
        alert(error)
      })
  }

  fetchWeatherData() {
    this.setState({isLoading: true})
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=helsinki&appid=5f0806ccb9f09d1f597d6bf282e5d9ec')
      .then(response => response.json())
      .then(data => {
        this.setState({weatherData: data, isLoading: false})
        console.log(data)
      })
  }

  render() {
    data = this.state.weatherData

    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.weatherViewContainer}>
          <View style={styles.headerView}>
            <Text style={{fontSize: 20}}>{data.city? data.city.name : 'N/A'}</Text>
          </View>
          <View style={styles.weatherView}>
            <Image style={styles.imageView} source={{uri: 'https://www.ersshading.com/images/weather-sensors/icon-sun.png'}} />
            <View style={styles.weatherDetailsView}>
              <View style={styles.subHeaderView}>
                <Text style={{fontSize: 20}}>20C</Text>
              </View>
              <View style={styles.subHeaderView}>
                <Text style={{fontSize: 20}}>5 m/s</Text>
              </View>
            </View>
          </View>
          <View style={styles.locationView}>
            <View style={styles.buttonView}>
              <Button title="Get location" color='black' onPress={() => this.getLocation()}/>
            </View> 
          </View>
          <View style={styles.bottomView}>
            <View style={{flex: 2, alignItems: 'center'}}>
              <Text>Latitude: {this.state.latitude}</Text>
              <Text>Longitude: {this.state.longitude}</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={styles.buttonView}>
                <Button title="5 day forecast" color='black' onPress={() => this.props.navigation.navigate('Forecast')}></Button>
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
    flex: 1,
    backgroundColor: 'rgb(0,191,300)',
  },
  weatherViewContainer: {
    flex: 1,
    backgroundColor: 'rgb(0,191,300)'
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
    padding: 30,
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


const styles2 = StyleSheet.create({
  headerView: {
    backgroundColor: 'red',
    flex: 1
  },
  weatherView: {
    backgroundColor: 'yellow',
    flex: 4,
  },
  bottomView: {
    backgroundColor: 'blue',
    flex: 5
  }
});