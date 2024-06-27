import Overlay from 'ol/Overlay';
import Layer from 'ol/layer/Layer';

// interface Layer {
//   layer?: Layer;
// }

interface Overlays {
  overlay?: Overlay[];
}

interface ViewOptions {
  center?: number[];
  zoom?: number;
}

interface MapOptions {
  target?: HTMLElement | string;
  overlays?: Overlays | undefined;
  layers?: Layer[];
  view?: ViewOptions;
}

class MockMap implements MapOptions {
  target?: HTMLElement | string;
  overlays?: Overlays | undefined;
  layers?: Layer[];
  view?: ViewOptions;

  constructor() {
    this.target = '';
    this.layers = [];
    this.overlays = undefined;
    this.view = {};
  }

  addLayer(layer: Layer): void {
    this.layers?.push(layer);
  }

  setView(view: ViewOptions): void {
    this.view = view;
  }
}

export const Map = MockMap;

class MockView {
  options: ViewOptions;
  constructor(options: ViewOptions) {
    this.options = options;
  }
}

export const View = MockView;
