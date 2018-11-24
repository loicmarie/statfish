
const LichessOpeningExplorer = require('lichess-opening-explorer');
const UCIParser = require('uci-parser');
const Chess = require('chess.js').Chess;

let explorer = new LichessOpeningExplorer();
let uci = new UCIParser();
let chess = new Chess();

let getRandomMove = () => {
  let moves = chess.moves({verbose: true});
  let move = moves[Math.floor(Math.random() * moves.length)];
  return move.from + move.to;
}

uci.on('uci', opts => {
  console.log('uciok');
});

uci.on('debug', opts => {});

uci.on('setoption', opts => {});

uci.on('register', opts => {});

uci.on('ucinewgame', opts => {
  chess = new Chess();
});

uci.on('isready', opts => {
  console.log('readyok');
});

uci.on('position', opts => {
  chess = new Chess(opts.fen);
  for (let move of opts.moves)
    chess.move(move, {sloppy: true});
});

uci.on('go', opts => {
  let moveUCI = null;
  explorer.analyze(chess.fen(), {
      master: false,
      variant: 'standard',
      speeds: ['blitz', 'rapid', 'classical'],
      ratings: [1600, 1800, 2000, 2200, 2500]
    })
    .then(res => {
      if (res.moves.length == 0) {
        moveUCI = getRandomMove();
      } else {
        let nbTotGames = res.white + res.draws + res.black;
        let nbTotGamesTest = 0;
        for (let moveAnalysis of res.moves) {
          let nbGames = moveAnalysis.white + moveAnalysis.draws + moveAnalysis.black;
          nbTotGamesTest += nbGames;
        }
        for (let moveAnalysis of res.moves) {
          let nbGames = moveAnalysis.white + moveAnalysis.draws + moveAnalysis.black;
          if (Math.random() < nbGames/nbTotGamesTest) {
            moveUCI = moveAnalysis.uci;
            break;
          }
          nbTotGamesTest -= nbGames;
        }
      }
      console.log('bestmove', moveUCI);
    });
});

uci.on('stop', opts => {
  let move = getRandomMove();
  console.log('bestmove', move);
});

uci.on('ponderhit', opts => {
});

uci.on('quit', opts => {
  process.exit(0);
});

uci.listen();
