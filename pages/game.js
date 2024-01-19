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

  updateY(node = this.root, y) {
    if (node) {
      node.y -= y;
      this.updateY(node.left, y);
      this.updateY(node.right, y);
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
    [array[i], array[j]] = [array[j], array[i]];
  }
}

class Spell {
  constructor(num) {
    this.id = num;
    this.damage = 100;
    this.spellTarget = "enemy";
    this.name = "Spell " + num;
  }
}

class roomHero {
  constructor() {
    this.name = "hero";
    this.image = "../public/mag.png";
    this.hp = 100;
    this.psyche = 3;
    this.spells = [];
    for (let i = 0; i < 4; i++) {
      const spell = new Spell(i);
      this.spells.push(spell);
    }
  }
}

class roomNext {
  constructor() {
    this.name = "next";
    this.image = "../public/board_icons/next.png";
  }
}

class roomBoss {
  constructor() {
    this.name = "boss";
    this.image = "../public/board_icons/boss.png";
    this.scene = "../public/rooms-scenes/FightRoomSCENE.png";
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
    this.hp = 75;
    this.maxHp = 75;
    this.damage = 5;
    this.lvl = 1;
    this.strikeNum = 2;
    this.healNum = 2;
    this.ultNum = 0;
  }

  attack(heroObj, enemies) {
    const randomDamage = Math.floor(Math.random() * (this.damage / 2 + 1));
    heroObj.hp -= this.damage + randomDamage;
    const attackMessage = "Bug attack: " + (this.damage + randomDamage);
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  heal(heroObj, enemies) {
    const randomHeal = Math.floor(Math.random() * 30) + 1;
    this.hp += randomHeal;
    const attackMessage = "Bug heal: " + randomHeal;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  strike(heroObj, enemies) {
    heroObj.hp -= this.damage * 2;
    const attackMessage = "Bug strike: " + this.damage * 2;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  ult(heroObj, enemies) {
    this.attack(heroObj);
  }
}

class enemy404 {
  constructor() {
    this.name = "404";
    this.image = "../public/enemy/404.png";
    this.hp = 40;
    this.maxHp = 40;
    this.damage = 20;
    this.lvl = 2;
    this.strikeNum = 1;
    this.healNum = 1;
    this.ultNum = 1;
  }

  attack(heroObj, enemies) {
    heroObj.hp -= this.damage;
    const attackMessage = "404 - attack: " + this.damage;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  heal(heroObj, enemies) {
    enemies.forEach((enemy) => {
      enemy.strikeNum += 1;
      enemy.ultNum += 1;
    });
    const attackMessage = "404 - przywrócenie umiejetności: ";
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  strike(heroObj, enemies) {
    heroObj.hp -= this.damage * 2;
    const attackMessage = "404 - strike: " + this.damage * 2;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  ult(heroObj, enemies) {
    heroObj.hp -= this.damage * 2;
    const attackMessage = "404 ult: " + this.damage * 2;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
}

class enemyErrOnLine9TheFileHas8Lines {
  constructor() {
    this.name = "Err On Line 9 the File Has 8 Lines";
    this.image = "../public/enemy/line.png";
    this.hp = 100;
    this.maxHp = 100;
    this.damage = 1;
    this.lvl = 2;
    this.strikeNum = 1;
    this.healNum = 1;
    this.ultNum = 1;
  }

  attack(heroObj, enemies) {
    const randomDamage = Math.floor(Math.random() * (this.damage * 9));
    heroObj.hp -= this.damage + randomDamage;
    const attackMessage = "Line - attack: " + (this.damage + randomDamage);
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  heal(heroObj, enemies) {
    const randomHeal = Math.floor(Math.random() * 15) + 1;
    enemies.forEach((enemy) => {
      if (enemy.hp > 0) {
        enemy.hp += randomHeal;
        if (enemy.hp > enemy.maxHp) {
          enemy.hp = enemy.maxHp;
        }
      }
    });
    const attackMessage = "Line - przywracanie Hp druzyny: " + randomHeal;
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  strike(heroObj, enemies) {
    this.heal(heroObj, enemies);
  }
  ult(heroObj, enemies) {
    this.heal(heroObj, enemies);
  }
}

class enemySirDeadline {
  constructor() {
    this.name = "Sir Deadline";
    this.image = "../public/enemy/sir_deadline.png";
    this.hp = 200;
    this.maxHp = 200;
    this.damage = 15;
    this.lvl = 4;
    this.strikeNum = 10;
    this.healNum = 10;
    this.ultNum = 10;
  }

  attack(heroObj, enemies) {
    const randomDamage = Math.floor(Math.random() * this.damage);
    heroObj.hp -= this.damage + randomDamage;
    const attackMessage =
      "Sir Deadline - attack: " + (this.damage + randomDamage);
    console.log(attackMessage);
    enemyAttackMessage(attackMessage);
  }
  heal(heroObj, enemies) {
    if (enemies.length < 4) {
      // enemies = enemies.filter((enemy) => enemy.hp > 0);
      enemies.push(new enemyErrOnLine9TheFileHas8Lines());
      const attackMessage =
        "Sir Deadline - summon: enemyErrOnLine9TheFileHas8Lines";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    } else {
      const attackMessage =
        "Sir Deadline - summon: enemyErrOnLine9TheFileHas8Lines - brak miejsca";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    }
  }
  strike(heroObj, enemies) {
    if (enemies.length < 4) {
      // enemies = enemies.filter((enemy) => enemy.hp > 0);
      enemies.push(new enemy404());
      const attackMessage = "Sir Deadline - summon: 404";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    } else {
      const attackMessage = "Sir Deadline - summon: 404 - brak miejsca";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    }
  }
  ult(heroObj, enemies) {
    if (enemies.length < 4) {
      // enemies = enemies.filter((enemy) => enemy.hp > 0);
      enemies.push(new enemyBug());
      const attackMessage = "Sir Deadline - summon: Bug";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    } else {
      const attackMessage = "Sir Deadline - summon: Bug - brak miejsca";
      console.log(attackMessage);
      enemyAttackMessage(attackMessage);
    }
  }
}

function generateMap(levelsNumber = 4, heroObj) {
  const binaryTree = new BinaryTree();
  if (heroObj) {
    binaryTree.insert(heroObj);
  } else {
    binaryTree.insert(new roomHero());
  }

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
      if (node.data && node.parent) {
        if (node.parent.data.name == "hero") {
          const chosenRoom = node.data;
          node.data = node.parent.data;
          node.parent.data = new roomEmpty();
          if (node.left == null && node.right == null) {
            if (!endOfLvl) {
              if (lvlId === 3) {
                console.log("boss dodany");
                node.left = new Node(new roomBoss());
                node.left.y = node.y + 150;
                node.left.x = node.x;
                node.left.parent = node;
                endOfLvl = true;
              } else {
                console.log("next dodany");
                node.left = new Node(new roomNext());
                node.left.y = node.y + 150;
                node.left.x = node.x;
                node.left.parent = node;
                endOfLvl = true;
              }
            }
          }
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

function finiteStateMachine(enemies, heroObj) {
  for (let i = 0; i < enemies.length; i++) {
    const randomDice = Math.floor(Math.random() * 20) + 1;
    const enemy = enemies[i];
    if (enemy.hp <= 0) {
      continue;
    }
    if (randomDice > 14) {
      enemy.attack(heroObj, enemies);
    } else if (randomDice > 9) {
      if (enemy.hp < enemy.maxHp / 2 && enemy.healNum > 0) {
        enemy.heal(heroObj, enemies);
        enemy.healNum -= 1;
      } else {
        enemy.attack(heroObj, enemies);
      }
    } else if (randomDice > 4) {
      if (enemy.strikeNum > 0) {
        enemy.strike(heroObj, enemies);
        enemy.strikeNum -= 1;
      } else {
        enemy.attack(heroObj, enemies);
      }
    } else {
      if (enemy.ultNum > 0) {
        enemy.ult(heroObj, enemies);
        enemy.ultNum -= 1;
      } else {
        enemy.attack(heroObj, enemies);
      }
    }
  }
}

function gameSetUp(lvl = 3, heroObj) {
  bn = generateMap(4, heroObj);
  bn.setNodeCoordinatesRequest();
  lvlId = lvl;
}

function gameRun() {
  ctx.drawImage(map_img, 0, mapPositionY);
  bn.draw();
  heroObj = bn.searchNodeByName(bn.root, "hero").data;
  psycheElement[0].innerText = heroObj.psyche;
  canvas.addEventListener("click", function handleClick(event) {
    ctx.drawImage(map_img, 0, mapPositionY);
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    if (!isTriggerSet) {
      trigger = findClickedNode(bn.root, mouseX, mouseY);
    }
    if (trigger && !isTriggerSet) {
      isTriggerSet = true;
      bn.updateY(bn.root, mouseY - 100);
      mapPositionY -= mouseY - 100;
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
              if (trigger.scene) {
                room_img.src = trigger.scene;
              }
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
    ctx.drawImage(map_img, 0, mapPositionY);
    bn.draw();
  });
}

function roomRun(room, heroObj) {
  //console.log(room);
  if (room.name == "Odpoczynek") {
    isTriggerSet = false;
    console.log("odpoczynek");
    document.getElementsByClassName("custom_string")[0].innerText = "ZZZzzz...";
    gsap.to("#custom", {
      opacity: 1,
      onComplete() {
        gsap.to("#custom", {
          duration: 7,
          onComplete() {
            gsap.to("#custom", {
              opacity: 0,
              duration: 1,
              onComplete() {
                gameRun();
              },
            });
          },
        });
      },
    });
  } else if (room.name == "Terapia") {
    console.log("terapia");
    if (heroObj.psyche < 3) {
      heroObj.psyche += 1;
    }
    isTriggerSet = false;
    document.getElementsByClassName("custom_string")[0].innerText = "PSYCHE +1";
    gsap.to("#custom", {
      opacity: 1,
      onComplete() {
        gsap.to("#custom", {
          duration: 7,
          onComplete() {
            gsap.to("#custom", {
              opacity: 0,
              duration: 1,
              onComplete() {
                gameRun();
              },
            });
          },
        });
      },
    });
  } else if (room.name == "Sklep") {
    console.log("sklep");
    isTriggerSet = false;
    gsap.to("#shop", {
      opacity: 1,
      onComplete() {
        gsap.to("#shop", {
          duration: 7,
          onComplete() {
            gsap.to("#shop", {
              opacity: 0,
              duration: 1,
              onComplete() {
                gameRun();
              },
            });
          },
        });
      },
    });
  } else if (room.name == "JobInt") {
    console.log("jobint");
    isTriggerSet = false;
    gameRun();
  } else if (room.name == "Walka") {
    console.log("Walka");
    let roomInfoElement = document.getElementById("consoleLog");
    roomInfoElement.innerText = "Current Room: " + room.name;

    gsap.to("#consoleLog", {
      opacity: 1,
      pointerEvents: "auto",
    });
    gsap.to("#spell_toolbar", {
      opacity: 1,
      pointerEvents: "auto",
    });
    enemies = generateEnemies(lvlId);
    buttons = document.querySelectorAll("button");
    animateFight(room, heroObj, enemies);
  } else if (room.name == "next") {
    console.log("next room run");
    isTriggerSet = false;
    mapPositionY = 0;
    endOfLvl = false;
    gameSetUp(lvlId + 1, heroObj);
    gameRun();
  } else if (room.name == "boss") {
    gsap.to("#spell_toolbar", {
      opacity: 1,
      pointerEvents: "auto",
    });
    gsap.to("#consoleLog", {
      opacity: 1,
      pointerEvents: "auto",
    });
    enemies = [new enemySirDeadline()];
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
  if (allEnemiesDead || heroObj.hp <= 0) {
    isTriggerSet = false;
    if (enemies && enemies.some((enemy) => enemy instanceof enemySirDeadline)) {
      document.getElementsByClassName("game_over")[0].innerText = "YOU WIN";
      gsap.to("#game_over", {
        opacity: 1,
        pointerEvents: "auto",
      });
      gsap.to("#map_toolbar", {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.to("#spell_toolbar", {
        opacity: 0,
        pointerEvents: "none",
      });
    } else {
      gsap.to("#spell_toolbar", {
        opacity: 0,
        pointerEvents: "none",
      });
      gsap.to("#consoleLog", {
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
    }
    if (heroObj.hp <= 0) {
      heroObj.psyche -= 1;
      if (heroObj.psyche <= 0 || endOfLvl) {
        document.getElementsByClassName("game_over")[0].innerText = "GAME OVER";
        gsap.to("#game_over", {
          opacity: 1,
          pointerEvents: "auto",
        });
        gsap.to("#map_toolbar", {
          opacity: 0,
          pointerEvents: "none",
        });
      }
    }
    buttons.forEach((button) =>
      button.removeEventListener("click", button.clickListener)
    );
    heroObj.hp = 100;
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
          finiteStateMachine(enemies, heroObj);
        }
      }
    };

    button.addEventListener("click", button.clickListener);
  });
}

//  Dwie funkcje do wyświetlania przebiegu walki
let roomInfoElement = document.getElementById("consoleLog");

function updateConsoleLog(attackInfo) {
  if (roomInfoElement) {
    const logMessage = document.createElement("p");
    logMessage.innerText = attackInfo.message;
    roomInfoElement.appendChild(logMessage);
  }
}

function enemyAttackMessage(mess) {
  const attackInfo = {
    message: mess,
  };

  updateConsoleLog(attackInfo);
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
var mapPositionY = 0; //pozycja rysowania mapy
var endOfLvl = false; //czy koniec poziomu

gameSetUp();

map_img.onload = () => {
  ctx.drawImage(map_img, 0, 0);
  gameRun();
};

//Wyświetlanie legendy
document.getElementById("showLegendBtn").addEventListener("click", function () {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
});

document
  .getElementById("closeLegendBtn")
  .addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  });

//Terminal
document.getElementById("terminal").addEventListener("click", function () {
  gsap.to("#terminal_overlapping", {
    opacity: 1,
    pointerEvents: "auto",
  });
  gsap.to("#map_toolbar", {
    opacity: 0,
    pointerEvents: "none",
  });
});

document.getElementById("x_terminal").addEventListener("click", function () {
  gsap.to("#terminal_overlapping", {
    opacity: 0,
    pointerEvents: "none",
  });
  gsap.to("#map_toolbar", {
    opacity: 1,
    pointerEvents: "auto",
  });
});

function saveData() {
  var inputData = document.getElementById("data").value;

  fetch("http://localhost:3000/saveData", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "data=" + encodeURIComponent(inputData),
  })
    .then((response) => response.text())
    .then((message) => alert(message))
    .catch((error) => console.error(error));
}
