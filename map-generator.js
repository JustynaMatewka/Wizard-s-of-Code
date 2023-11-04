var canvas = document.getElementById('okno');
var ctx = canvas.getContext('2d');

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
      this.x = 0; // Współrzędna x do rysowania
      this.y = 0; // Współrzędna y do rysowania
    }
}
  
class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new Node(data);

        if (!this.root) {
        this.root = newNode;
        } else {
        this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            this.insertNode(node.left, newNode);
        }
        } else {
        if (node.right === null) {
            node.right = newNode;
        } else {
            this.insertNode(node.right, newNode);
        }
        }
    }
    search(data) {
        return this.searchNode(this.root, data);
    }

    searchNode(node, data) {
        if (node === null) {
        return false;
        }

        if (data < node.data) {
        return this.searchNode(node.left, data);
        } else if (data > node.data) {
        return this.searchNode(node.right, data);
        } else {
        return true;
        }
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.root) {
          this.setNodeCoordinates(this.root, canvas.width / 2, 50, canvas.width / 4);
          this.drawNode(this.root);
        }
      }
    setNodeCoordinates(node, x, y, horizontalOffset) {
        if (node) {
            node.x = x;
            node.y = y;
            this.setNodeCoordinates(node.left, x - horizontalOffset, y + 80, horizontalOffset / 2);
            this.setNodeCoordinates(node.right, x + horizontalOffset, y + 80, horizontalOffset / 2);
        }
    }
    drawNode(node) {
        if (node) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fillText(node.data, node.x - 5, node.y + 5);
          ctx.closePath();

          if (node.left) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.left.x, node.left.y);
            ctx.stroke();
            ctx.closePath();
            this.drawNode(node.left);
          }
          if (node.right) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.right.x, node.right.y);
            ctx.stroke();
            ctx.closePath();
            this.drawNode(node.right);
          }
        }
    }
}

class roomFight {
    constructor(){

    }
}

class roomRest {
    constructor(){

    }
}

class roomTherapy {
    constructor(){

    }
}

class roomShop {
    constructor(){

    }
}

class roomJobInterview {
    constructor(){

    }
}

function generateMap() {
    const binaryTree = new BinaryTree();

    binaryTree.insert(10);
    binaryTree.insert(5);
    binaryTree.insert(15);
    binaryTree.insert(3);
    binaryTree.insert(7);  
    binaryTree.draw();
}

generateMap();