import BorderElement, { IBorderElementConfig } from "./FieldElement";
import NodeElement from "./NodeElement";
import TextElement, { ITextElementConfig } from "./TextElement";
import TWEEN from '@tweenjs/tween.js'

export interface IAlertElementConfig {
	borderConfig: IBorderElementConfig;
	textConfig: ITextElementConfig;
    animateMs: number;
    stayFor?: number;
}
export default class AlertElement extends NodeElement {
    public config:IAlertElementConfig;
    private borderElement: BorderElement;
    private textElement: TextElement;
    constructor(config:IAlertElementConfig){
        super();
        this.config = config;
        this.borderElement = new BorderElement(this.config.borderConfig);
        this.textElement = new TextElement(this.config.textConfig);
        this.hide();

        this.addChild(this.borderElement);
        this.addChild(this.textElement);
        this.alignItems();
    }

    /**
     * Aligns items
     */
    private alignItems():void{
        this.textElement.y = (this.borderElement.height/2)-(this.textElement.height/2)
        switch (this.textElement.config.textAlign) {
            case "left":
                this.textElement.x = this.textElement.width/2
                break;

            case "center":
                this.textElement.x = (this.borderElement.width/2)-(this.textElement.width/2)
                break;

            case "right":
                this.textElement.x = this.borderElement.width/2
                break;
        
            default:
                break;
        }
    }

    public animate(cb?:Function):void{
        this.show();
        let initialY = this.y;
        let initialAlpha = this.alpha;

        this.y = initialY+60;
        this.alpha = 0;

        const tween = new TWEEN.Tween(this)
        .to({y:initialY, alpha: initialAlpha}, this.config.animateMs/2)
        .easing(TWEEN.Easing.Linear.None)
        .onComplete(()=>{
            setTimeout(() => {
                const tween2 = new TWEEN.Tween(this)
                .to({y:initialY-60, alpha: 0}, this.config.animateMs/2)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(()=>{
                    if(cb) cb();
                    this.destroy();
                })
                tween2.start()
            }, this.config.stayFor || 2000);
        })
        tween.start()
    }
}