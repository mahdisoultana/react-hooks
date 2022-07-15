// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js
import {useLocalStorageState} from '../utils'
import * as React from 'react'

// const useStorage = function (
//   key = '',
//   intialValue = '',
//   {serialize = JSON.stringify, deserialize = JSON.parse} = {},
// ) {
//   const [squares, setSquares] = React.useState(() => {
//     const storageS = window.localStorage.getItem(key)
//     if (storageS) {
//       return deserialize(storageS)
//     }
//     let initialS =
//       typeof intialValue == 'function' ? intialValue() : intialValue

//     return initialS
//   })
//   React.useEffect(() => {
//     window.localStorage.setItem(key, serialize(squares))
//   }, [squares, key, serialize])
//   return [squares, setSquares]
// }

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [[]])
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0)
  const squares = history[currentStep]

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)
  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setHistory(h => [...h.slice(0, currentStep + 1), squaresCopy])
    setCurrentStep(prevS => prevS + 1)
  }
  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = history.map((h, i) => {
    const desc =
      i === 0
        ? 'start Game'
        : i === currentStep
        ? 'current Step ' + i
        : 'Step history #' + i
    return (
      <button
        key={i}
        style={{display: 'block'}}
        disabled={i === currentStep}
        onClick={() => {
          setCurrentStep(i)
        }}
      >
        {desc}
      </button>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
