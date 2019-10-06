//initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

var chosenItem;

// initialize connection variable for mysql database
var connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user:"root",
    password: "root",
    database: "bamazon_db"
})

//create connection with the server and load the product data

connection.connect(function(err) {
    if (err) throw err;
    console.log(``);
    console.log(`Connected as id ${connection.threadId}`);
    displayHeader();
  });

function displayHeader() {

    console.log(``);
    console.log(`(==================================================================)`);
    console.log(`(==================================================================)`);
    console.log(``);
    console.log(`                              Bamazon!                 `);
    console.log(`                          Manager Terminal             `);
    console.log(``);
    console.log(`(==================================================================)`);
    console.log(`(==================================================================)`);
    console.log(``);

    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      // List a set of menu options:
    // View Products for Sale
    // View Low Inventory
    // Add to Inventory
    // Add New Product
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addNewProduct();
        break;
      case "Exit":
          connection.end();
          break;
      }
    });
}

function viewProducts(){
    //list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT * FROM inventory", function(err, res) {
        if(err) throw err;
        //displays items
        console.table(res);
        //the prompt the customer for an item
        displayHeader();
    })
};

function lowInventory(){
    // list all items with an inventory count lower than five.
    var query = "SELECT * FROM inventory";
    var lowInv = [];
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (res[i].quantity < 5) {
            console.table(res[i]);
            }
        }
        displayHeader();
    })
};

function addInventory(){
    // display a prompt that will let the manager "add more" of any item currently in the store.
};

function addNewProduct(){
    // add a completely new product to the store.
};