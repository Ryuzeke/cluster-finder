import NodeElement from "../Elements/NodeElement";
import ClusterFinder from "../Evaluators/ClusterFinder";
import Matrix from "../Utils/Matrix";
import PlayBox from "./PlayBox";

export interface IPlayingBoardConfig {
    width: number,
    height: number,
    spaceBetween: number;
    colors: number[],
    minClusters: number,
    matrix: Matrix
}

export default class PlayingBoard extends NodeElement {
    public config:IPlayingBoardConfig;
    constructor(){
        super();
    }

    public start(config:IPlayingBoardConfig){
        this.config = config;
        this.clear();
        this.newGame()
    }

    public clear():void {
        while(this.children[0]) { 
            this.removeChild(this.children[0]);
        }
    }

    private newGame(): void{
        this.config.matrix.randomFillMatrix(this.config.colors);
        console.log(this.config.matrix)
        this.drawMatrixPlayBoxes()
        this.checkClusters();

    }

    private checkClusters():void {
        const finderEvaluator = new ClusterFinder(this.config.matrix, {minimumToMakeCluster: this.config.minClusters});
        const clusters = finderEvaluator.findClusters();
        clusters.forEach(cluster => {
            cluster.cords.forEach(cord => {
                let playBox:PlayBox = this.getChildByName(`playbox[${cord.y}][${cord.x}]`) as PlayBox;
                playBox.check();
            });
        });
    }

    private drawMatrixPlayBoxes(){
        let matrix = this.config.matrix;
        const calculatedWidthPerBox:number = (this.config.width-((matrix.columnsCount-1)*this.config.spaceBetween))/matrix.columnsCount
        const calculatedHeightPerBox:number = (this.config.height-((matrix.rowsCount-1)*this.config.spaceBetween))/matrix.rowsCount
        for(let i=0; i<matrix.rowsCount; i++){
            for(let v=0; v<matrix.columnsCount; v++){
                let colorNumber:number = matrix.matrixArr[i][v] as number;
                let playbox = new PlayBox({
                    width:calculatedWidthPerBox,
                    height:calculatedHeightPerBox,
                    color: colorNumber
                })
                playbox.y = i*(calculatedHeightPerBox+this.config.spaceBetween);
                playbox.x = v*(calculatedWidthPerBox+this.config.spaceBetween);
                playbox.name = `playbox[${i}][${v}]`;
                this.addChild(playbox)
            }
        }
    }
}