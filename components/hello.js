import React, { Component } from 'react';
import { Text, View, asset, VrButton, Video, VideoControl, MediaPlayerState } from 'react-360';
import { Dimensions } from 'react-native';
class Hello extends Component {
  constructor() {
    super();
    this._updateDimensions = this._updateDimensions.bind(this);
    this.state = {
      styles: {
        button: {
          backgroundColor: 'rgba(255,255,255,0.8)',
          color: '#333',
          fontSize: 20,
          fontWeight: '400',
          paddingLeft: 10,
          paddingRight: 10,
          margin: 10,
          textAlign: 'center',
          textAlignVertical: 'center',
          borderRadius: 10,
          width: 100,
          height: 40,
        },
        dropdownButton: {
          backgroundColor: 'rgba(255,255,255,0.1)',
          fontSize: 20,
          fontWeight: '200',
          paddingLeft: 0.15,
          paddingRight: 0.15,
          paddingTop: 0.05,
          paddingBottom: 0.05,
          textAlign: 'center',
          textAlignVertical: 'center',
          color: 'black',
          borderRadius: 0,
        },
      },
      page: 1,
      video: '',
      size: 20,
      dropDown: false,
      playerState: new MediaPlayerState({
        loop: true,
        autoPlay: true,
        volume: 0.5,
      }),
      realWidth: 0,
      realHeight: 0,
      videoStyles: {
        width: 1,
        height: 80,
        // transform: [{ translate: [0, 250, this.state.size * -4] }],
      },
      showMenu: false,
    };
    // this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateDimensions);

    const move = () => {
      const updatedWidth = this.state.videoStyles.width + 23;
      this.setState({
        videoStyles: {
          width: updatedWidth > this.state.realWidth ? updatedWidth : this.state.realWidth,
          height: this.state.videoStyles.height + 10,
        },
      });
    };
    const id = setInterval(move, 50);
    setTimeout(() => {
      clearInterval(id);
      this.setState({ showMenu: true });
    }, 2200);
  }

  componentWillUnmount() {
    Dimensions.get('window').removeEventListener('resize', this._updateDimensions);
  }
  _updateDimensions() {
    console.log('resize');
    const screenWidth = Dimensions.get('window').width;
    this.setState({
      videoStyles: {
        width:
          this.state.videoStyles.width > screenWidth ? this.state.videoStyles.width : screenWidth,
      },
      realHeight: Dimensions.get('window').width,
      realWidth: window.innerWidth,
    });
  }

  changeVideo(content) {
    const videoList = {
      1: 'FB-VR-Demo.mp4',
      2: 'FB-VR-Demo2.mp4',
      3: 'FB-F8.mp4',
      about: 'andy.m4v',
    };
    this.setState({
      video: videoList[content],
    });
  }
  changeSize(size) {
    this.setState({
      size,
    });
  }
  triggerDropDown() {
    this.setState({
      dropDown: !this.state.dropDown,
    });
  }
  render() {
    const { styles } = this.state;
    console.log(this.state.videoStyles.width);
    return (
      <View
        style={{
          width: this.state.videoStyles.width,
          transform: [{ translate: [0, -60, 0] }],
        }}
        /* style={{
          width: 1000,

        }} */
      >
        {this.state.showMenu && (
          <View
            style={{
              // layoutOrigin: [0.5, 0.5],
              transform: [{ translate: [0, 10, this.state.size * -4] }],
              backgroundColor: 'rgba(0,0,0,0.8)',
              flexDirection: 'row',
              width: this.state.videoStyles.width,
              height: 60,
              borderRadius: 10,
              paddingBottom: 10,
            }}>
            <Text style={{ ...styles.button, backgroundColor: 'rgba(0,0,0,0)', color: '#FFF' }}>
              VRPlayer
            </Text>
            <VrButton
              onClick={() => this.changeVideo(1)}
              onEnter={() => console.log('Button2 onEnter?')}>
              <Text style={styles.button}>Demo 1</Text>
            </VrButton>
            <VrButton
              onClick={() => this.changeVideo(2)}
              onEnter={() => console.log('Button2 onEnter?')}>
              <Text style={styles.button}>Demo 2</Text>
            </VrButton>
            <VrButton
              onClick={() => this.changeVideo(3)}
              onEnter={() => console.log('Button2 onEnter?')}>
              <Text style={styles.button}>Demo 3</Text>
            </VrButton>
            <VrButton onClick={() => this.changeVideo('about')}>
              <Text style={styles.button}>About</Text>
            </VrButton>
          </View>
        )}
        <View
          style={{
            // layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, this.state.size * -4] }],
            backgroundColor: 'rgba(0,0,0,0.8)',
            height: 400,
            flexDirection: 'row',
            width: this.state.videoStyles.width,
            borderRadius: 10,
          }}>
          <Video
            style={{
              width: this.state.videoStyles.width,
              height: 500,
            }}
            onEnded={() => {
              alert('Go on');
            }}
            source={asset(this.state.video)}
            playerState={this.state.playerState}
          />
        </View>
        {this.state.video ? (
          <View
            style={{
              width: this.state.videoStyles.width,
              height: 80,
              transform: [{ translate: [-3.5, -120.5, this.state.size * -4] }],
            }}>
            <VideoControl
              style={{
                height: 80,
                width: this.state.videoStyles.width,
                padding: 15,
              }}
              playerState={this.state.playerState}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

export default Hello;
