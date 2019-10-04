//Ask WHat would you like to do?
//Display Items in a nice formed table
//Prompt User for ID item off the table
//Prompt please enter a quantity that you'd like to purchase
    //Make a decision - do we have enough?
        //if yes log great
            //show total cost and update database
                //exit
        //if not log error message
            //re-prompt

//initialize dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");


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
    connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;

    //displays items
    console.table(res);
    //the prompt the customer for an item
    promptCustomerForItem();
    connection.end();
    })
}

function promptCustomerForItem() {
    //Ask the customer the ID of the product they would like to buy.
    inquirer
        .prompt([
            {
            name: "item_id",
            type: "input",
            message: "Please enter the ID of the item you'd like to purchase",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
                }
            }
        ])
        .then(function(answer) {
            console.log(answer.item_id);
            var query = `SELECT id FROM products WHERE ?`
            connection.query(query, answer.item_id, function(err, res){
                console.table(res);
            })
            promptQuantity();
        });

}


function promptQuantity (item_id){
    inquirer
        .prompt([
        {
            name: "item_quantity",
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
            console.log(answer.item_quantity)
            checkInventory();
        });


}

function makePurchase() {

}

//check inventory to see if userChoice exists in inventory
    //use a for loop and a comparison
function checkInventory() {

    //if we have enough items to sell {
        //multiply item_quantity by price and log amount of purchase
    //} else {
        //re-prompt how many more items how many would you like to purchase
    //}
}

//check to see if the user wants to exit
function exitProgram() {

}
