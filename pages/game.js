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
    if (this.root) {
      this.drawNode(this.root);
    }
  }

  setNodeCoordinatesRequest() {
    if (this.root) {
      this.setNodeCoordinates(this.root, canvas.width / 2, 50, 920 / 4);
    }
  }

  setNodeCoordinates(node, x, y, horizontalOffset) {
    if (node) {
      node.x = x;
      node.y = y;
      this.setNodeCoordinates(
        node.left,
        x - horizontalOffset,
        y + Math.floor(Math.random() * (180 - 60 + 1)) + 60,
        horizontalOffset / 2
      );
      this.setNodeCoordinates(
        node.right,
        x + horizontalOffset,
        y + Math.floor(Math.random() * (180 - 60 + 1)) + 60,
        horizontalOffset / 2
      );
    }
  }

  drawNode(node) {
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "#D3B88C";
    ctx.lineWidth = 3;
    if (node) {
      if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
        this.drawNode(node.left);
      }
      if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
        this.drawNode(node.right);
      }

      if (node.data.image) {
        const img = new Image();
        img.src = node.data.image;

        img.onload = function () {
          if (node.data.name == "hero") {
            ctx.drawImage(img, node.x - 40, node.y - 50, 100, 100);
          } else {
            ctx.drawImage(img, node.x - 20, node.y - 20, 50, 50);
          }
        };
      } else {
        ctx.fillText(node.data.name, node.x - 5, node.y + 5);
      }
    }
  }
  searchNodeByName(node, name) {
    if (node === null) {
      return null;
    }

    if (node.data.name === name) {
      return node;
    }

    const leftResult = this.searchNodeByName(node.left, name);
    if (leftResult !== null) {
      return leftResult;
    }

    const rightResult = this.searchNodeByName(node.right, name);
    if (rightResult !== null) {
      return rightResult;
    }

    return null;
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
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Spell {
  constructor(num) {
    this.id = num;
    this.damage = 25;
    this.spellTarget = "enemy";
    this.name = "Spell " + num;
  }
}

class roomHero {
  constructor() {
    this.name = "hero";
    this.image = "../public/mag.png";
    this.hp = 69;
    this.psyche = 1;
    this.spells = [];
    for (let i = 0; i < 4; i++) {
      const spell = new Spell(i);
      this.spells.push(spell);
    }
  }
}

class roomFight {
  constructor() {
    this.name = "Walka";
    this.image = "../public/board_icons/fight_room.png";
    this.scene = "../public/rooms-scenes/FightRoomSCENE.png";
  }
}

class roomRest {
  constructor() {
    this.name = "Odpoczynek";
    this.image = "../public/board_icons/rest_room.png";
  }
}

class roomTherapy {
  constructor() {
    this.name = "Terapia";
    this.image = "../public/board_icons/therapy_room.png";
  }
}

class roomShop {
  constructor() {
    this.name = "Sklep";
    this.image = "../public/board_icons/shop_room.png";
  }
}

class roomJobInterview {
  constructor() {
    this.name = "JobInt";
    this.image = "../public/board_icons/job_room.png";
  }
}

class roomEmpty {
  constructor() {
    this.name = "empty";
    this.image = "../public/board_icons/empty_room.png";
  }
}

class enemyBug {
  constructor() {
    this.name = "Bug";
    this.image = "../public/enemy/bug.png";
    this.hp = 50;
    this.maxHp = 50;
    this.attack = 5;
    this.lvl = 1;
  }
}

class enemy404 {
  constructor() {
    this.name = "404";
    this.image = "../public/enemy/404.png";
    this.hp = 100;
    this.attack = 10;
    this.lvl = 2;
  }
}

class enemyErrOnLine9TheFileHas8Lines {
  constructor() {
    this.name = "Err On Line 9 the File Has 8 Lines";
    this.image = "../public/enemy/line.png";
    this.hp = 50;
    this.attack = 5;
    this.lvl = 3;
  }
}

function generateMap(levelsNumber = 4) {
  const binaryTree = new BinaryTree();
  binaryTree.insert(new roomHero());

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

  return binaryTree;
}

function generateEnemies(lvl) {
  const totalEnemies = [
    new enemyBug(),
    new enemy404(),
    new enemyErrOnLine9TheFileHas8Lines(),
  ];
  const enemies = [];
  let enemiesNumber = Math.floor(Math.random() * 3) + lvl;
  if (enemiesNumber > 4) {
    enemiesNumber = 4;
  }
  for (let i = enemiesNumber; i > 0; i--) {
    const enemyId = Math.floor(Math.random() * lvl);
    const newEnemy = new totalEnemies[enemyId].constructor();
    enemies.push(newEnemy);
  }
  return enemies;
}

function findClickedNode(node, x, y) {
  if (node) {
    if (
      x >= node.x - 30 &&
      x <= node.x + 30 &&
      y >= node.y - 30 &&
      y <= node.y + 40
    ) {
      if (node.data) {
        if (node.parent.data.name == "hero") {
          const chosenRoom = node.data;
          node.data = node.parent.data;
          node.parent.data = new roomEmpty();
          return chosenRoom;
        }
      }
    }

    const leftResult = findClickedNode(node.left, x, y);
    if (leftResult !== undefined) {
      return leftResult;
    }

    const rightResult = findClickedNode(node.right, x, y);
    if (rightResult !== undefined) {
      return rightResult;
    }
  }

  return undefined;
}

function findClickedEnemy(x, y, numberOfEnemies, enemies) {
  if (
    x >= 500 &&
    x <= 630 &&
    y >= 320 &&
    y <= 470 &&
    numberOfEnemies >= 1 &&
    enemies[0].hp > 0
  ) {
    return 0;
  }
  if (
    x > 630 &&
    x <= 760 &&
    y >= 320 &&
    y <= 470 &&
    numberOfEnemies >= 2 &&
    enemies[1].hp > 0
  ) {
    return 1;
  }
  if (
    x > 760 &&
    x <= 890 &&
    y >= 320 &&
    y <= 470 &&
    numberOfEnemies >= 3 &&
    enemies[2].hp > 0
  ) {
    return 2;
  }
  if (
    x > 890 &&
    x <= 970 &&
    y >= 320 &&
    y <= 470 &&
    numberOfEnemies >= 4 &&
    enemies[3].hp > 0
  ) {
    return 3;
  }
}

function gameSetUp(lvl = 1) {
  bn = generateMap();
  bn.setNodeCoordinatesRequest();
  lvlId = lvl;
}

function gameRun() {
  ctx.drawImage(map_img, 0, 0);
  bn.draw();
  heroObj = bn.searchNodeByName(bn.root, "hero").data;
  psycheElement[0].innerText = heroObj.psyche;
  canvas.addEventListener("click", function handleClick(event) {
    console.log("początek pętli nasłuchiwania");

    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (!isTriggerSet) {
      trigger = findClickedNode(bn.root, mouseX, mouseY);
    }
    if (trigger && !isTriggerSet) {
      console.log(trigger);
      isTriggerSet = true;
      gsap.to("#overlappingDiv", {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        onComplete() {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            duration: 0.4,
            onComplete() {
              room_img.src = trigger.scene;
              roomRun(trigger, heroObj);
              gsap.to("#overlappingDiv", {
                opacity: 0,
                duration: 0.4,
              });
              canvas.removeEventListener("click", handleClick);
            },
          });
        },
      });
    }
    ctx.drawImage(map_img, 0, 0);
    bn.draw();
  });
}

function roomRun(room, heroObj) {
  if (room.name == "Odpoczynek") {
    if (heroObj.psyche < 3) {
      heroObj.psyche += 1;
    }
    isTriggerSet = false;
    console.log("odpoczynek");
    gameRun();
    return;
  } else if (room.name == "Terapia") {
    console.log("terapia");
    return;
  } else if (room.name == "Sklep") {
    console.log("sklep");
    return;
  } else if (room.name == "JobInt") {
    console.log("jobint");
    return;
  } else if (room.name == "Walka") {
    gsap.to("#spell_toolbar", {
      opacity: 1,
      pointerEvents: "auto",
    });
    enemies = generateEnemies(lvlId);
    buttons = document.querySelectorAll("button");
    animateFight(room, heroObj, enemies);
  }
}

function animateFight(room, heroObj, enemies) {
  let allEnemiesDead = true;
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].hp > 0) {
      allEnemiesDead = false;
      break;
    }
  }
  if (allEnemiesDead) {
    isTriggerSet = false;
    gsap.to("#spell_toolbar", {
      opacity: 0,
      pointerEvents: "none",
    });
    gsap.to("#overlappingDiv", {
      opacity: 1,
      repeat: 3,
      yoyo: true,
      duration: 0.4,
      onComplete() {
        gsap.to("#overlappingDiv", {
          opacity: 1,
          duration: 0.4,
          onComplete() {
            gameRun();
            gsap.to("#overlappingDiv", {
              opacity: 0,
              duration: 0.4,
            });
          },
        });
      },
    });
    return;
  }
  window.requestAnimationFrame(() => animateFight(room, heroObj, enemies));
  hpElement.innerText = heroObj.hp;
  psycheElement[1].innerText = heroObj.psyche;
  ctx.drawImage(room_img, 0, 0);
  const imgHero = new Image();
  imgHero.src = heroObj.image;
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const imgEnemy = new Image();
    imgEnemy.src = enemy.image;
    if (enemy.hp > 0) {
      ctx.drawImage(imgEnemy, 500 + 110 * i, 320, 150, 150);
      ctx.fillStyle = "red";
      ctx.font = "bold 17px Arial";
      ctx.fillText(`HP: ${enemy.hp}/${enemy.maxHp}`, 541 + 110 * i, 310);
      if (markedObj == i) {
        const markerImg = new Image();
        markerImg.src = "../public/board_icons/marker.png";
        ctx.drawImage(markerImg, 500 + 110 * i, 320, 150, 150);
      }
    }
    ctx.drawImage(imgHero, 100, 320, 150, 150);
  }
  canvas.addEventListener("click", function handleClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    markedObj = findClickedEnemy(mouseX, mouseY, enemies.length, enemies);
  });
  buttons.forEach(function (button) {
    if (button.clickListener) {
      button.removeEventListener("click", button.clickListener);
    }
    button.clickListener = function (event) {
      if (heroObj.spells[event.target.id].spellTarget === "enemy") {
        if (markedObj !== null && markedObj !== undefined) {
          enemies[markedObj].hp -= heroObj.spells[event.target.id].damage;
          markedObj = null;
        }
      }
    };

    button.addEventListener("click", button.clickListener);
  });
}

var canvas = document.getElementById("game_window");
const ctx = canvas.getContext("2d");

canvas.height = 576;
canvas.width = 1024;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
const map_img = new Image(); //obrazek mapy
map_img.src = "../public/map_game.png"; //ścieżka do obrazka mapy

const room_img = new Image(); //obrazek sceny pokoju
var isTriggerSet = false; //czy kliknięto na pokój
var markedObj = null; //który przeciwnik jest zaznaczony
var enemies = []; //tablica przeciwników
var hpElement = document.getElementsByClassName("hp")[0]; //hp selector
var psycheElement = document.getElementsByClassName("psyche"); //psyche selector

console.log("przed game set up");

gameSetUp();

console.log("po game set up");

map_img.onload = () => {
  console.log("img on load");
  ctx.drawImage(map_img, 0, 0);
  gameRun();
};
