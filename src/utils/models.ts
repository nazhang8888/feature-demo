import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export interface CustomOptions extends TileLayer<OSM> {
  source?: OSM;
  name?: string;
  isBaseMap?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  isFavorite: boolean;
}

export interface Layer {
  id: number;
  name: string;
  data: object;
}

export interface pointPickerData {
  id: number;
  name: string;
  Longitude: number | undefined;
  Latitude: number | undefined;
  description: string;
  country: string;
}

export interface popupData {
  id: number;
  name: string;
  Longitude: number | undefined;
  Latitude: number | undefined;
  description: string;
  country: string;
}
