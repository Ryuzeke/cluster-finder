import { Container } from 'pixi.js'
export default class NodeElement extends Container {
	private _anchorX: number = 0;
	private _anchorY: number = 0;
	constructor() {
		super();
		this.anchorX = 0.5;
		this.anchorY = 0.5;
	}

	/**
     * Shows node element
     */
    public show(): void {
		this.visible = true;
	}

	/**
     * Hides node element
     */
    public hide(): void {
		this.visible = false;
	}

	/**
     * Refershs anchors
     */
    refershAnchors(): void {
		this.anchorX = this.anchorX;
		this.anchorY = this.anchorY;
	}

	/**
     * Sets anchor x
     */
    set anchorX(value) {
		this._anchorX = value;
		this.pivot.x = value * this.width / this.scale.x;
	}

	/**
     * Gets anchor x
     */
    get anchorX() {
		return this._anchorX;
	}

	/**
     * Sets anchor y
     */
    set anchorY(value) {
		this._anchorY = value;
		this.pivot.y = value * this.height / this.scale.y;
	}

	/**
     * Gets anchor y
     */
    get anchorY() {
		return this._anchorY;
	}

	/**
     * Gets scale x
     */
    get scaleX(): number {
		return this.scale.x
	}

	/**
     * Gets scale y
     */
    get scaleY(): number {
		return this.scale.y
	}

	/**
     * Sets scale x
     */
    set scaleX(val: number) {
		this.scale.x = val;
	}

	/**
     * Sets scale y
     */
    set scaleY(val: number) {
		this.scale.y = val;
	}
}