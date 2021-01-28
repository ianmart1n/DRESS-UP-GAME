import { Loader } from 'pixi.js';
import { Config } from './Config';

export const size = (Loader.shared.resources.config.data as Config).size;
