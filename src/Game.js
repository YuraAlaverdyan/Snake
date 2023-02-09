import {Tools} from "./Tools.js"
import { Snake } from "./Snake.js"
import { Food } from "./Food.js"
export class Game{
    snake = new Snake(false)
    enemySnake = new Snake(true)
    food = new Food()
    speed = 100
    interval = null
    score = 0
    level = 1
    foodInterval = null
    foodSpeed = 3000
    directions = ["left", "right", "up", "down"]
    gameOver = new Image()

    constructor() {
        if (this.enemySnake.enemySnake == true) {
            setInterval(() => {
                this.enemySnake.direction = this.directions[Math.floor(Math.random() * this.directions.length)]
            },2000)

            this.enemySnake.body.forEach(element => {
                element.x = Tools.getRandomNumber(1000), element.y = Tools.getRandomNumber(600)
            });
            this.enemySnake.body.forEach(element => {
                element.color = "black"
            })
            if (this.enemySnake.enemySnake == true) {
                this.enemySnake.color = "black"
            }
            
        }
        document.body.onkeydown = e => {
            switch (e.key) {
                case "ArrowLeft":
                    if (this.snake.direction == "right") {
                        break;
                    }
                    this.snake.direction = "left"
                    break;
                case "ArrowRight":
                    if (this.snake.direction == "left") {
                        break;
                    }
                    this.snake.direction = "right"
                    break;
                case "ArrowUp":
                    if (this.snake.direction == "down") {
                        break;
                    }
                    this.snake.direction = "up"
                    break;
                case "ArrowDown":
                    if (this.snake.direction == "up") {
                        break;
                    }
                    this.snake.direction = "down"
                    break;
            
                default:
                    break;
            }
        }
    }


    eat() {
        const {x,y} = this.snake.body[0]
        if(Math.abs(x - this.food.x) <= 20) {
            if (Math.abs(y - this.food.y) <= 20) {
                this.food.restart()
                this.snake.increase()
                this.score++
                clearInterval(this.foodInterval)
                this.play()
                if (this.speed == 40) {
                    this.level = "Last!"
                    this.play()
                }else if (this.speed > 40 && this.score == 10) {
                    this.speed -= 10
                    this.score = 0
                    this.level++
                    this.play()
                }
            }
            
        }
        
    }

    scoreOfGame() {
        Tools.ctx.beginPath()
        Tools.ctx.font = "20px Tahoma"
        Tools.ctx.fillStyle = "red"
        Tools.ctx.fillText(`Score: ${this.score}`, 1070, 20)
        Tools.ctx.fillText(`Level: ${this.level}`, 1070, 40)
        Tools.ctx.closePath()
    }
	
    play(){
        clearInterval(this.interval)
        this.foodInterval = setInterval(() => this.food.restart(), this.foodSpeed)
        this.interval = setInterval(() => {
            Tools.ctx.clearRect(0, 0, 1200, 800)
            this.snake.move()
            this.food.draw()
            this.enemySnake.move()
            this.eat()
            this.scoreOfGame()
            this.over()
        }, this.speed)
        
    }
    tryAgain() {
        this.gameOver.src = "/Images/gameover.webp"
        this.gameOver.onload = () => {
            Tools.ctx.drawImage(this.gameOver, 0, 0, 1200, 600)
            console.log("drawed")
        }
        let playAgainimg = new Image()
        playAgainimg.src = "/Images/tryagain.png"
        addEventListener('click', () => {location.reload()});
        playAgainimg.onload = () => {
            Tools.ctx.drawImage(playAgainimg,430,450, 350, 200)
        }

}   


    over(){
        for (let i = 1; i < this.snake.body.length; i++) {
            if(Math.abs(this.snake.body[0].x - this.snake.body[i].x) <= this.snake.body[i].r && Math.abs(this.snake.body[0].y - this.snake.body[i].y) <= this.snake.body[i].r ) {
                clearInterval(this.interval)
                clearInterval(this.foodInterval)
                Tools.ctx.clearRect(0,0, 1200, 600)
                this.tryAgain()
            }
        }
        for (let i = 0; i < this.enemySnake.body.length; i++) {
            if (Math.abs(this.snake.body[0].x - this.enemySnake.body[i].x) <= 10 && Math.abs(this.snake.body[0].y - this.enemySnake.body[i].y) <= 10) {
                clearInterval(this.interval)
                clearInterval(this.foodInterval)
                this.tryAgain()
            }
        }
        for (let i = 0; i < this.snake.body.length; i++) {
            if (Math.abs(this.enemySnake.body[0].x - this.snake.body[i].x) <= 10 && Math.abs(this.enemySnake.body[0].y - this.snake.body[i].y) <= 10) {
                clearInterval(this.interval)
                clearInterval(this.foodInterval)
                this.tryAgain()
                
        }
            }
        }
        
        
    }
    


