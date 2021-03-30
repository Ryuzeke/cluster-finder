import InputElement, {
	IInputElementConfig
} from "../Elements/InputElement";
import NodeElement from "../Elements/NodeElement";
import TextElement from "../Elements/TextElement";

export interface ITextInputComponentConfig {
	text: string;
	textSize ? : number;
	textColor ? : number;
	maxLength ? : number;
	inputWidth ? : number;
	inputHeight ? : number;
	inputRadius ? : number;
	inputAlpha ? : number;
	inputTextSize ? : number;
	inputInitialValue ? : any;
	inputOffsetY ? : number;
	spaceFromText ? : number;
}

export default class ControllerBoard extends NodeElement {
	private inputElement: InputElement
	public config: ITextInputComponentConfig;
	constructor(config: ITextInputComponentConfig) {
		super();
		//set default values
		this.config = Object.assign({
				text: "",
				textSize: 21,
				textColor: 0xffffff,
				maxLength: 32,
				inputWidth: 100,
				inputHeight: 50,
				inputRadius: 0,
				inputAlpha: 0.7,
				inputTextSize: 22,
				inputInitialValue: "",
				spaceFromText: 20,
				inputOffsetY: 0
			},
			config
		)

		let inputElementConf: IInputElementConfig = {
			borderConfig: {
				width: this.config.inputWidth,
				height: this.config.inputHeight,
				radius: this.config.inputRadius,
				alpha: this.config.inputAlpha
			},
			textConfig: {
				text: "",
				fontSize: this.config.inputTextSize
			},
			maxLength: this.config.maxLength
		}


		// Add rows entity
		let textElement = new TextElement({
			text: this.config.text,
			fontSize: this.config.textSize,
			color: this.config.textColor
		})
		this.addChild(textElement)

		this.inputElement = new InputElement(inputElementConf)
		this.inputElement.x = textElement.x + textElement.width + this.config.spaceFromText;
		this.inputElement.setValue(this.config.inputInitialValue || "");
		this.inputElement.y = this.config.inputOffsetY;
		this.addChild(this.inputElement)
	}

	/**
	 * Gets value
	 * @returns value 
	 */
	public getValue(): any {
		return this.inputElement.getValue();
	}

	/**
	 * Sets value
	 * @param val 
	 */
	public setValue(val: any) {
		this.inputElement.setValue(val);
	}
}