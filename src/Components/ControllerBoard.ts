import AlertElement from "../Elements/AlertElement";
import ButtonElement from "../Elements/ButtonElement";
import BorderElement from "../Elements/FieldElement";
import NodeElement from "../Elements/NodeElement";
import TextInput from "./TextInput";
import settings from '../settings'

export interface ControllerBoardSubmittedValues {
	rows: number,
		columns: number,
		clustersMinimum: number,
}

export default class ControllerBoard extends NodeElement {
	private border: BorderElement;
	private rowsTextInputComponent: TextInput;
	private columnsTextInputComponent: TextInput;
	private clustersMinimumTextInputComponent: TextInput;
	private submitButtonElement: ButtonElement;
	constructor(submitFunc: Function) {
		super();

		// Add board entity
		this.border = new BorderElement({
			width: 180,
			height: 200,
			alpha: 0.5,
		})
		this.addChild(this.border)


		this.rowsTextInputComponent = new TextInput({
			text: "rows",
			inputRadius: 20,
			inputAlpha: 0.4,
			maxLength: 2,
			inputTextSize: 20,
			inputWidth: 38,
			inputHeight: 30,
			spaceFromText: 73,
			inputInitialValue: settings.playboard.matrix[0],
		})
		this.rowsTextInputComponent.x = 10;
		this.rowsTextInputComponent.y = 10;
		this.addChild(this.rowsTextInputComponent)


		this.columnsTextInputComponent = new TextInput({
			text: "columns",
			inputRadius: 20,
			inputAlpha: 0.4,
			maxLength: 2,
			inputTextSize: 20,
			inputWidth: 38,
			inputHeight: 30,
			spaceFromText: 40,
			inputInitialValue: settings.playboard.matrix[1],
		})
		this.columnsTextInputComponent.x = 10;
		this.columnsTextInputComponent.y = this.rowsTextInputComponent.y + 45;




		this.addChild(this.columnsTextInputComponent)


		// Add clusters entity

		this.clustersMinimumTextInputComponent = new TextInput({
			text: "Min. Clusters",
			inputRadius: 20,
			inputAlpha: 0.4,
			maxLength: 2,
			textSize: 18,
			inputTextSize: 20,
			inputWidth: 38,
			inputHeight: 30,
			spaceFromText: 13,
			inputOffsetY: -5,
			inputInitialValue: settings.playboard.minClusters,
		})
		this.clustersMinimumTextInputComponent.x = 10;
		this.clustersMinimumTextInputComponent.y = this.columnsTextInputComponent.y + 45;



		this.addChild(this.clustersMinimumTextInputComponent)

        let controllerSubmitFunc = async ()=>{
            let boardValues = this.getBoardValues();
            var allNumbers:boolean = Object.values(boardValues).every(item => !isNaN(item))
            // error check and submit func if error passes
            if(!allNumbers){
                return new Promise((resolve, reject) => {
                    let alert = new AlertElement({
                        textConfig: {
                            text: "[ERROR] Only use numbers on fields",
                            color: 0xff0000,
                            textAlign: 'center'
                        },
                        borderConfig: {
                            
                            width: 500,
                            height: 30,
                            alpha: 0.4,
                            radius: 20
                        },
                        animateMs: 500,
                        stayFor: 1000
                    })
                    alert.x = 200;
                    alert.y = 50;
                    this.addChild(alert);
                    alert.animate(()=>{
                        return resolve(false);
                    });
                })
            } else {
                await submitFunc(boardValues);
            }
        }

		// add submit button element 
		this.submitButtonElement = new ButtonElement({
			textConfig: {
				text: "PLAY",
			},
			borderConfig: {
				width: 170,
				height: 30,
				radius: 20,
				alpha: 0.8,
				color: 0x32CD32
			},
			onClick: controllerSubmitFunc
		})
		this.submitButtonElement.x = 85;
		this.submitButtonElement.y = 170
		this.addChild(this.submitButtonElement)
		this.submitButtonElement.show();
	}


	/**
	 * Gets board values
	 */
	public getBoardValues(): ControllerBoardSubmittedValues {
		return {
			rows: this.rowsTextInputComponent.getValue(),
			columns: this.columnsTextInputComponent.getValue(),
			clustersMinimum: this.clustersMinimumTextInputComponent.getValue()
		}
	}

	/**
	 * Shows controller board
	 */
	public show(): void {
		this.visible = true;
	}

	/**
	 * Hides controller board
	 */
	public hide(): void {
		this.visible = false;
	}

}