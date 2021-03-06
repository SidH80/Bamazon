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

  // View Product Sales by Department dynamically calculated total-profit on the fly
   var querySelect = "SELECT departments.dept_id, inventory.department, departments.over_head_costs, inventory.product_sales, (inventory.product_sales - departments.over_head_costs) AS total_profit FROM inventory RIGHT JOIN departments ON inventory.department = departments.dept_name GROUP BY departments.dept_id";
   connection.query(querySelect, function(err, res) {
       if (err) throw err;
       console.table(res);
       start();
      })
   // The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
};

function createNewDept (){
    // Create New Department
    inquirer
    .prompt([
        {
            name: "dept",
            type: "input",
            message: "What department you would like to submit?"
        },
        {
            name: "overHead",
            type: "input",
            message: "What is the overhead cost?",
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
            "INSERT INTO departments SET ?",
            {
                dept_name: answer.dept,
                over_head_costs: answer.overHead,
                product_sales: 0
            },
            function(err, res) {
            if (err) throw err;
            console.log(`The ${answer.dept} has been added successfully!`);

            start();
            }
        );
    });

}
