import { Loader } from "pixi.js";
import { Interactive } from "./Interactive";

export class Button extends Interactive {
	constructor(onClick: () => void, ...args: ConstructorParameters<typeof Interactive>) {
		super(...args);
		this.addListener('click', () => {
			Loader.shared.resources.btn.data.play();
			this.selectAnim = 1.0;
			onClick();
		});
	}
}
