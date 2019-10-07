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
    console.log("connected as id " + connection.threadId);
    loadProducts();
  });

function loadProducts() {
    connection.query("SELECT id, product, department, price, quantity FROM inventory", function(err, res) {
    if(err) throw err;

    //Prints Store Header
    console.log(``);
    console.log(`(==================================================================)`)
    console.log(`(==================================================================)`)
    console.log(``);
    console.log(`                         Welcome to Bamazon!          `);
    console.log(``);
    console.log(`(==================================================================)`);
    console.log(`(==================================================================)`);
    console.log(``);

    //displays items
    console.table(res);
    //function prompts the customer for an item
    promptCustomerForItem();
    })
}

function promptCustomerForItem() {

    //Ask the customer the ID of the product they would like to buy.
    inquirer
        .prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter the ID of the item you'd like to purchase:",
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
            //selects item id from the database
            var query = "SELECT id, product, department, price, quantity FROM inventory WHERE ?";
            connection.query(query, {id: chosenItem }, function(err, res) {
                if (err) throw err;
             console.table(res);
             promptQuantity();
            })
        });

};


function promptQuantity (){
    inquirer
    .prompt([
        {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {

        var query = "SELECT * FROM inventory WHERE ?";
            connection.query(query, {id: chosenItem }, function(err, res) {
                if (err) throw err;

                //if item is available then complete the purchase
                if (answer.quantity <= res[0].quantity) {
                    console.log(`${answer.quantity} ${res[0].product}(s) purchased! Your final price is $${parseInt(answer.quantity * res[0].price)}. Thank yor for shopping at Bamazon!`);

                    //updates the quantity available in inventory
                    connection.query(
                        "UPDATE inventory SET ? WHERE ?",
                        [
                            {
                                quantity: (res[0].quantity - answer.quantity),
                                product_sales: res[0].product_sales + (parseInt(answer.quantity * res[0].price))
                            },
                            {
                                id: chosenItem
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            loadProducts();
                        }
                    )

                // if quantity unavailable then prompt quantity again
                } else {
                    console.log(`Insufficient quantity. Please select a valid id or number.`);
                    promptQuantity();
                }
            })
    });

}
