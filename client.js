// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.js"

// Auto-generated content.
import { ReactInstance, Surface, Math as GLMath, Module } from 'react-360-web';

const infoPanel = new Surface(1040, 850, Surface.SurfaceShape.Flat);

class SurfacesController extends Module {
  constructor() {
    super('SurfacesController');
  }
  displayPanel() {
    infoPanel.setVisibility(true);
  }
  hidePanel() {
    infoPanel.setVisibility(false);
  }
}

function init(bundle, parent, options = {}) {
  const horizontalPanel = new Surface(2900, 2000, Surface.SurfaceShape.Flat);

  const cameraDirection = [0, 0, 0];
  const { rotateByQuaternion } = GLMath;

  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [new SurfacesController()],
    cusorVisibility: 'visible',
    frame: () => {
      const cameraQuat = r360.getCameraQuaternion();
      cameraDirection[0] = 0;
      cameraDirection[1] = 0;
      cameraDirection[2] = -2;
      // cameraDirection will point out from the view of the camera,
      // we can use it to compute surface angles
      rotateByQuaternion(cameraDirection, cameraQuat);

      const cx = cameraDirection[0];
      const cy = cameraDirection[1];
      const cz = cameraDirection[2];

      // con math.atan2 il pannello segue lo schermo
      const horizAngle = Math.atan2(cx, -cz);
      const vertAngle = Math.asin(cy / Math.sqrt(cx * cx + cy * cy + cz * cz));
      horizontalPanel.setAngle(0, 0);
      infoPanel.setAngle(horizAngle, vertAngle);
    },
    // Add custom options here
    ...options,
  });

  infoPanel.setDensity(4096);
  r360.renderToSurface(r360.createRoot('InfoPanel'), infoPanel);
  r360.renderToSurface(r360.createRoot('SolarSystem'), horizontalPanel);

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('space.jpg'));

  infoPanel.setVisibility(false);
}

window.React360 = { init };
