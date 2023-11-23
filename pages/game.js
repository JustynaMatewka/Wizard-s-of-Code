var canvas = document.getElementById("game_window");
const ctx = canvas.getContext("2d");
canvas.height = 576
canvas.width = 1024

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent = null;
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
          newNode.parent = node;
          return;
        } else if (!node.right) {
          node.right = newNode;
          newNode.parent = node;
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
      this.setNodeCoordinates(
        this.root,
        canvas.width / 2,
        50,
        canvas.width / 4
      );
      this.drawNode(this.root);
    }
  }

  setNodeCoordinates(node, x, y, horizontalOffset) {
    if (node) {
      node.x = x;
      node.y = y;
      this.setNodeCoordinates(
        node.left,
        x - horizontalOffset,
        y + 80,
        horizontalOffset / 2
      );
      this.setNodeCoordinates(
        node.right,
        x + horizontalOffset,
        y + 80,
        horizontalOffset / 2
      );
    }
  }

  drawNode(node) {
    if (node) {
      ctx.beginPath();
      ctx.stroke();
      ctx.closePath();

      //console.log(node.parent);
      if (node.data.image) {
        const img = new Image();
        img.src = node.data.image;

        img.onload = function () {
          if (node.data.name == "Bohater") {
            ctx.drawImage(img, node.x - 40, node.y - 50, 100, 100);
          } else {
            ctx.drawImage(img, node.x - 20, node.y - 20, 40, 40);
          }
        };
      } else {
        ctx.fillText(node.data.name, node.x - 5, node.y + 5);
      }

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

function shuffleMapArray(array) {
  for (let i = array.length - 1; i > 3; i--) {
    min = Math.ceil(3);
    max = Math.floor(array.length - 1);
    const j = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(j);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//to bedzie miejsce w którym jest gracz, nieinteraktywny pokój
class roomHeroPosition {
  constructor() {
    this.name = "Bohater";
    this.image = "../public/wizard.svg";
  }
}

class roomFight {
  constructor() {
    this.name = "Walka";
    this.image = "../public/board_icons/sword_icon.png";
    this.src = "../Levels/level.html";
  }
}

class roomRest {
  constructor() {
    this.name = "Odpoczynek";
    this.image = "../public/board_icons/shield_icon.png";
  }
}

class roomTherapy {
  constructor() {
    this.name = "Terapia";
    this.image = "../public/board_icons/heart_icon.png";
  }
}

class roomShop {
  constructor() {
    this.name = "Sklep";
    this.image = "../public/board_icons/potion_icon.png";
  }
}

class roomJobInterview {
  constructor() {
    this.name = "JobInt";
    this.image = "../public/board_icons/foot_icon.png";
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
    new roomTherapy(),
  ];

  var countRooms = Math.pow(2, levelsNumber + 1) - 2;
  var countUtilityRooms = Math.ceil(countRooms * 0.2);

  totalRooms = [];
  for (i = countRooms - countUtilityRooms; i > 0; i--) {
    totalRooms.push(new roomFight());
  }
  for (i = countUtilityRooms; i > 0; i--) {
    totalRooms.push(getRandomElementFromArray(utilityRooms));
  }
  shuffleMapArray(totalRooms);
  totalRooms.forEach((element) => {
    binaryTree.insert(element);
  });

  // console.log(totalRooms)
  binaryTree.draw();

  canvas.addEventListener("click", (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    findClickedNode(binaryTree.root, mouseX, mouseY);
  });

  function findClickedNode(node, x, y) {
    if (node) {
      if (
        x >= node.x - 20 &&
        x <= node.x + 20 &&
        y >= node.y - 20 &&
        y <= node.y + 20
      ) {
        if (node.data.src) {
          if (node.parent.data.name == "Bohater") {
            window.location.href = node.data.src;
          }
        }
      }
      findClickedNode(node.left, x, y);
      findClickedNode(node.right, x, y);
    }
  }
}

function gameSetUp() {
  generateMap();
}

gameSetUp();
