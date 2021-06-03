import React, {Component} from "react";
import './App.css';
import axios from "axios";
import Modal from "./components/Modal";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}    
      />
    );
  }
  
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      xScore: 0,
      oScore: 0,
      isWinner: false,
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      isWinner: false,
    });
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
   

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    setXData;
    const setXData = async () => {
        const response = await axios.get("/api/toe/1/");
        this.setState({
            xScore: response.data.score
        });
        
    
    }
    console.log(this.state.xScore)

    let status;
    if (winner && this.state.isWinner === false) {
      this.setState({
        isWinner: true,
      })
      status = "Winner: " + winner;
      if(winner === 'X'){    
        this.setState({
          xScore: this.state.xScore+1
        });
        axios
            .put("/api/toe/1/", {
                square: "X",
                score: this.state.xScore+1,
            })
      }if( winner === 'O'){
        this.setState({
          oScore: this.state.oScore+1
        });
        axios
            .put("/api/toe/2/", {
                square: "O",
                score: this.state.oScore+1,
            })
            
        
      }
    }
    
    else if(isDraw(current.squares)){
        status = "Its a draw! No points awarded";
    }
    
    else{
        status = "Current Move: " + (this.state.xIsNext ? "X" : "O");
    }
    

    return (
        <div>
          <div className="game">
            
            <div className="game-board">
              <div>{status}</div>
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div>Score</div>
            <div className="scoreboard">X's: {this.state.xScore} | O's: {this.state.oScore}</div>
          </div>
          
          <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
  }
}



function isDraw(squares){
    if(calculateWinner(squares)){
        return null;
    }
    for(let i =0; i< squares.length; i++) {
        if(squares[i] === null){
            return null;
        }
    }
    return true;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
