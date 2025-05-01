class Cell {
  constructor(x, y, distance, parent = null) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.parent = parent;
  }
}
function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getPossibleMoves(currX, currY) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  return moves
    .map(([dx, dy]) => [currX + dx, currY + dy])
    .filter(([x, y]) => isValidMove(x, y));
}

function knightMoves(start, end) {
  const queue = [new Cell(start[0], start[1], 0)];
  const visited = new Array(8);
  for (let i = 0; i < visited.length; i++) {
    visited[i] = new Array(8).fill(false);
  }
  visited[start[0]][start[1]] = true;

  let current;

  while (queue.length > 0) {
    current = queue.shift();
    if (current.x === end[0] && current.y === end[1]) {
      break;
    }
    const possibleMoves = getPossibleMoves(current.x, current.y);
    possibleMoves.forEach((move) => {
      if (!visited[move[0]][move[1]]) {
        visited[move[0]][move[1]] = true;
        queue.push(new Cell(move[0], move[1], current.distance + 1, current));
      }
    });
  }

  console.log(`We can reach the destination in ${current.distance} moves.`);
  const path = [];
  while (current.parent !== null) {
    path.push([current.x, current.y]);
    current = current.parent;
  }

  console.log(`[${start}]`);
  while (path.length > 0) {
    console.log(`[${path.pop()}]`);
  }
}

knightMoves([0, 0], [4, 7]);
