import {DataStore} from "../base/DataStore.js";
import {Pencil} from "./Pencil.js";

export class UpPencil extends Pencil{
    constructor(top) {
        let image = DataStore.getInstance().res.get('pie_up');
        super(image,
            top
        );
        this.y=top-this.image.height;
        // console.log(image)
    }
    draw(){
        super.draw();
    }
}