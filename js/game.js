export class PingPong {

    constructor() {
    }

    init() {
        this.player1 = document.querySelector(".player1");
        this.player2 = document.querySelector(".player2");

        document.addEventListener("keydown", (e) => {
            if (e.code == "KeyS") {
                this.moveDown(this.player1);
            }
            else if (e.code == "KeyW") {
                this.moveUp(this.player1);
            }
            else if (e.code == "ArrowUp") {
                e.preventDefault();
                this.moveUp(this.player2);
            }
            else if (e.code == "ArrowDown") {
                e.preventDefault();
                this.moveDown(this.player2);
            }
            else if (e.code == "Space") {
                if (this.ball) {
                    this.ball.remove();
                }
                e.preventDefault();
                this.start();
                // this.pass(player2);
            }
        });
    }

    start() {
        const container = document.querySelector(".game_container");
        this.ball = document.createElement("div");
        this.ball.classList.add("ball");
        container.appendChild(this.ball);

        this._ballMove(this.ball);
    }

    passUP(player, ball, x, y) {

        let centerOfBall = ball.offsetTop + 10;
        if (player.offsetTop <= centerOfBall && centerOfBall <= player.offsetTop + player.offsetHeight) {
            
            this.ballUp(ball, x, y);
        } else {
            this.endGame();
        }

        // let ballY1 = ball.offsetTop;
        // let ballY2 = ball.offsetTop+20;
        // if ((player.offsetTop >= ballY2 && player.offsetTop > ballY1) || (player.offsetTop+player.offsetHeight) <=ballY1 && (player.offsetTop+player.offsetHeight) <  ballY2) {
        //     console.log("center ",1);
        //     this.ballUp(ball, x, y);
        // } else {
        //     this.endGame();
        // }

    }
    passDown(player, ball, x, y) {

        let centerOfBall = ball.offsetTop + 10;
        if (player.offsetTop <= centerOfBall && centerOfBall <= player.offsetTop + player.offsetHeight) {
            
            this.ballDown(ball, x, y);
        } else {
            this.endGame();
        }

    }

    moveDown(player) {
        if (player.offsetTop < 320) {
            player.style.top = player.offsetTop + 20 + "px";
        }

    }
    moveUp(player) {
        if (player.offsetTop > 0) {
            player.style.top = player.offsetTop - 20 + "px";
        }

    }

    _ballMove(ball) {
        let quarter = this._getVector();


        switch (quarter) {
            case 1:
                this.ballUp(ball, this.x, -this.y);
                break;
            case 2:
                this.ballUp(ball, -this.x, -this.y);
                break;
            case 3:
                this.ballDown(ball, -this.x, this.y);
                break;
            case 4:
                this.ballDown(ball, this.x, this.y);
                break;
        }

    }

    _getVector() {

        // quarter = > 1, 2, 3, or 4 
        let quarter = parseInt(1 + Math.random() * 4);

        // degree => 20 or 70 gradus;
        const degree = parseInt(20 + Math.random() * 50);

        // let x, y;
        this.x = Math.sin(degree * Math.PI / 180) * 3;
        this.y = Math.cos(degree * Math.PI / 180) * 3;

        return quarter;
    }

    ballUp(ball, x, y) {


        let interval = setInterval(() => {

            ball.style.left = ball.offsetLeft + x + "px";
            ball.style.top = ball.offsetTop + y + "px";

            if (ball.offsetTop <= 0) {
                clearInterval(interval);
                this.ballDown(ball, x, -y);
            }
            if (ball.offsetLeft < 21) {
                clearInterval(interval);
                this.passUP(this.player1, ball - x, y);
                // this.ballUp(ball, -x, y);
            }
            if (ball.offsetLeft > 759) {
                clearInterval(interval);
                this.passUP(this.player2, ball, -x, y);
                // this.ballUp(ball, -x, y);
            }
            this._watcher(ball, interval);
        }, 10);
    }

    ballDown(ball, x, y) {
        let interval = setInterval(() => {

            ball.style.left = ball.offsetLeft + x + "px";
            ball.style.top = ball.offsetTop + y + "px";

            if (ball.offsetTop >= 380) {
                clearInterval(interval);
                this.ballUp(ball, x, -y);
            }

            if (ball.offsetLeft < 21) {
                clearInterval(interval);
                this.passDown(this.player1, ball, -x, y);
                // this.ballDown(ball, -x, y);

            }
            if (ball.offsetLeft > 759) {
                clearInterval(interval);
                this.passDown(this.player2, ball, -x, y);
                // this.ballDown(ball, -x, y);
            }
            // this._watcher(ball, interval);

        }, 10);
    }



    _watcher(ball, interval) {
        if (ball.offsetLeft > 760) {
            clearInterval(interval);
            this.endGame();
            return;

        } else if (ball.offsetLeft < 20) {
            clearInterval(interval);
            this.endGame();
            return;
        }
    }

    endGame() {
        console.log("end game");
    }
}