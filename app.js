const {
    prompt
} = require("inquirer");
const db = require("./database");
require("console.table");

//ask a bunch of questions.  after .then(function(answers){
// const manager = new Manager(ansers.name, answers.id, answers.email, answers.officeNumber)
// team.push(manager)

//Run the program
loadMainPrompts();

function loadMainPrompts() {
    prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [{
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name: "View All Employees By Departments",
                value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
            },
            {
                name: "View All Employees By Role",
                value: "VIEW_EMPLOYEES_BY_ROLE"
            },
            {
                name: "Add Employee",
                value: "ADD_EMPLOYEES"
            },
            {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Add Role",
                value: "ADD_ROLE"
            },
            {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
                name: "Quit",
                value: "QUIT"
            },
        ]
    }]).then(answer => {
        console.log(answer.choice);
        // Call the appropriate function depending on what the user chose
        switch (answer.choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;

            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;

            case "VIEW_EMPLOYEES_BY_ROLE":
                viewEmployeesByRole();
                break;

            case "CREATE_EMPLOYEE":
                viewEmployeesByDepartment();
                break;

            case "REMOVE_EMPLOYEE":
                viewEmployeesByDepartment();
                break;

            case "UPDATE_EMPLOYEE_BY_ROLE":
                viewEmployeesByDepartment();
                break;

            case "UPDATE_EMPLOYEE_MANAGER":
                viewEmployeesByDepartment();
                break;

            default:
                quit();
        }
    })

}
async function viewEmployees() {
    const employees = await db.findAllEmployees();
    console.log("\n");
    console.table(employees);
    loadMainPrompts();
}
async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();
    const departmentChoices = departments.map(({
        id,
        name
    }) => ({
        name: name,
        value: id
    }));
    const {
        departmentId
    } = await prompt([{
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
    }]);
    const employees = await db.findAllEmployeesByDepartment(departmentId);
    console.log("\n");
    console.table(employees);
    loadMainPrompts();
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}