import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import YouTube from 'react-native-youtube';
import { variables } from '../Styles/Variables';
import { defaults } from '../Styles/Defaults';
import Footer from './Footer';
import api from '../Utils/api';

const styles = StyleSheet.create({
  mainWrap: {
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#000',
    flex: 1,
  },
  titleBlock: {
    fontFamily: 'BlackOpsOne-Regular',
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: 21,
    color: '#FFF',
    textAlign: 'center',
    backgroundColor: variables.brandSecond,
  },
  youTubeWrap: {
    backgroundColor: 'blue',
  },
  youTubeStyle: {
    alignSelf: 'stretch',
    height: 300,
    backgroundColor: '#000',
  },
  // webViewStyle: {
  // 	backgroundColor: 'red',
  // }
});

class HealthVideos extends Component {
  constructor() {
    super();

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    api
      .getHealthVideos()
      .then(response => {
        console.log('HEALTH', response);
        this.setState({ videos: response });
      })
      .done();
  }

  render() {
    const videosContent = this.state.videos.map((item, key) => (
      <View key={key} style={styles.youTubeWrap}>
        <Text style={styles.titleBlock}>{item.video_title}</Text>
        <YouTube
          videoId={item.youtube_video_id} // The YouTube video ID
          play={false} // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop={false} // control whether the video should loop when ended
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{
            alignSelf: 'stretch',
            height: 300,
            backgroundColor: 'black',
            marginBottom: 0,
          }}
        />
      </View>
    ));

    return (
      <View style={defaults.defaultMainWrap}>
        <View style={defaults.defaultTitleWrap}>
          <Text style={defaults.defaultTitle}>Health Videos</Text>
        </View>
        <ScrollView style={styles.mainWrap}>{videosContent}</ScrollView>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

module.exports = HealthVideos;
