import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PlanetStore from './store/index';
import { asset, AppRegistry, View, Animated, PointLight, VrButton, Text } from 'react-360';
import Entity from 'Entity';
import PlanetActions from './actions/planetActions';
import InfoPanel from './components/InfoPanel.js';

class HorizontalPanel extends React.Component {
  static getStores() {
    return [PlanetStore];
  }

  static getPropsFromStores() {
    return PlanetStore.getState();
  }
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      antirotation: 360,
      angle1: 30,
      angle2: 50,
      angle3: 70,
      angle4: 90,
      angle5: 110,
      angle6: 130,
      angle7: 150,
      angle8: 190,
    };
  }

  componentDidMount() {
    this.rotate();
  }

  rotate() {
    this.setState({
      rotation: this.state.rotation + 1,
      antirotation: this.state.antirotation - 1,
      angle1: this.state.angle1 + 0.01,
      angle2: this.state.angle2 + 0.009,
      angle3: this.state.angle3 + 0.006,
      angle4: this.state.angle4 + 0.0095,
      angle5: this.state.angle5 + 0.0075,
      angle6: this.state.angle6 + 0.0065,
      angle7: this.state.angle7 + 0.0055,
      angle8: this.state.angle8 + 0.0045,
    });
    if (this.state.rotation > 360) {
      this.setState({ rotation: 1 });
    }
    if (this.state.antirotation < 1) {
      this.setState({ antirotation: 360 });
    }
    if (this.state.angle1 > 180) {
      this.setState({ angle1: 1 });
    }
    if (this.state.angle2 > 360) {
      this.setState({ angle2: 1 });
    }
    if (this.state.angle3 > 360) {
      this.setState({ angle3: 1 });
    }
    if (this.state.angle4 > 360) {
      this.setState({ angle4: 1 });
    }
    if (this.state.angle5 > 360) {
      this.setState({ angle5: 1 });
    }
    if (this.state.angle6 > 360) {
      this.setState({ angle6: 1 });
    }
    if (this.state.angle7 > 360) {
      this.setState({ angle7: 1 });
    }
    if (this.state.angle8 > 360) {
      this.setState({ angle8: 1 });
    }
    requestAnimationFrame(this.rotate.bind(this));
  }
  render() {
    return (
      <View>
        <PointLight
          intensity={1}
          style={({ color: 'white' }, { transform: [{ translate: [0, 0, 0] }] })}
        />

        <VrButton
          onClick={() => {
            PlanetActions.displayInfoPanel('Mercury');
          }}>
          <Entity
            source={{ obj: asset('sphere.obj') }}
            texture={asset('mercury.jpg')}
            style={{
              transform: [
                {
                  translate: [
                    1850 + Math.cos(this.state.angle1) * 450,
                    -850,
                    -790 * Math.sin(this.state.angle1),
                  ],
                },
                { scale: [10, 10, 10] },
                { rotateY: this.state.rotation },
              ],
            }}
          />
        </VrButton>
        <VrButton
          onClick={() => {
            PlanetActions.displayInfoPanel('Venus');
          }}>
          <Entity
            source={{ obj: asset('sphere.obj') }}
            texture={asset('venus.jpg')}
            style={{
              transform: [
                {
                  translate: [
                    1850 + Math.cos(this.state.angle2) * 580,
                    -850,
                    -750 * Math.sin(this.state.angle2),
                  ],
                },
                { scale: [20, 20, 20] },
                { rotateY: this.state.antirotation },
              ],
            }}
          />
        </VrButton>
        <VrButton
          style={{
            transform: [
              {
                translate: [
                  1850 + Math.cos(this.state.angle3) * 710,
                  -950,
                  -850 * Math.sin(this.state.angle3),
                ],
              },
              { scale: [20, 20, 20] },
              { rotateY: this.state.rotation },
            ],
          }}
          onClick={() => {
            PlanetActions.displayInfoPanel('Earth');
          }}>
          <Entity source={{ obj: asset('sphere.obj') }} texture={asset('earth.png')} />
        </VrButton>
        <VrButton
          style={{
            transform: [
              {
                translate: [
                  1850 + Math.cos(this.state.angle4) * 790,
                  -950,
                  -850 * Math.sin(this.state.angle4),
                ],
              },
              { scale: [10, 10, 10] },
              { rotateY: this.state.rotation },
            ],
          }}
          onClick={() => {
            PlanetActions.displayInfoPanel('Mars');
          }}>
          <Entity source={{ obj: asset('sphere.obj') }} texture={asset('mars.jpg')} />
        </VrButton>
        <VrButton
          style={{
            transform: [
              {
                translate: [
                  1850 + Math.cos(this.state.angle5) * 830,
                  -950,
                  -850 * Math.sin(this.state.angle5),
                ],
              },
              { scale: [40, 40, 10] },
              { rotateY: this.state.rotation },
            ],
          }}
          onClick={() => {
            PlanetActions.displayInfoPanel('Jupiter');
          }}>
          <Entity source={{ obj: asset('sphere.obj') }} texture={asset('jupiter.jpg')} />
        </VrButton>
        <VrButton
          style={{
            transform: [
              {
                translate: [
                  1850 + Math.cos(this.state.angle6) * 890,
                  -950,
                  850 * Math.sin(-this.state.angle6),
                ],
              },
              { scale: [80, 80, 10] },
              { rotateY: this.state.rotation },
              { rotateZ: 15 },
            ],
          }}
          onClick={() => {
            PlanetActions.displayInfoPanel('Saturn');
          }}>
          <Entity source={{ obj: asset('Saturn.obj') }} texture={asset('saturn.jpg')} />
        </VrButton>
        <VrButton
          style={{
            transform: [{ translate: [1850, -850, -600] }, { scale: [80, 80, 50] }],
          }}
          onClick={() => {
            PlanetActions.displayInfoPanel('Sun');
          }}>
          <Entity source={{ obj: asset('sphere.obj') }} texture={asset('sun.jpg')} />
        </VrButton>
      </View>
    );
  }
}

AppRegistry.registerComponent('InfoPanel', () => InfoPanel);
AppRegistry.registerComponent('SolarSystem', () => HorizontalPanel);

export default connectToStores(HorizontalPanel);
