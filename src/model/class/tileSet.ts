
interface CropCoordinates {
    cropX: number,
    cropY: number
}

interface Grid {
    nbCol: number,
    nbRow: number,
    tileSize: number
}

export class TileSet {

    nbCol: number;
    nbRow: number;
    tileSize: number;
    imgTileSetCropList: CropCoordinates[] = [];

    constructor(
        {nbCol, nbRow, tileSize}: Grid
        
    ){
        this.nbCol = nbCol;
        this.nbRow = nbRow;
        this.tileSize = tileSize;

        // On constritue la liste des coordonnées des tuiles sur cette tileSet
        this.initImgTileSetCropList();
    }

    // On initialise la liste des coordonnés de crop
    initImgTileSetCropList(): void {

        let cropX: number;
        let cropY: number;

        for(let y = 0; y < this.nbRow; y++){

            for(let i = 0; i < this.nbCol ; i++){

                cropX = i * this.tileSize;
                cropY = y * this.tileSize;
                
                this.imgTileSetCropList = [...this.imgTileSetCropList, {cropX: cropX, cropY: cropY}];
            }
        }

        console.log('this.imgTileSetCropList', this.imgTileSetCropList);
    }

    // Renvoie les coordonnées de l'image à croper en fonction d'un index de tuile
    getCropCoordinates(id: number): CropCoordinates {
        return this.imgTileSetCropList[id];
    }
}