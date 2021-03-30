import { ICords } from "./Cords";

export default class Cluster {
    public cords:ICords[] = [];
    public clusterFilledWith:number|string|boolean;
    constructor(fillingEntity:number|string|boolean){
        this.clusterFilledWith = fillingEntity;
    }


    /**
     * Determines whether fill with can
     * @param num
     * @returns true if fill with
     */
    canFillWith(entity:number|string|boolean):boolean{
        return entity === this.clusterFilledWith;
    }


    /**
     * Adds cord
     * @param cord
     */
    public addCord(cord:ICords){
        this.cords.push(cord)
    }

    /**
     * Gets count of cords
     */
    get count():number{
        return this.cords.length;
    }

    /**
     * Gets latest cord
     */
    get latestCord():ICords{
        return this.cords[this.cords.length-1];
    }
}