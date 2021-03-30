import Cluster from "../Utils/Cluster";
import { ICords } from "../Utils/Cords";
import Matrix from "../Utils/Matrix";


interface IClusterFinderConfig{
    minimumToMakeCluster:number
}

export default class ClusterFinder {
    private matrix: Matrix;

    private matrixValidation: Matrix;

    private config: IClusterFinderConfig;

    constructor(matrix: Matrix, config: IClusterFinderConfig) {
        this.matrix = matrix;
        this.config = config

        this.matrixValidation = new Matrix(this.matrix.rowsCount, this.matrix.columnsCount)
    }

    /**
     * Finds clusters
     * @returns clusters
     */
    public findClusters():Cluster[]{
        const matrixArr = this.matrix.matrixArr;
        const clusters:Cluster[] = []
        for(let i=0; i<matrixArr.length; i++){
            for(let v=0; v<matrixArr[i].length; v++){
                    const entity = matrixArr[i][v];
                    const cords:ICords = {y:i, x:v}
                    const cluster:Cluster = new Cluster(entity);
                    cluster.addCord(cords);
                    this.checkAndAddCluster(cords, cluster)
                    if(cluster.count >= this.config.minimumToMakeCluster){
                        clusters.push(cluster);
                    }
            }
        }
        return clusters;
    }

    /**
     * Checks and add cluster
     * @param cords
     * @param cluster
     * @returns and add cluster
     */
    private checkAndAddCluster(cords: ICords, cluster: Cluster): void{
        if(this.matrixValidation.matrixArr[cords.y][cords.x])
            return;

            this.matrixValidation.matrixArr[cords.y][cords.x] = true;
        for(let dx=-1; dx<=1; dx++){
            for(let dy=-1; dy<=1; dy++){

                const y:number = cords.y+dy;
                const x:number = cords.x+dx

                if(y === -1 || x === -1 || y>this.matrix.rowsCount-1 || x>this.matrix.columnsCount-1){
                    continue;
                }

                let offset = Math.abs(dx+dy)

                if(offset !== 1){
                    continue;
                }
                const entity:number|string|boolean = this.matrix.matrixArr[y][x]
                if(!this.matrixValidation.matrixArr[y][x] && cluster.canFillWith(entity)){
                    const newCords:ICords = {y, x}
                    cluster.addCord(newCords)
                    this.checkAndAddCluster(newCords,cluster)
                }
            }
        }
    }
}