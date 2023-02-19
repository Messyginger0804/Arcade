// gamme state

const players = ['X', 'O'];
const gameBoard = ['', '', '', '', '', '', '', '', '',];
const playerTurnElem = document.querySelector('.players_turn');
let currentPlayer;
let gameBoardElem;

const renderPlayer = () => {
    let text;

    if (!players[0] || !players[1]) {
        text = `
            < input type = "name" name = "player1" placeholder = "enter player 1" >
            <input type="name" name="player2" placeholder="enter player 2">
            <button class="start">start/reset</button>
                    `;
    } else {
        text = `It's currently this players turn`
    }
    playerTurnElem.innerHTML = text;
}

const makeGameBoardElem = () => {
    const gameBoardElem = document.createElement('div');

    gameBoardElem.classList.add('game-board');


    for (let square = 0; square < 9; square++) {
        gameBoardElem.appendChild(makeSquareElem(square));
    }
    return gameBoardElem;
};

const makeSquareElem = squareNumber => {
    const squareElement = document.createElement('div');

    squareElement.classList.add('game-square');

    squareElement.addEventListener('click', (event) => {
        const { target } = event;
        target.textContent = currentPlayer;
        gameBoard[squareNumber] = currentPlayer;
        checkboard();
        switchPlayer();
        renderPlayer();
    },
        { once: true }
    );

    return squareElement;
};


const switchPlayer = () => {
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
};

const checkboard = () => {
    //gameboard"
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
    ];

    for (let w of winningStates) {
        const [position1, position2, position3] = w;

        if (gameBoard[position1] !== '' &&
            gameBoard[position1] === gameBoard[position2] &&
            gameBoard[position1] === gameBoard[position3]
        ) {
            completeGame(`${gameBoard[position1]}'s wins!`);
            return;
        }
    }

    const allSquaresUsed = gameBoard.every(square => square !== '');

    if (allSquaresUsed) {
        completeGame('its a draw!');
    }
};

const completeGame = message => {
    const overLayElem = document.createElement('div');

    const endMessageElem = document.createElement('h2');
    endMessageElem.textContent = message;

    overLayElem.appendChild(endMessageElem);

    const restartButtonElem = document.createElement('button');
    restartButtonElem.textContent = 'RESTART';

    restartButtonElem.addEventListener('click', (event) => {
        resetGame(event);
        document.body.removeChild(overLayElem);
        // document.button("restart").reset();
    });

    overLayElem.classList.add('overlay');
    overLayElem.appendChild(restartButtonElem);
    document.body.appendChild(overLayElem);
};

const resetGame = () => {
    if (gameBoardElem) {
        document.body.removeChild(gameBoardElem);
    }


    gameBoardElem = makeGameBoardElem();
    for (let square = 0; square < 9; square++) {
        gameBoardElem.appendChild(makeSquareElem(square));
    }


    currentPlayer = players[1];

    document.body.appendChild(gameBoardElem);
    gameBoard.fill('')
};

// createTitle();
resetGame();
renderPlayer();
