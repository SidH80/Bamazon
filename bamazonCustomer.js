//Ask WHat would you like to do?
//Display Items in a nice formed table
//Propmt User for ID item off the table
//Promt please enter a quanitity that you'd like to purchase
    //Make a decision - do we have enough?
        //if yes log great
            //show total cost and update database
                //exit
        //if not log error message
            //re-prompt

//initialize dependencies

// initialize connection variable for mysql database

var connection = mysql.createConnection ({
    host: "localhost",,
    port: 3306,
    user:"root",
    password: "root",
    database: "bamazon_db"
})

//create connection with the server and load the product data
connection.connect(function(err) {
    if (err) {
        console.log(`error connect ${err}`);
    }
    loadProducts();
})

function loadProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;


    //displays items
    console.table(res);
    //the prompt the customer for an item
    prompCustomerForItem();
    })
}

function prompCustomerForItem() {

}

function prompCustomerForQuantity() {

}

function makePurchase {

}

//check inventory to see if userChoice exists in inventory
    //use a for loop and a comparison
function checkInventory() {

}

//check to see if the user wants to exit
function exitProgram() {

}
