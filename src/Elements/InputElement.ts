import TextInput from 'pixi-text-input'
import BorderElement, {
	IBorderElementConfig
} from './FieldElement';
import NodeElement from './NodeElement';
import {
	ITextElementConfig
} from './TextElement';

export interface IInputElementConfig {
	borderConfig: IBorderElementConfig;
	textConfig: ITextElementConfig;
	maxLength ? : number
}
export default class InputElement extends NodeElement {
	public config: IInputElementConfig;
	public instance: any;
	private borderElement: BorderElement;
	constructor(config: IInputElementConfig) {
		super();
		this.config = config
		this.applyDefaults();

		let TextClass: any = TextInput;

		// convert our parameters to fit the third party library (maybe in future we want to dropoff that library and we need compatibility)
		this.borderElement = new BorderElement(this.config.borderConfig);
		this.instance = new TextClass({
			input: {
				fontSize: this.config.textConfig.fontSize,
				padding: '5px',
				width: this.borderElement.config.width,
				color: this.config.textConfig.color,
				placeholderColor: this.config.textConfig.color,
			},
			box: this.generateBox.bind(this)
		})
		let hexString: string = this.config.textConfig.color.toString(16).replace("0x", "#")
		this.instance.htmlInput.style.color = hexString
		this.instance.placeholder = this.config.textConfig.text
		this.instance.maxLength = this.config.maxLength

		this.addChild(this.instance)
	}

	/**
	 * Gets value
	 * @returns value 
	 */
	public getValue(): any {
		return this.instance.text;
	}

	/**
	 * Sets value
	 * @param val 
	 */
	public setValue(val: any) {
		this.instance.text = val;
	}

	/**
	 * Generates box
	 * @param w 
	 * @param h 
	 * @param state 
	 * @returns box 
	 */
	private generateBox(w: number, h: number, state: string): BorderElement {
		let fieldElement = new BorderElement(this.config.borderConfig);
		return fieldElement
	}


	private applyDefaults(): void {
		if (this.config.textConfig.color === undefined)
			this.config.textConfig.color = 0xffffff;

		if (this.config.textConfig.fontSize === undefined)
			this.config.textConfig.fontSize = 24;

		if (this.config.textConfig.textAlign === undefined)
			this.config.textConfig.textAlign = "center";
	}
}