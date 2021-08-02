import alt from '../store/alt';
import { NativeModules } from 'react-360';

const { SurfacesController } = NativeModules;

class PlanetActions {
  constructor() {
    this.generateActions('getInfoPlanet');
  }

  displayInfoPanel(idx) {
    try {
      SurfacesController.displayPanel();
    } catch (err) {
      console.err(err);
    }
    this.getInfoPlanet(idx);
  }

  hideInfoPanel() {
    SurfacesController.hidePanel();
  }
}

export default alt.createActions(PlanetActions);
