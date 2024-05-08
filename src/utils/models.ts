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

export interface PointObj {
  id: number;
  name: string;
  longitude: number | undefined;
  latitude: number | undefined;
  description: string;
  country: string;
}

export interface PopupObj {
  id: number;
  name: string;
  longitude: number | undefined;
  latitude: number | undefined;
  description: string;
  country: string;
}
