export class Tools{
    static ctx = document.querySelector("canvas").getContext('2d')

    static getRandomNumber(n){
        return Math.floor(Math.random() * n)
    }
}