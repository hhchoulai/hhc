import {DataStore} from "./js/base/DataStore.js";
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {Land} from "./js/runtime/Land.js";
import {Bird} from "./js/player/Bird.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor(){
        //获取canvas画笔
        this.canvas=document.getElementById('bird');
        this.ctx=this.canvas.getContext('2d');
        this.dataStore=DataStore.getInstance();
        this.director=Director.getInstance();

        //获取图片资源
        const loader=new ResourceLoader();
        loader.onLoaded(map => this.onFirstLoaded(map));
        // loader.onLoaded(function (map) {
        //     this.onFirstLoaded(map);
        // })
    }
    onFirstLoaded(map){
        this.dataStore.res=map;
        this.dataStore.ctx=this.ctx;
        this.init();
        this.registerEvent();
    }
    //初始化
    init(){
        //向游戏中添加一个背景
        this.dataStore.put('background',new BackGround());
        //添加一个陆地
        this.dataStore.put('land',new Land());
        //添加一个画笔   成对出现，是个数组
        this.dataStore.put('pencils',[]);
        //让导演类创建一个铅笔
        this.director.createPencil();

        //生成一个小鸟
        this.dataStore.put('bird',new Bird());
        //添加分数对象
        this.dataStore.put('score',new Score());
        //添加开始按钮
        this.dataStore.put('start',new StartButton());
        this.director.isGameOver=false;
        this.director.run();
        // this.registerEvent();
    }
    //注册事件
    registerEvent(){
        this.canvas.addEventListener('touchstart',e=>{
            e.preventDefault();
            if (this.director.isGameOver) {
                // console.log(1);
                this.init();
            }else {
                // console.log(this.dataStore.get('bird'));
                //获取不到bird
                this.dataStore.get('bird').birdClick();
            }
        })
    }
}