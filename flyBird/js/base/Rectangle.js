export class Rectangle {
    constructor(x=0,y=0,width=0,height=0){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    //判断是否相交
    intersects(r){
        //第一个矩形
        let tw=this.width;
        let th=this.height;
        //2
        let rw=r.width;
        let rh=r.height;
        //看是否是个矩形
        if (rw<=0 || rh<=0 || tw<=0 || th<=0) {
            return false;
        }
        let tx=this.x;
        let ty=this.y;
        let rx=r.x;
        let ry=r.y;
        rw+=rx;
        rh+=ry;
        tw+=tx;
        th+=ty;
        return( (rw<rx || rw>tx)&&
            (rh<ry || rh>ty)&&
            (tw<tx || tw>rx)&&
            (th<ty || th>ry));

    }
}