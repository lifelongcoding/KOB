import { GameObjects } from "./GameObjects";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends GameObjects {
    constructor(ctx, parent) { // 画布和画布的父元素（用来动态修改画布的长宽）
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0; //一个单位的长度，绝对距离

        this.rows = 13;
        this.cols = 14;

        this.inner_walls_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.cols - 2}, this),
        ]
    }

    check_ready() { // 判断两条蛇是否都准备好开始下一回合
        for(const snake of this.snakes) {
            if(snake.status !== "idle") return false;
            if(snake.direction === -1) return false;
        }

        return true;
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
                if(isWall[r][c] || isWall[this.rows - 1 - r][this.cols - 1 - c]) continue; // 若存在则跳过
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue; // 出生点不设障碍物
                isWall[r][c] = isWall[this.rows - 1 - r][this.cols - 1 -c] = true; // 中心对称
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

    add_listening_events() {
        this.ctx.canvas.focus();

        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if(e.key === 'w') snake0.set_direction(0);
            else if(e.key === 'd') snake0.set_direction(1);
            else if(e.key === 's') snake0.set_direction(2);
            else if(e.key === 'a') snake0.set_direction(3);
            else if(e.key === "ArrowUp") snake1.set_direction(0);
            else if(e.key === 'ArrowRight') snake1.set_direction(1);
            else if(e.key === "ArrowDown") snake1.set_direction(2);
            else if(e.key === "ArrowLeft") snake1.set_direction(3);
        })
    }

    start() {
        for(let i = 0; i < 1000; i ++) {
            if(this.create_walls()) break;
        }

        this.add_listening_events();
    }

    uodate_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    next_step() { // 让两条蛇进入下一回合
        for(const snake of this.snakes) {
            snake.next_step();
        }
    }

    check_valid(cell) { // 检测目标位置是否合法：没有撞到某条蛇和墙
        for(const wall of this.walls) {
            if(wall.r === cell.r && wall.c === cell.c)
                return false;
        }

        for(const snake of this.snakes) {
            let k = snake.cells.length;
            if(!snake.check_tail_increasing()) { // 当蛇尾会前进时不判断蛇尾
                k --;
            }
            for(let i = 0; i < k; i ++) {
                if(snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }

        return true;
    }

    update() {
        this.uodate_size();
        if(this.check_ready()) {
            this.next_step();
        }
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
