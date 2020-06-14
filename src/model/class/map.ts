
interface Grid {
    nbCol: number,
    tileSize: number,
    collection: any[]
}


export class Map {

    private nbCol: number;
    private nbRow: number;
    private tileSize: number;
    private collection: number[];
    private length: number;
    private width: number;
    private height: number;

    constructor({nbCol, tileSize, collection}: Grid) {
        this.nbCol = nbCol;
        this.tileSize = tileSize;
        this.collection = collection;
        this.length = collection.length;
        this.nbRow = collection.length / nbCol;
        this.width = nbCol * tileSize;
        this.height = (collection.length / nbCol) * tileSize;
    }

    get getMapCollection(): number[] {
        return this.collection;
    }

    get getMapWidth(): number {
        return this.width;
    }

    get getMapHeight(): number {
        return this.height;
    }

}