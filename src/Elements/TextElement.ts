import { Text } from "pixi.js";
import NodeElement from "./NodeElement";


export interface ITextElementConfig {
    text: string,
    fontSize?: number;
    textAlign?: "left" | "center" | "right" | "justify";
    color?: number;
}
export default class TextElement extends NodeElement {
    public config: ITextElementConfig
    private textInstance: Text;
    constructor(config:ITextElementConfig){
        super();
        this.config = config
        this.applyDefaults();
        
        this.textInstance = new Text(this.config.text, {fontFamily : 'Arial', fontSize: this.config.fontSize, fill: this.config.color, align : this.config.textAlign})
        this.addChild(this.textInstance);
    }

    /**
     * Applys defaults
     */
    private applyDefaults():void{
        if(this.config.color === undefined)
            this.config.color = 0xffffff;

        if(this.config.fontSize === undefined)
            this.config.fontSize = 24;

        if(this.config.textAlign === undefined)
            this.config.textAlign = "center";
    }
}