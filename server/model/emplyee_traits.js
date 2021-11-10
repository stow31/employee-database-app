const { Pool } = require('pg');
const db = new Pool({ 
    database: 'employee_app'
})

const EmployeeTraits = {
    findAll: () => {
        const sql = "SELECT * FROM emplyee_traits;"
        return db.query(sql);
    },
    create: (trait_id, user_id) => {
        const sql = "INSERT INTO emplyee_traits (trait_id, user_id) VALUES ($1, $2) returning *;";

        return db.query(sql, [trait_id, user_id]);
    }
    // delete: (id) => {
    //     const sql = `DELETE FROM employees WHERE id IN (${id}) returning *;`;

    //     return db.query(sql)
    // },
    // edit: (first_name, last_name, email_address, job, id) => {
    //     const sql = "UPDATE employees SET first_name=$1, last_name=$2, email_address=$3, job=$4 WHERE id = $5 returning *";

    //     return db.query(sql, [first_name, last_name, email_address, job, id])
}

module.exports = EmployeeTraits;