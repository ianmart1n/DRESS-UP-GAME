import { Container } from "pixi.js";
import { LayerConfig } from "./Config";
import { size } from "./size";

export class Layer extends Container {
	active = 0;
	constructor(public config: LayerConfig) {
		super();
		this.x = (config.x || 0) * size.x;
		this.y = (config.y || 0) * size.y;
		this.scale.x = this.scale.y = config.scale || 1;
	}
}
