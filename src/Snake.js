import { Game } from "./Game.js"
import { Tools } from "./Tools.js"
export class Snake{
    body = [new Circle(), new Circle(), new Circle()]
    direction = "right"
    enemySnake = null
    color = "green"

    constructor(enemy) {
        this.enemySnake = enemy
    }

    draw() {
        this.body.forEach((elm, i) => {
            Tools.ctx.beginPath()
            Tools.ctx.fillStyle = i != 0 ? elm.color : this.color
            Tools.ctx.arc(elm.x, elm.y, elm.r, 0, 2* Math.PI)
            Tools.ctx.fill()
            Tools.ctx.closePath()

        })
    }

    move() {
            for (let i = this.body.length-1; i >= 0; i--) {
                if (i == 0) {
                    switch (this.direction) {
                        case "right":
                            this.body[i].x += 20
                            if (this.body[i].x > 1200) {
                                this.body[i].x = 0
                            }
                            break;
                        case "left":
                            this.body[i].x -= 20
                            if (this.body[i].x < 0) {
                                this.body[i].x = 1200
                            }
                            break;
                        case "up":
                            this.body[i].y -= 20
                            if (this.body[i].y < 0) {
                                this.body[i].y = 600
                            }
                            break;
                        case "down":
                            this.body[i].y += 20
                            if (this.body[i].y > 600) {
                                this.body[i].y = 0
                            }
                            break; 
                        default:
                            break;
                    }
                } else {
                    this.body[i].x = this.body[i - 1].x
                    this.body[i].y = this.body[i - 1].y
                }
        
        this.draw()
    }
    
    
}

    increase() {
        this.body.push(new Circle())
    }
}

export class Circle {
    x = 50
    y = 50
    r = 10
    color = "red"


}