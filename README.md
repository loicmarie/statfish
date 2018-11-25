# Statfish
StatFish is a UCI module wrapping StockFish, that will play first moves according to human opening usage statistics, allowing players to train against the most frequent openings.

## Generate binary
To create binary file, just run the command:
`npm run build`
Then, you can find the file in bin/ directory.

## Usage
After executing the binary with:
`./bin/statfish`
You will have a prompt in which you can execute UCI standard commands.

## Example
```bash
uci
>> uciok
debug on
setoption name Nullmove value true
setoption name Style value Very risky
register name
ucinewgame
isready
>> readyok
position startpos moves e2e4 e7e5
go
>> bestmove g1f3
ponderhit
stop
>> bestmove g2g4
quit
```
