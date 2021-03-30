import { Graphics, Text } from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import NodeElement from './NodeElement';
import BorderElement, { IBorderElementConfig } from './FieldElement';
import TextElement, { ITextElementConfig } from './TextElement';
import Binder from '../Utils/Binder';

interface IButtonElementConfig {
    borderConfig: IBorderElementConfig
    textConfig: ITextElementConfig;
    onClick?: Function;
}

export default class ButtonElement extends NodeElement {
    private config:IButtonElementConfig;
    private textElement:TextElement;
    private borderElement:BorderElement;
    private initialScale:number;
    private binder:Binder;
    private programaticDeactive: boolean;
    constructor(config:IButtonElementConfig){
        super();
        this.config = config

        this.binder = new Binder();
        this.binder.set("onButtonDown",this.onButtonDown.bind(this))
        this.binder.set("onButtonUp", this.onButtonUp.bind(this))
        this.borderElement = new BorderElement(this.config.borderConfig);
        this.textElement = new TextElement(this.config.textConfig);
        this.addChild(this.borderElement);
        this.addChild(this.textElement);
        this.alignItems();
        this.refershAnchors();

        this.initialScale = this.scaleX;
        this.hide();

        this.buttonMode = true;
        this.enable();
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

    /**
     * Shows button element
     */
    public show():void{
        this.visible = true;
        this.startButtonsListeners();
    }

    /**
     * Hides button element
     */
    public hide():void{
        this.visible = false;
        this.stopButtonsListeners();
    }

    /**
     * Enables button element
     */
    public enable():void{
        this.interactive = true;
        this.alpha = 1;
        this.textElement.alpha = 1;
    }

    /**
     * Disables button element
     * @param [optical] 
     */
    public disable():void{
        this.interactive = false;
        this.alpha = 0.9;
        this.textElement.alpha = 0.5;
    }

    /**
     * Gets enabled
     */
    get enabled():boolean {
        return this.interactive;
    }

    /**
     * Starts buttons listeners
     */
    private startButtonsListeners(){
        this
        .on('mousedown', this.binder.get("onButtonDown"))
        .on('touchstart', this.binder.get("onButtonDown"))
        .on('mouseup', this.binder.get("onButtonUp"))
        .on('touchend', this.binder.get("onButtonUp"))
        .on('mouseupoutside', this.binder.get("onButtonUp"))
        .on('touchendoutside', this.binder.get("onButtonUp"))
    }

    /**
     * Stops buttons listeners
     */
    private stopButtonsListeners(){
        this
        .off('mousedown', this.binder.get("onButtonDown"))
        .off('touchstart', this.binder.get("onButtonDown"))
        .off('mouseup', this.binder.get("onButtonUp"))
        .off('touchend', this.binder.get("onButtonUp"))
        .off('mouseupoutside', this.binder.get("onButtonUp"))
        .off('touchendoutside', this.binder.get("onButtonUp"))
    }

    /**
     * Determines whether button down on
     * @returns button down 
     */
    private onButtonDown():void{
        console.log('button down')
        if(this.programaticDeactive) return;
        this.programaticDeactive = true;
        const newScale:number = this.initialScale-0.1;
        const tween = new TWEEN.Tween(this)
        .to({scaleX: newScale, scaleY: newScale}, 100)
        .easing(TWEEN.Easing.Linear.None)
        tween.start()
    }

    /**
     * Determines whether button up on
     * @returns button up 
     */
    private async onButtonUp():Promise<void>{
        console.log('button up')
        const newScale:number = this.initialScale;
        const tween = new TWEEN.Tween(this)
        .to({scaleX: newScale, scaleY: newScale}, 100)
        .easing(TWEEN.Easing.Linear.None)
        tween.start()
        tween.onComplete(async ()=>{
            this.disable();
            if(this.config.onClick){
                await this.config.onClick();
            }
            this.programaticDeactive = true;
            this.enable();
        })
    }
}