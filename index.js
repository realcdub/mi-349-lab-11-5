async function getRandomPuzzleFen() {
    const random_daily_puzzle_url = "https://api.chess.com/pub/puzzle/random"
    try {
        const response = await fetch(random_daily_puzzle_url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const random_daily_puzzle = await response.json();
        console.log(random_daily_puzzle);
        return random_daily_puzzle;
    } catch (error) {
        console.error(error.message);
    }
}

getRandomPuzzleFen()
    .then(daily_puzzle => {
        Chessboard('board', {
            position: daily_puzzle.fen,
            draggable: true,
            dropOffBoard: 'snapback',
            pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
        });

        const puzzleTitle = document.getElementById('puzzle-title');
        puzzleTitle.textContent = daily_puzzle.title;
        const puzzleUrl = document.getElementById('puzzle-url');
        puzzleUrl.href = daily_puzzle.url;
        puzzleUrl.textContent = 'View Puzzle on chess.com';
        const colorToMove = document.getElementById('color-to-move');
        colorToMove.textContent = `${daily_puzzle.fen[daily_puzzle.fen.indexOf(" ") + 1] == 'b' ? 'Black' : 'White'} to move`;
    })

