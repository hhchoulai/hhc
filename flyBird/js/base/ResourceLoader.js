import Resource from './Resource.js';
/*因为Resource里是default  所以这里的Resource不加{}*/
export class ResourceLoader {
    constructor(){
        //创建当前的一个成员变量this.map 给它赋初值为resource里的map集合

        this.map=new Map(Resource);
        for (let [key,value] of this.map){
            const image=new Image();
            image.src=value;
            this.map.set(key,image);
        }
    }
    onLoaded(callback){
        let loadCount=0;//当前加载资源数
        for (let value of this.map.values()){
            value.onload= ()=>{
                loadCount++;
                if (loadCount >= this.map.size){
                    callback(this.map);//当加载完之后回调

                }
            }
        }
    }
}