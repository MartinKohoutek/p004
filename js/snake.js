document.addEventListener('DOMContentLoaded', () => {
    const squaresSnake = document.querySelectorAll('.gridSnake div')
    const scoreDisplay = document.querySelector('.spanSnake')
    const startBtn = document.querySelector('.startSnake')

    const width = 10
    let currentIndex = 0    //so first div in our grid
    let appleIndex = 0      //so first div in our grid
    let currentSnake = [2, 1, 0]    //so the div in our grid being 2 for the HEAD, and 0 being the end (TAIL, with all 1's being the body from now on)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //to start and restart the game 
    function startGame() {
        currentSnake.forEach(index => squaresSnake[index].classList.remove('snake'))
        squaresSnake[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squaresSnake[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //function that deals with ALL the ove outcomes of the Snake
    function moveOutcomes() {
        //deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) ||   //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) ||            //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||                   //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||                 //if snake hits the top
            squaresSnake[currentSnake[0] + direction].classList.contains('snake')         //if snake goes into itself
        ) {
            return clearInterval(interval)              //this will clear the interval if any above happen
        }

        const tail = currentSnake.pop()                 //removes last ite of the array and shows it
        squaresSnake[tail].classList.remove('snake')         //removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
        
        
        //deals with snake getting apple
        if (squaresSnake[currentSnake[0]].classList.contains('apple')) {
            squaresSnake[currentSnake[0]].classList.remove('apple')
            squaresSnake[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squaresSnake[currentSnake[0]].classList.add('snake')
    }


    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squaresSnake.length)
        } while (squaresSnake[appleIndex].classList.contains('snake'))       //making sure apple dont appear on the snake
        squaresSnake[appleIndex].classList.add('apple')
    }

    //assign functions to keycodes
    function control(e) {
        squaresSnake[currentIndex].classList.remove('snake') //we are removing the class of snake

        if (e.keyCode === 39) {
            direction = 1           //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.keyCode === 38) {
            direction = -width      //if we press the up arrow, the snake will go back ten divs, appearing to go up 
        } else if (e.keyCode === 37) {
            direction = -1          //if we press left, the snake will go left one div
        } else if (e.keyCode === 40) {
            direction = +width      //if we press down, the snake head will instantly appear in the div ten divs from where you are now
        }        
        console.log(direction)
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})