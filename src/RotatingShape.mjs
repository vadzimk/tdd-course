//  rotates arbitrary 3×3 and 5×5 block shapes.

export class RotatingShape {
  shape;
  blocks = [];

  constructor(shape) {

    if (typeof shape === "string") {
      this.shape = shape.replaceAll("     ", "");
      const rows = this.shape.split("\n");
      for (let i = 0; i < rows.length; i++) {
        this.blocks[i] = [...rows[i]];
      }
      console.log("blocks", this.blocks);

    }
    if (Array.isArray(shape)) {
      console.log("got copy");
      this.blocks = [...shape];
    }
  }

  toString() {
    let s = "";
    for (let row of this.blocks) {
      s += row.join("").concat("\n");
    }
    return s;
  }

  transpose(matrix) {
    return matrix.reduce((prev, next) =>
      next.map((item, i) =>
        (prev[i] || []).concat(next[i])
      ), []);
  }

  reverseEachRow(matrix) {
    return matrix.reduce((prev, next) => {
        prev.push(next.reverse());
        return prev;
      }
      , []
    );
  }

  rotateRight() {
    // transpose and reverse each row
    const transposed = this.transpose(this.blocks);
    const rotated = this.reverseEachRow(transposed);


    console.log("rotated", rotated);

    return new RotatingShape(rotated);
  }

  rotateLeft(){
    // reverse each row and transpose
    const reversed = this.reverseEachRow(this.blocks);
    const rotated = this.transpose(reversed);
    return new RotatingShape(rotated)
  }
}

