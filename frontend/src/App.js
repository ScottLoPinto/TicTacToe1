import React, {Component} from "react";
import './App.css';
import axios from "axios";
import Modal from "./components/Modal";

function Square(props) {
    /**axios.get("/api/toe/3/").then((response) => {
        console.log(response.data.square);
    });

    axios.post("/api/toe/", {
        square: "x",
        move: "3"
    }).then(response => { 
	    console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });*/

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
      modal: false,
      activeItem: {
            square: "",
            move: "",
      },
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
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
      xIsNext: (step % 2) === 0
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

    let status;
    if (winner) {
      status = "Winner: " + winner;
      var scores;
      if(winner === 'X'){
        axios
            .get("/api/toe/1/")
            .then((response) => {
                scores = response.data.score + 1;
                axios
                    .put("/api/toe/1/", {
                        square: "X",
                        score: scores
                    });
            }
        );
      }if( winner === 'O'){
        axios
            .get("/api/toe/2/")
            .then((response) => {
                scores = response.data.score + 1;
                axios
                    .put("/api/toe/2/", {
                        square: "O",
                        score: scores
                    });
            }
         );
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
            <div> Score  </div>
            <div className="scoreboard">X: O:  </div>
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
