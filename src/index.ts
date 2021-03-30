import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import ControllerBoard, { ControllerBoardSubmittedValues } from './Components/ControllerBoard';
import PlayingBoard, { IPlayingBoardConfig } from './Components/PlayingBoard';
import Matrix from './Utils/Matrix';
import settings from './settings'
export default class PixiBoot extends Application
{
	constructor()
	{
		//TODO: remove that. thats only for pixi extension tool
		let testing = window as any;
		testing.PIXI = PIXI


		super({
			view: <HTMLCanvasElement>document.getElementById('canvas'),
			backgroundColor: 0x333333,
			width: 1920,
			height: 1080,
			resizeTo: window
		});
		document.body.appendChild(this.view);


		function animate(time) { //TODO: Add it to pixi ticker no need for two
			requestAnimationFrame(animate)
			TWEEN.update(time)
		}
		requestAnimationFrame(animate)

		const playingBoardDefaultSettings:IPlayingBoardConfig = {
			width: settings.playboard.width,
			height: settings.playboard.height,
			colors: settings.playboard.colors,
			spaceBetween: settings.playboard.spaceBetween,
			minClusters: settings.playboard.minClusters,
			matrix: new Matrix(settings.playboard.matrix[0],settings.playboard.matrix[1])
		}

		const playingBoard = new PlayingBoard()
		playingBoard.x = 200;
		playingBoard.y = 20;

		const submitFunction = (results:ControllerBoardSubmittedValues)=>{
			return new Promise((resolve, reject) => {
				let matrix = new Matrix(Number(results.rows),Number(results.columns));
				let settings:IPlayingBoardConfig = Object.assign(playingBoardDefaultSettings, {
					minClusters: results.clustersMinimum,
					matrix
				})
				playingBoard.clear();
				playingBoard.start(settings);
				resolve(true);
			});
		}
		const controller = new ControllerBoard(submitFunction);

		this.stage.addChild(playingBoard)
		this.stage.addChild(controller)
	}
}

new PixiBoot();
