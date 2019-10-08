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
    console.log(`(==========================================================================)`);
    console.log(`(==========================================================================)`);
    console.log(``);
    console.log(`                                   Bamazon!                 `);
    console.log(`                             Supervisor Terminal             `);
    console.log(``);
    console.log(`(==========================================================================)`);
    console.log(`(==========================================================================)`);
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
        "View Products for Sales By Department",
        "Create New Department",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sales By Department":
        viewProductSalesDepartment();
        break;

      case "Create New Department":
        createNewDept();
        break;

      default:
        connection.end();
        break;
      }
    });
};

// Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

function viewProductSalesDepartment(){

   //var query = "SELECT dept_id, dept_name, over_head_costs FROM inventory LEFT JOIN inventory ON inventory.department = departments.dept_name GROUP BY dept_id, dept_name, over_head_costs";
   // View Product Sales by Department
   var query = "SELECT dept_name, product_sales, over_head_costs, (product_sales - over_head_costs) AS total_profit FROM departments";
   connection.query(query, function(err, res) {
       if (err) throw err;
       console.table(res);
       start();
      })
   // The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
};

function createNewDept (){
    // Create New Department

}


// If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.
