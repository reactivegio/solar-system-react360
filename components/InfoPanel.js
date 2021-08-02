import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { View, asset, Text, Image, VrButton, ActivityIndicator } from 'react-360';
import PlanetActions from '../actions/planetActions';

import PlanetStore from '../store/index';

const styles = {
  close: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 2,
    right: 1,
    zIndex: 99,
  },
};

class InfoPanel extends React.Component {
  static getStores() {
    return [PlanetStore];
  }

  static getPropsFromStores() {
    return PlanetStore.getState();
  }
  constructor() {
    super();
    this.state = {
      section: 0,
    };
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          transform: [{ translate: [0, -100, -350] }],
        }}>
        <View
          style={{
            backgroundColor: 'pink',
            width: 150,
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-beetween',
          }}>
          {this.props.otherPlanets.map(el => {
            return (
              <VrButton
                style={{ transform: [{ translate: [0, 0, -350] }] }}
                onClick={() => PlanetActions.displayInfoPanel(el)}
                key={el}>
                <Text
                  style={{
                    margin: 16,
                    fontSize: 28,
                    backgroundColor: 'black',
                    paddingLeft: 10,
                    width: 118,
                    textAlign: 'center',
                  }}>
                  {el}
                </Text>
              </VrButton>
            );
          })}
        </View>
        <VrButton onClick={() => PlanetActions.hideInfoPanel()}>
          <View
            style={{
              backgroundColor: '#333',
              width: 840,
              height: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-beetween',
            }}>
            <View
              style={{
                backgroundColor: '#333',
                paddingLeft: 26,

                with: 900,
              }}>
              <Text
                style={{
                  fontSize: 35,
                  color: '#FFF',
                  padding: 10,
                }}>
                {this.props.currentPlanet.title ? this.props.currentPlanet.title : 'LOADING'}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  margin: 16,
                  fontSize: 28,
                  textAlign: 'left',
                }}>
                {this.props.currentPlanet.desc ? this.props.currentPlanet.desc : ''}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  margin: 16,
                  fontSize: 28,
                  textAlign: 'left',
                }}>
                Length of year: {this.props.currentPlanet.year ? this.props.currentPlanet.year : ''}
              </Text>
            </View>
            <VrButton style={styles.close} onClick={() => PlanetActions.hideInfoPanel()}>
              <Image style={styles.close} source={asset('icons/icon_close.svg')} />
            </VrButton>
          </View>
        </VrButton>
      </View>
    );
  }
}

export default connectToStores(InfoPanel);
