import TileLayer from 'ol/layer/Tile';
import { StadiaMaps } from 'ol/source';

export interface CustomOptions extends TileLayer<StadiaMaps> {
  source?: StadiaMaps;
  preload?: number;
  name?: string;
  isBaseMap?: boolean;
}

export interface CustomDarkOptions extends TileLayer<StadiaMaps> {
  source?: StadiaMaps;
  preload?: number;
  name?: string;
  isDark?: boolean;
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
  type: string;
  name: string;
  country: string;
  longitude: number | undefined;
  latitude: number | undefined;
  description: string;
}
