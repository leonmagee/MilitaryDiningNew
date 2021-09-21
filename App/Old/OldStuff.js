<Picker style={styles.pickerInput} selectedValue='Male' onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
  <Picker.Item label="Male" value="male"/>
  <Picker.Item label="Female" value="female"/>
</Picker>


// from settings page
<View style={styles.currentInfoBox}>
  <Text>name: {this.state.name}</Text>
  <Text>weight: {this.state.weight}
    lbs</Text>
  <Text>height feet: {this.state.height_feet}</Text>
  <Text>height inches: {this.state.height_inches}</Text>
  <Text>gender: {this.state.gender}</Text>
  <Text>age: {this.state.age}</Text>
  <Text>activity: {this.state.activity}</Text>
</View>



<MapView.Marker coordinate={this.state.markerPosition}>
  <View style={styles.radius}>
    <View style={styles.marker}></View>
  </View>
</MapView.Marker>
