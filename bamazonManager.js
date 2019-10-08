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
    start();
  });

function displayHeader() {

    console.log(``);
    console.log(`(=========================================================================)`);
    console.log(`(=========================================================================)`);
    console.log(``);
    console.log(`                                  Bamazon!                 `);
    console.log(`                              Manager Terminal             `);
    console.log(``);
    console.log(`(=========================================================================)`);
    console.log(`(=========================================================================)`);
    console.log(``);
}

function start() {
    displayHeader();

    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
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
        console.log("You chose View Products for Sale");
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
        start();
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
            lowInv.push(res[i]);
            }
        }
        console.table(lowInv);
        start();
    })
};

function addInventory(){
    connection.query("SELECT * FROM inventory", function(err, res) {
        console.log(``);
        if(err) throw err;
        //displays items
        console.table(res);
        //the prompt the customer for an item
    })
    // display a prompt that will let the manager "add more" of any item currently in the store.
    inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Which item count to increase?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many items are you adding to the count?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
      }
    ])
    .then(function(answer) {
        chosenItem = answer.id;
        var query = "SELECT * FROM inventory WHERE ?";
        connection.query(query, {id: chosenItem },
            function(err, res) {
            if (err) throw err;

                //updates the quantity available in inventory
                connection.query(
                    "UPDATE inventory SET ? WHERE ?",
                    [
                        {
                            quantity: (res[0].quantity + parseInt(answer.quantity))
                        },
                        {
                            id: chosenItem
                        }
                    ],
                    function(error) {
                        if(err) throw err;
                        console.table(res);
                        console.log(`${answer.quantity} ${res[0].product}(s) updated. Updated quantity is ${res[0].quantity}`);
                        start();
                    }
                )
            }
        )
    })
};

function addNewProduct(){
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What new product you would like to submit?"
            },
            {
                name: "department",
                type: "input",
                message: "In what department would you like to place your product?"
            },
            {
                name: "price",
                type: "input",
                message: "Price?",
                validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many products are you adding?",
                validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
                }
            }
        ])
        .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO inventory SET ?",
                {
                    product: answer.product,
                    department: answer.department,
                    price: answer.price,
                    quantity: answer.quantity
                },
                function(err, res) {
                if (err) throw err;
                console.log(`You have added ${answer.quantity} ${answer.product}(s) successfully!`);
                // re-prompt the user for if they want to bid or post
                start();
                }
            );
        });
};
