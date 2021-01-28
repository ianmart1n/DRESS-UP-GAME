import { Loader, Sprite } from 'pixi.js';
import { ItemConfig } from './Config';
import { size } from './size';

export class ItemStatic {
	spr: Sprite;
	constructor({ spr, x, y, scale }: ItemConfig) {
		const sprite = new Sprite(Loader.shared.resources[spr].texture);
		sprite.anchor.x = sprite.anchor.y = 0.5;
		sprite.x = (x || 0) * size.x;
		sprite.y = (y || 0) * size.y;
		sprite.scale.x = sprite.scale.y = scale || 1;
		this.spr = sprite;
	}
}
