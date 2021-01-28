import { ScaleModes } from './Resizer/Resizer';

export interface ItemConfig {
	spr: string;
	x?: number;
	y?: number;
	scale?: number;
}

export interface ItemDraggableConfig extends ItemConfig {
	unique?: boolean;
}

export type LayerConfig = {
	x?: number;
	y?: number;
	scale?: number;
} & (
	| {
			type: 'static';
			data: {
				ui?: boolean;
				items: ItemConfig[];
			};
	  }
	| {
			type: 'animated';
			data: {
				ui?: boolean;
				speed?: number;
				items: ItemConfig[];
			};
	  }
	| {
			type: 'cycle';
			data: {
				arrowX: number;
				arrowY: number;
				arrowGap: number;
				items: ItemConfig[];
			};
	  }
	| {
			type: 'drag-and-drop';
			data: {
				items: ItemDraggableConfig[];
			};
	  }
	| {
			type: 'filter';
			data: {
				arrowX: number;
				arrowY: number;
				arrowGap: number;
				shaders: {
					fragment: string;
					uniforms?: {};
				}[];
				items: never[];
			};
	  }
);

export interface Config {
	size: { x: number; y: number };
	scaleMode?: ScaleModes;
	layers: Partial<Record<string, LayerConfig>>;
}
