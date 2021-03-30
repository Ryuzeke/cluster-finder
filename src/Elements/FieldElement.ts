import {
	Graphics
} from "pixi.js";


export interface IBorderElementConfig {
	width: number;
	height: number;
	radius ? : number;
	alpha ? : number;
	color ? : number;
}
export default class BorderElement extends Graphics {
	public config: IBorderElementConfig
	constructor(config: IBorderElementConfig) {
		super();
		this.config = config;
		this.applyDefaults();

		this.beginFill(this.config.color)
		this.drawRoundedRect(0, 0, this.config.width, this.config.height, this.config.radius);
		this.endFill();
		this.alpha = this.config.alpha;
	}

	/**
	 * Applys defaults
	 */
	private applyDefaults(): void {
		if (this.config.color === undefined)
			this.config.color = 0x000000;

		if (this.config.alpha === undefined)
			this.config.alpha = 1;

		if (this.config.radius === undefined)
			this.config.radius = 0;
	}
}