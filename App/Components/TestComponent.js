import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    color: '#FFF',
    fontSize: 30,
  },
});

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue',
      day: 'Thursday',
      dataArray: [
        { name: 'Leon', car: 'Volvo' },
        { name: 'Larry', car: 'Ford' },
      ],
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  // handleClick() {
  //   console.log('I was clicked');
  // }

  handleClick = () => {
    console.log('now clicked for real!', this.state.day);
  };

  render() {
    const Info = this.state.dataArray.map((item, key) => (
      <View key={key}>
        <Text>
          Name: {item.name} - {item.car}
        </Text>
      </View>
    ));
    return (
      <View style={styles.mainWrap}>
        <Text style={styles.textWrap}>Here is some text</Text>
        <TouchableHighlight onPress={() => this.handleClick()}>
          <Text>Click Me</Text>
        </TouchableHighlight>
        {Info}
      </View>
    );
  }
}

module.exports = TestComponent;
