const express = require('express');
const port = process.env.PORT || 3001;
const Employee = require('./model/employees.js');

const app = express();

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})

//important to get the req.body
app.use(express.json()) 

app.get('/api', (req, res) => {
    let promise = Employee.findAll();
    promise.then( dbRes => {
        res.json(dbRes.rows)
    })
})

app.post('/api', (req, res) => {

    let promise = Employee.create(req.body.first_name, req.body.last_name, req.body.email_address, req.body.job);
    
    promise.then( dbRes => {
        res.status(201).json({
            message: "new quote created",
            employee: dbRes.rows[0]
        })
    })
})

// app.delete('/api/:id', (req, res) => {
//     let promise = Employee.delete(req.params.id);
//     console.log(promise);

//     promise.then( dbRes => {
//         res.status(201).json({
//             message: "quote deleted",
//             employee: dbRes.rows[0]
//         })
//     })
// })

app.delete('/api', (req, res) => {
    let promise = Employee.delete(req.body.selectedItems);

    promise.then( dbRes => {
        res.status(201).json({
            message: "quote deleted",
            employee: dbRes.rows[0]
        })
    })
})

app.put('/api/:id', (req, res) => {
    let promise = Employee.edit(req.body.first_name, req.body.last_name, req.body.email_address, req.body.job, req.params.id);

    promise.then( dbRes => {
        res.status(201).json({
            message: "quote edited",
            employee: dbRes.rows[0]
        })
    })
})