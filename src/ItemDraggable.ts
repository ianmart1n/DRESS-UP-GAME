import { Loader } from 'pixi.js';
import { ItemDraggableConfig } from './Config';
import { mouse } from './input-mouse';
import { Interactive } from './Interactive';
import { lerp } from './utils';

export class ItemDraggable extends Interactive {
	drag() {
		this.selected = true;
		this.v.x += (mouse.pos.x - this.spr.x - ItemDraggable.offset.x) / 4;
		this.v.y += (mouse.pos.y - this.spr.y - ItemDraggable.offset.y) / 4;
		this.angle += mouse.mouseWheel * 15;
		this.selectAnim = lerp(this.selectAnim, 0.9, 0.1);
	}
	static dragging: ItemDraggable = null;
	static target: ItemDraggable = null;
	static offset = { x: 0, y: 0 };

	constructor(config: ItemDraggableConfig) {
		super(config);
		this.addListener('click', () => {
			Interactive.selected = this;
			Interactive.interactives.splice(
				Interactive.interactives.findIndex(i => i === this),
				1
			);
			Interactive.interactives.unshift(this);
			Interactive.selected.spr.parent.addChildAt(Interactive.selected.spr, Interactive.selected.spr.parent.children.length);
			ItemDraggable.offset.x = mouse.pos.x - Interactive.selected.spr.x;
			ItemDraggable.offset.y = mouse.pos.y - Interactive.selected.spr.y;
			Loader.shared.resources.pickup.data.play();
		});
		this.addListener('release', () => {
			Loader.shared.resources.drop.data.play();
			Interactive.selected.selected = false;
			Interactive.selected = null;
		});
	}

	update(time) {
		super.update(time);
		if (Interactive.selected === this) {
			this.drag();
		}
	}
}
