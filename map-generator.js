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
          const queue = [this.root];
          while (queue.length > 0) {
            const node = queue.shift();
            if (!node.left) {
              node.left = newNode;
              return;
            } else if (!node.right) {
              node.right = newNode;
              return;
            }
            queue.push(node.left);
            queue.push(node.right);
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
function getRandomElementFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

//to bedzie miejsce w którym jest gracz, nieinteraktywny pokój
class roomHeroPosition {
    constructor(){

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

//levels number to ilość poziomów drzewa, domyślnie 4
function generateMap(levelsNumber = 4) {
    const binaryTree = new BinaryTree();

    binaryTree.insert(new roomHeroPosition());
    
    utilityRooms = [
        new roomJobInterview(),
        new roomRest(),
        new roomShop(),
        new roomTherapy
    ]

    var countRooms = Math.pow(2, levelsNumber + 1) - 2;
    var countUtilityRooms = Math.ceil(countRooms * 0.2);

    totalRooms = []
    for(i = countRooms - countUtilityRooms; i > 0; i--){
        totalRooms.push(new roomFight());
    }
    for(i = countUtilityRooms; i > 0; i--){
        totalRooms.push(getRandomElementFromArray(utilityRooms));
    }
    
    totalRooms.forEach(element => {
        binaryTree.insert(element)
    });

    console.log(totalRooms)
    binaryTree.draw();
}

function gameSetUp(){
    generateMap();
}

gameSetUp();