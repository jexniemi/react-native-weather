import React from 'react'
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native'

export default class ForecastScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    let forecast = navigation.getParam('forecast')

    const listItems = forecast.list.map((item, idx) => 
      <View key={idx} style={styles.item}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Image style={{width: 50, height: 50}} source={{uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`}}/>
          <Text>{Math.round(item.main.temp - 273.15) + '°C'}</Text>
          <Text>{item.dt_txt.substr(0, item.dt_txt.length - 9)}</Text>
        </View>
      </View>
    )

    return (
      <ScrollView style={styles.container}>
        {listItems}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 60
  },
})