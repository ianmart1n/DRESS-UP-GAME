import './resizer.css';

export type ScaleModes = 'fit' | 'cover' | 'multiples' | 'none';

const SCALE_LUT: Record<ScaleModes, (
	containerWidth: number,
	containerHeight: number,
	baseWidth: number,
	baseHeight: number,
	ratio: number
) => [number, number, number]> = {
	fit: function scaleToFit(
		containerWidth,
		containerHeight,
		baseWidth,
		_baseHeight,
		ratio
	) {
		let width = containerWidth;
		let height = containerHeight;
		if (width / height < ratio) {
			height = Math.round(width / ratio);
		} else {
			width = Math.round(height * ratio);
		}
		return [width, height, width / baseWidth];
	},
	none: function scaleNone(
		_containerWidth,
		_containerHeight,
		baseWidth,
		baseHeight
	) {
		return [baseWidth, baseHeight, 1];
	},
	multiples: function scaleInMultiples(
		containerWidth,
		containerHeight,
		baseWidth,
		baseHeight,
		ratio
	) {
		let width = containerWidth;
		let height = containerHeight;
		if (width / height < ratio) {
			height = Math.round(width / ratio);
		} else {
			width = Math.round(height * ratio);
		}

		let scaleMultiplier = 1;
		let aw = baseWidth;
		let ah = baseHeight;

		while (aw + baseWidth <= width || ah + baseHeight <= height) {
			aw += baseWidth;
			ah += baseHeight;
			scaleMultiplier += 1;
		}
		return [aw, ah, scaleMultiplier];
	},
	cover: function scaleToCover(
		containerWidth,
		containerHeight,
		baseWidth,
		_baseHeight,
		ratio
	) {
		let width = containerWidth;
		let height = containerHeight;
		if (width / height < ratio) {
			width = Math.round(height * ratio);
		} else {
			height = Math.round(width / ratio);
		}

		return [width, height, width / baseWidth];
	},
};

export class Resizer {
	element: HTMLDivElement;

	ratio: number;

	scaleMultiplier: number;

	constructor(
		private baseWidth: number,
		private baseHeight: number,
		public scaleMode: ScaleModes = 'fit'
	) {
		this.element = document.createElement('div');
		this.element.className = 'resizer';

		this.ratio = this.baseWidth / this.baseHeight;

		this.scaleMultiplier = 1;

		window.onresize = this.onResize;

		this.onResize();
	}

	setSize(x: number, y: number) {
		this.baseWidth = x;
		this.baseHeight = y;
		this.ratio = this.baseWidth / this.baseHeight;
		this.onResize();
	}

	onResize = (): void => {
		const [w, h, scaleMultiplier] = SCALE_LUT[this.scaleMode](
			this.element.offsetWidth,
			this.element.offsetHeight,
			this.baseWidth,
			this.baseHeight,
			this.ratio
		);

		Array.from(this.element.children).forEach((element: Element) => {
			const htmlElement = element as HTMLElement;
			if (htmlElement.style) {
				htmlElement.style.width = `${w}px`;
				htmlElement.style.height = `${h}px`;
			}
		});
		this.scaleMultiplier = scaleMultiplier;
	};

	appendChild(element: HTMLElement): void {
		this.element.appendChild(element);
		this.onResize();
	}
}
