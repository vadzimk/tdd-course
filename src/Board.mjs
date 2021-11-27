export class Board {
  width;
  height;
  fallingBlock;
  EMPTY = ".";
  currentRow = 0;
  currentCol = 1;
  boardState = [];


  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (let i = 0; i < height; i++) {
      this.boardState.push(new Array(width).fill(this.EMPTY));
    }
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        s += this.blockAt(row, col);
      }
      s += "\n";
    }
    return s;
  }

  blockAt(r, c) {
    return this.hasFallingAt(r, c) ? this.fallingBlock.getColor() : this.boardState[r][c];
  }

  drop(block) {
    if (this.fallingBlock !== undefined) {
      throw Error("already falling");
    }
    this.startFalling(block);
  }

  startFalling(block) {
    this.currentRow = 0;
    this.currentCol = 1;
    this.fallingBlock = block;
  }

  hasFallingAt(r, c) {
    return this.fallingBlock !== undefined && r === this.currentRow && c === this.currentCol;
  }

  hasFalling() {
    return this.fallingBlock !== undefined;
  }

  isCollision() {
    return this.boardState[this.currentRow + 1][this.currentCol] !== this.EMPTY;
  }

  tick() {
    if (this.isAboveFloor() && !this.isCollision()) {
      this.currentRow++;
    } else {
      this.stopFalling();

    }
  }

  stopFalling() {
    this.boardState[this.currentRow][this.currentCol] = this.fallingBlock.getColor();
    this.fallingBlock = undefined;
  }

  isAboveFloor() {
    return this.currentRow < this.height - 1;
  }
}
