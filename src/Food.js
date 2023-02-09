import {Tools} from "./Tools.js"
export class Food{
    x = Tools.getRandomNumber(1000)
    y = Tools.getRandomNumber(600)
    r = 10
    color = "red"
    foodInterval = null

    draw() {
        Tools.ctx.beginPath()
        Tools.ctx.fillStyle = this.color
        Tools.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        Tools.ctx.fill()
        Tools.ctx.closePath()
    }

    restart() {
        this.x = Tools.getRandomNumber(1000)
        this.y = Tools.getRandomNumber(600)

    }

}