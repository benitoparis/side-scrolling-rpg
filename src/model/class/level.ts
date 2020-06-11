
interface stageFormat {
    levelTileCollection: number[],
    nbCols: number,
    tileSize: number
}


export class Level {

    levelTileCollection: number[];
    nbCols: number;
    tileSize: number;
    nbRaws: number;
    length: number;
    width: number;
    height: number;

    constructor(stage: stageFormat){
        this.levelTileCollection = stage.levelTileCollection;
        this.nbCols = stage.nbCols;
        this.tileSize = stage.tileSize;
        this.length = this.levelTileCollection.length;
        this.nbRaws = this.levelTileCollection.length / this.nbCols;
        this.width = this.tileSize * this.nbCols;
        this.height = this.tileSize * this.nbRaws;
    }
}