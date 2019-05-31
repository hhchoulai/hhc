import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";
import {Rectangle} from "./base/Rectangle.js";

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //创建一对铅笔
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + (Math.random() * (maxTop - minTop));
        // console.log(this.dataStore.get('pencils'))
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    //判断是否应该生成一对铅笔
    isCreatePencil() {
        const pencils = this.dataStore.get('pencils');
        //判断第一对铅笔右边边缘走过屏幕的一半并且铅笔数组中只能有俩个
        if ((pencils[0].x + pencils[0].width) < (window.innerWidth / 2) && pencils.length == 2) {
            this.createPencil();
        }
    }

    //移除铅笔的逻辑
    outPencil() {
        const pencils = this.dataStore.get('pencils');
        if ((pencils[0].x + pencils[0].width) < 0 && pencils.length == 4) {
            pencils.shift();
            pencils.shift();
            this.dataStore.get('score').isScore=true;
        }

    }

    //小鸟碰撞地板的检测方法
    crashLand() {
        let flag = false;
        const bird = this.dataStore.get('bird');
        const land = this.dataStore.get('land');
        if (bird.y + bird.offSet + bird.height >= land.y) {
            flag = true;
        }
        return flag;
    }

    //判断鸟和铅笔的碰撞
    crashPencil() {
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        //创建小鸟的矩形
        const birdRect = new Rectangle(bird.x, bird.y + bird.offSet, bird.width, bird.height);
        // birdRect.name='bird';
        for (let pencil of pencils) {
            //逻辑复杂  没办法写了
            // if (bird.x + bird.width >= pencil.x && bird.x <= pencil.x + pencil.width &&bird.y + bird.offSet <= pencil.y + pencil.height) {
            //     s = true;
            //     return s;
            // }
            // console.log(birdRect);
            const pencilRect = new Rectangle(pencil.x, pencil.y, pencil.width, pencil.height);
            if (birdRect.intersects(pencilRect)) {
                return true;
            }
        }
        return false;
    }
    //加分逻辑
    addScoreNumber(){
        const pencils = this.dataStore.get('pencils');
        const bird = this.dataStore.get('bird');
        const score=this.dataStore.get('score');
        //判断鸟越过铅笔
        if (bird.x+bird.width>=pencils[0].x && score.isScore){
            score.scoreNumber++;
            score.isScore=false;
        }
    }
    //运行游戏
    run() {
        //isGameOver在Director里定义的  初始值为false
        if (!this.isGameOver) {

            //绘制背景
            this.dataStore.get('background').draw();
            //绘制铅笔
            for (let pencil of this.dataStore.get('pencils')) {
                pencil.draw();
            }
            // 绘制陆地
            this.dataStore.get('land').draw();
            //绘制鸟
            this.dataStore.get('bird').draw();
            this.addScoreNumber();
            //绘制分数
            this.dataStore.get('score').draw();
            //调用移除
            this.outPencil();
            //调用是否生成铅笔的逻辑
            this.isCreatePencil();

            if (this.crashLand()) {
                this.isGameOver = true;
            }
            if (this.crashPencil()) {
                this.isGameOver = true;
            }
            //定时器  控制游戏运行
            let timer = requestAnimationFrame(() => {
                this.run()
            });
            this.dataStore.put('timer', timer);

        } else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            //画开始按钮
            this.dataStore.get('start').draw();
            this.dataStore.destory();
        }
    }

}