import { AnimatedSprite, Loader, Sprite, Ticker } from 'pixi.js';

export class ItemAnimated {
	spr: Sprite;
	constructor(textures: string[], speed = 1) {
		const sprite = new AnimatedSprite(textures.map(i => Loader.shared.resources[i].texture));
		sprite.anchor.x = sprite.anchor.y = 0.5;
		sprite.animationSpeed = speed / Ticker.shared.FPS;
		sprite.play();
		this.spr = sprite;
	}
}
