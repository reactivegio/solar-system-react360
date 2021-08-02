import alt from './alt';
import { asset, NativeModules } from 'react-360';
import PlanetActions from '../actions/planetActions';
const { AudioModule } = NativeModules;
class PlanetStore {
  constructor() {
    this.bindListeners({
      getInfoPlanet: PlanetActions.getInfoPlanet,
    });

    this.state = {
      currentPlanet: {},
      otherPlanets: [],
    };
  }

  getInfoPlanet(planet) {
    fetch('./store/index.json')
      .then(response => {
        if (!response.ok) {
          console.log('errore');
        } else {
          response.json().then(data => {
            let currentData = data.infoPlanets.find(el => el.title === planet);
            let otherPlanets = [];
            data.infoPlanets.filter(el => {
              if (el.title !== planet) return otherPlanets.push(el.title);
            });

            AudioModule.playOneShot({
              source: asset('collect-success.mp3'),
            });
            this.setState({ currentPlanet: currentData, otherPlanets: otherPlanets });
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export default alt.createStore(PlanetStore, 'PlanetStore');
