// Create a new MySQL table called departments. Your table should include the following columns:
// department_id
// department_name
// over_head_costs (A dummy number you set for each department)

// Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

// Make sure your app still updates the inventory listed in the products column.

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
    console.log(`(==================================================================)`);
    console.log(`(==================================================================)`);
    console.log(``);
    console.log(`                              Bamazon!                 `);
    console.log(`                          Supervisor Terminal             `);
    console.log(``);
    console.log(`(==================================================================)`);
    console.log(`(==================================================================)`);
    console.log(``);
}


// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

function viewProductSalesDepartment(){
   // View Product Sales by Department
   // When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

   // The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
}

function createNewDept (){
    // Create New Department
}


// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.
