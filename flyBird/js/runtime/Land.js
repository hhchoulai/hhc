import {Spirit} from "../base/Spirit.js";
import {DataStore} from "../base/DataStore.js";

export class Land extends Spirit {
    constructor() {
        const image = DataStore.getInstance().res.get('land');
        super(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            window.innerHeight - image.height,
            image.width,
            image.height
        );
        //成员变量  这个类的变量
        this.moveSpeed=2;
    }
    draw() {
        this.x=this.x-this.moveSpeed;
        if((-this.x)>(this.image.width-window.innerWidth)){
            this.x=0;
        }
        super.draw();
    }
}