import { GameObjects } from "./GameObjects";
import { Wall } from "./Wall";

export class GameMap extends GameObjects {
    constructor(ctx, parent) { // 画布和画布的父元素（用来动态修改画布的长宽）
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0; //一个单位的长度，绝对距离

        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 20;
        this.walls = [];
    }

    //Flood Fill
    check_connectivity(g, sx, sy, tx, ty) {
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for(let i = 0; i < 4; i ++) {
            let x = sx + dx[i], y = sy + dy[i];
            if(!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }

        return false;
    }

    create_walls() {
        const isWall = [];
        for(let r = 0; r < this.rows; r ++) {
            isWall[r] = [];
            for(let c = 0; c < this.cols; c ++) {
                isWall[r][c] = false;
            }
        }

        //给四周围上墙
        for(let r = 0; r < this.rows; r ++) {
            isWall[r][0] = isWall[r][this.cols - 1] = true;

        }

        for(let c = 0; c < this.cols; c ++) {
            isWall[0][c] = isWall[this.rows - 1][c] = true;
        }

        //在墙内部创建随机障碍物
        for(let i = 0; i < this.inner_walls_count / 2; i ++) {
            for(let j = 0; j < 1000; j ++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if(isWall[r][c] || isWall[c][r]) continue;
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue;
                isWall[r][c] = isWall[c][r] = true;
                break;
            }
        }

        //深度复制对象
        const copy_isWall = JSON.parse(JSON.stringify(isWall));
        if(!this.check_connectivity(copy_isWall, this.rows - 2, 1, 1, this.cols - 2)) return false;

        //渲染墙体
        for(let r = 0; r < this.rows; r ++) {
            for(let c = 0; c < this.cols; c ++) {
                if(isWall[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    start() {
        for(let i = 0; i < 1000; i ++) {
            if(this.create_walls()) break;
        }
    }

    uodate_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.uodate_size();
        this.render();
    }

    render() {
        // 画布可视化
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        const color_even = "#AAD751", color_odd = "#A2D149";
        for(let r = 0; r < this.rows; r ++) {
            for(let c = 0; c < this.cols; c ++) {
                if((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}
