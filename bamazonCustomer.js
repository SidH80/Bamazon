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
    connection.query("SELECT id, product, department, price, quantity FROM inventory", function(err, res) {
    if(err) throw err;

    //displays items
    console.table(res);
    //the prompt the customer for an item
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
            console.log(answer.id);
            var query = "SELECT * FROM inventory WHERE ?";
            connection.query(query, {id: answer.id }, function(err, res) {
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
            var query = "SELECT * FROM inventory WHERE ?"
            connection.query(query, {id: answer.id }, function(err, res) {
                if (err) throw err;
                console.table(res);
            })
            //checkInventory();
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
