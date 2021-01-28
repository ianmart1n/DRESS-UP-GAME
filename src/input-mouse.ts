import { size } from "./size";

// setup inputs
export const mouse = {
	element: null,

	down: false,
	justDown: false,
	justUp: false,

	pos: {
		x: 0,
		y: 0,
	},
	delta: {
		x: 0,
		y: 0,
	},
	prev: {
		x: 0,
		y: 0,
	},
	mouseWheel: 0,

	init: function (element: HTMLElement) {
		this.element = element;
		this.element.addEventListener('pointerup', mouse.onUp.bind(mouse));
		this.element.addEventListener('pointerout', mouse.onUp.bind(mouse));
		this.element.addEventListener('pointerdown', mouse.onDown.bind(mouse));
		this.element.addEventListener('pointermove', mouse.onMove.bind(mouse));
		this.element.addEventListener('wheel', mouse.onWheel.bind(mouse));
		this.element.addEventListener("DOMMouseScroll", mouse.onWheel.bind(mouse));
	},

	update: function () {
		this.justDown = false;
		this.justUp = false;

		this.mouseWheel = 0;

		// save old position
		this.prev.x = this.pos.x;
		this.prev.y = this.pos.y;
		// calculate delta position
		this.delta.x = 0;
		this.delta.y = 0;
	},

	onDown: function (event) {
		if (this.down !== true) {
			this.down = true;
			this.justDown = true;
		}
		this.onMove(event);
	},
	onUp: function (event) {
		this.down = false;
		this.justDown = false;
		this.justUp = true;
		this.onMove(event);
	},
	onMove: function (event) {
		// get new position
		this.pos.x = event.offsetX / this.element.clientWidth * size.x;
		this.pos.y = event.offsetY / this.element.clientHeight * size.y;
		// calculate delta position
		this.delta.x = this.pos.x - this.prev.x;
		this.delta.y = this.pos.y - this.prev.y;
	},
	onWheel: function (event) {
		this.mouseWheel = Math.sign(event.deltaY || event.originalEvent?.wheelDelta || 0);
		event.preventDefault();
	},

	isDown: function () {
		return this.down;
	},
	isUp: function () {
		return !this.isDown();
	},
	isJustDown: function () {
		return this.justDown;
	},
	isJustUp: function () {
		return this.justUp;
	},

	// returns -1 when moving down, 1 when moving up, 0 when not moving
	getWheelDir: function () {
		return Math.sign(this.mouseWheel);
	},
};
