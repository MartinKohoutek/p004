document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'fries',
            img: 'images/img1.jpg'
        },
        {
            name: 'fries',
            img: 'images/img1.jpg'
        },
        {
            name: 'cheeseburger',
            img: 'images/img2.jpg'
        },
        {
            name: 'cheeseburger',
            img: 'images/img2.jpg'
        },
        {
            name: 'hotdog',
            img: 'images/img3.jpg'
        },
        {
            name: 'hotdog',
            img: 'images/img3.jpg'
        },
        {
            name: 'ice-cream',
            img: 'images/img4.jpg'
        },
        {
            name: 'ice-cream',
            img: 'images/img4.jpg'
        },
        {
            name: 'milkshake',
            img: 'images/img5.jpg'
        },
        {
            name: 'milkshake',
            img: 'images/img5.jpg'
        },
        {
            name: 'pizza',
            img: 'images/img6.jpg'
        },
        {
            name: 'pizza',
            img: 'images/img6.jpg'
        },
        {
            name: 'img7',
            img: 'images/img7.jpg'
        },
        {
            name: 'img7',
            img: 'images/img7.jpg'
        },
        {
            name: 'img8',
            img: 'images/img8.jpg'
        },
        {
            name: 'img8',
            img: 'images/img8.jpg'
        },
        {
            name: 'img9',
            img: 'images/img9.jpg'
        },
        {
            name: 'img9',
            img: 'images/img9.jpg'
        }
    ]


    cardArray.sort(() => 0.5 - Math.random())

    // const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    //create your board
    function createBoard() {
        var cards = document.getElementsByClassName('imgPex');
        for (let i = 0; i < cardArray.length; i++) {
            // card.setAttribute('src', 'images/blank.png')
            // card.setAttribute('data-id', i)
            
            cards[i].addEventListener('click', flipCard);
            // card.addEventListener('click', flipCard)
            // grid.appendChild(card)
        }
    }

    //check for matches
    function checkForMatch() {
        var cards = document.getElementsByClassName('imgPex')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (optionOneId === optionTwoId) {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('You have clicked the same image')
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            alert('you found a match')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('Sorry, try again')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Congratulations! You found them all'
        }
    }

    //flip your card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
    createBoard()
})