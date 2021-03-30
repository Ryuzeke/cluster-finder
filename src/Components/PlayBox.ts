import BorderElement, { IBorderElementConfig } from "../Elements/FieldElement";
import TextElement from "../Elements/TextElement";


export default class PlayBox extends BorderElement {
    constructor(config: IBorderElementConfig){
        super(config)
    }
    

    check(){
        let text: TextElement = new TextElement({text: "✔"})
        this.addChild(text)
    }

    getColorNumber():number{
        return this.config.color;
    }
}