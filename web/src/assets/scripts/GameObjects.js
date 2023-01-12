// 实现物体每秒钟刷新60次
const Game_Objects = [];

export class GameObjects {
    constructor() {
        Game_Objects.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() { // 创建时执行一次（只执行一次）

    }

    update() { // 每一帧执行一次。除了第一帧之外

    }

    on_destroy() { //删除前执行的回调函数

    }

    destroy() {
        this.on_destroy();

        for (let i in Game_Objects) { // in遍历的是下标
            const obj = Game_Objects[i];
            if (obj === this) {
                Game_Objects.splice(i);
                break;
            }
        }
    }
}

let last_timestamp; // 上一次执行的时刻
// 设置回调函数，注意：此处尾递归不会爆栈
const step = timestamp => {
    for (let obj of Game_Objects) { //of遍历的是值
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

//在下一帧的时候执行step函数
requestAnimationFrame(step);
