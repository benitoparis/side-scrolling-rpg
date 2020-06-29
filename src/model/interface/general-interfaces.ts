export interface sprite {
    x: number,
    y: number,
    width: number,
    height: number,
    color?: string,
    faceX?: number,
    faceY?: number
}


export interface TxtFormat {
    txt: string;
    color: string,
    font: string,
    canvasX: number,
    canvasY: number
}

export interface Printable {
    bgColor: string,
    textList: TxtFormat[],
}
