window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //creation d'array pour le tableau de jeu
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //ces constantes servent a définir l'état du jeu, joueur x ou joueur o à gagner ou égalité
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

       /*
        les index dans le tableau
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    //les states de toute les facons de gagner
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];


        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                const a = board[winCondition[0]];
                const b = board[winCondition[1]];
                const c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
    
        if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }
    
        if (!board.includes(''))
            announce(TIE);
        }

        //annonce l'état du jeu au joueurs 
        const announce = (type) => {
            switch(type){
                case PLAYERO_WON:
                    announcer.innerHTML = 'Joueur <span class="playerO">O</span> à gagner';
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Joeur <span class="playerX">X</span> à gagner';
                    break;
                case TIE:
                    announcer.innerText = 'égalité';
            }
            announcer.classList.remove('hide');
        };
    
        //verifie si la case a une valeur, si le joueur ne joue que dans les cases vides
        const isValidAction = (tile) => {
            if (tile.innerText === 'X' || tile.innerText === 'O'){
                return false;
            }
    
            return true;
        };

        const updateBoard =  (index) => {
            board[index] = currentPlayer;
        }

        //mettre a jour les tours de joeurs
        const changePlayer = () => {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }

        //vérifie si le jeu est jouable
        const userAction = (tile, index) => {
            if(isValidAction(tile) && isGameActive) {
                tile.innerText = currentPlayer;
                tile.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResultValidation();
                changePlayer();
            }
        }

        //vide le tableau et change le joueur 
        const resetBoard = () => {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            announcer.classList.add('hide');
    
            if (currentPlayer === 'O') {
                changePlayer();
            }
    
            tiles.forEach(tile => {
                tile.innerText = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        }

        //j'ajoute un evenlistener pour chaque case, pour modifier ensuite l'ui et l'index pour mettre a jour l'array du tableau  
        tiles.forEach( (tile, index) => {
            tile.addEventListener('click', () => userAction(tile, index));
        });

    resetButton.addEventListener('click', resetBoard);
});