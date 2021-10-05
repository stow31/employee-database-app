const { Pool } = require('pg');
const db = new Pool({ 
    database: 'employee_app'
})

const Employee = {
    findAll: () => {
        const sql = "SELECT * FROM employees;"

        return db.query(sql);
    },
    create: (first_name, last_name, email_address, job) => {
        const sql = "INSERT INTO employees (first_name, last_name, email_address, job) VALUES ($1, $2, $3, $4) returning *;";

        return db.query(sql, [first_name, last_name, email_address, job]);
    },
    delete: (id) => {
        const sql = `DELETE FROM employees WHERE id IN (${id}) returning *;`;

        return db.query(sql)
    },
    edit: (first_name, last_name, email_address, job, id) => {
        const sql = "UPDATE employees SET first_name=$1, last_name=$2, email_address=$3, job=$4 WHERE id = $5 returning *";

        return db.query(sql, [first_name, last_name, email_address, job, id])
    }
}

module.exports = Employee;