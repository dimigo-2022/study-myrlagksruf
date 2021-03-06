export interface DrawInfo{
    pos:[number, number, number, number];
    color:string;
}

interface TreeInfo{
    sum:number;
    cnt:number;
}

interface SEInfo{
    type:'L'|'R';
    pos:number;
    y1:number;
    y2:number;
}

type NodeType = 'L'|'R'|'T';

class Node<T>{
    left:Node<T>;
    right:Node<T>;
    par:Node<T>;
    data:T;
    S:number;
    E:number;
    type:NodeType;
    constructor(data:() => T, info:{
        count:number;
        S:number;
        E:number;
        arr:Map<string, Node<T>>;
        par:Node<T>;
        type:NodeType;
    }){
        this.type = info.type;
        this.par = info.par;
        this.S = info.S;
        this.E = info.E;
        if(info.count !== 0){
            const size = (info.E - info.S) / 2;
            this.left = new Node<T>(data, {
                count:info.count - 1,
                S: info.S,
                E : info.S + size,
                arr : info.arr,
                par : this,
                type:'L',
            });
            this.right = new Node<T>(data, {
                count: info.count - 1,
                S : info.S + size,
                E : info.E,
                arr : info.arr,
                par: this,
                type:'R',
            });
        } else {
            this.left = null;
            this.right = null;
        }
        info.arr.set(`${info.S},${info.E}`, this);
        this.data = data();
    }
}

export class IndexedTree{
    arr = new Map<string, Node<TreeInfo>>();
    rects:DrawInfo[];
    seinfo:SEInfo[];
    root:Node<TreeInfo>
    constructor(wid:number, rects:DrawInfo[]){
        let width = 1;
        let count = 0;
        while(width < wid){
            width *= 2;
            count++;
        }
        this.rects = rects;
        this.root = new Node<TreeInfo>(() => ({cnt:0, sum:0}), {
            count, 
            S : 0,
            E : width,
            arr : this.arr,
            par: null,
            type: 'T',
        });
        this.update();
    }

    update(){
        this.seinfo = [];
        for(let i of this.rects){
            this.seinfo.push({
                pos:i.pos[0],
                type: 'L',
                y1: i.pos[1],
                y2: i.pos[3],
            });
            this.seinfo.push({
                pos:i.pos[2],
                type: 'R',
                y1: i.pos[1],
                y2: i.pos[3],
            });
        }
        this.seinfo.sort((a, b) => a.pos - b.pos);
        let cur = 0;
        let total = 0;
        for(let i of this.seinfo){
            if(i.pos - cur !== 0){
                total += this.root.data.sum * (i.pos - cur);
                this.find(i.y1, i.y2, i.type);
                cur = i.pos;
            } else {
                this.find(i.y1, i.y2, i.type);
            }
        }
        return total;
    }

    find(y1:number, y2:number, type:'L'|'R'){
        let left = this.arr.get(`${y1},${y1+1}`);
        let right = this.arr.get(`${y2 - 1},${y2}`);
        const arr:Node<TreeInfo>[] = [];
        const typeSum = {
            'L':1, 'R':-1
        } as const;
        while(left.par !== null){
            if(left === right){
                arr.push(left);
                break;
            }

            if(left.type !== 'L'){
                arr.push(left);
                left = this.arr.get(`${left.E},${2 * left.E - left.S}`);
            }

            if(left === right){
                arr.push(left);
                break;
            }
            
            if(right.type !== 'R'){
                arr.push(right);
                right = this.arr.get(`${2 * right.S - right.E},${right.S}`);
            }

            left = left.par;
            right = right.par;
        }

        // arr.sort((a, b) => a.E - a.S - b.E + b.S);

        for(let i of arr){
            i.data.cnt += typeSum[type];
            if(i.data.cnt === 0){
                i.data.sum = (i.left?.data.sum ?? 0) + (i.right?.data.sum ?? 0);
            } else {
                i.data.sum = i.E - i.S;
            }
        }

        for(let i of arr){
            let temp = i;
            while(temp.par !== null){
                temp = temp.par;
                if(temp.data.cnt === 0){
                    temp.data.sum = temp.left.data.sum + temp.right.data.sum;
                } else {
                    temp.data.sum = temp.E - temp.S;
                }
            }
        }
    }
}