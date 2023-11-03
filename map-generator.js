var canvas = document.getElementById("canvas1");
var mojObiekt = canvas.getContext('2d');
mojObiekt.fillStyle = "#E44D26";
mojObiekt.fillRect(10,10,190,750);

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
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
}
  
  const binaryTree = new BinaryTree();
  binaryTree.insert(10);
  binaryTree.insert(5);
  binaryTree.insert(15);
  binaryTree.insert(3);
  binaryTree.insert(7);
  
  console.log(binaryTree.search(5)); // true
  console.log(binaryTree.search(8)); // false
  