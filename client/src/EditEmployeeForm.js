import {useState, useContext} from 'react';
import axios from 'axios';
import { EmployeeContext } from './EmployeeContext.js'
import { Redirect } from 'react-router-dom';

function EditEmployeeForm(){
    
    const {
        employeeList,
        setEmployeeList,
        editEmployee
      } = useContext(EmployeeContext);

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState(editEmployee)
    
    const submit = e => {
        e.preventDefault()

        if (user["first_name"] && user["last_name"] && user["email_address"] && user["job"]){
            axios('/api/employee', {
                method: 'PUT',
                data: JSON.stringify( user ),
                headers: { 'Content-Type': 'application/json' },
                })
                    .then(res => {
                        setEmployeeList(
                            [...employeeList.slice(0,editEmployee.idx), {...user, checked: false} , ...employeeList.slice(editEmployee.idx+1)]
                        )
                        setRedirect(true)
                    })
        } else {
            console.log("warning need text");
        }
    }

    if (redirect || editEmployee === null || editEmployee ===undefined) {
        return <Redirect to='/'/>;
    }
    
    return (
    <div className="new-employee-form">
        <form onSubmit={submit}>
            <input
                type="text"
                placeholder="First Name"
                value={user["first_name"]}
                onChange={e => setUser({ ...user, first_name: e.target.value })}
            />
        
            <input
                type="text"
                placeholder="Last Name"
                value={user["last_name"]}
                onChange={e => setUser({ ...user, last_name: e.target.value })}
            />

            <input
                type="text"
                placeholder="Email Address"
                value={user["email_address"]}
                onChange={e => setUser({ ...user, email_address: e.target.value })}
            />

            <input
                type="text"
                placeholder="Job"
                value={user["job"]}
                onChange={e => setUser({ ...user, job: e.target.value })}
            />
        
            <input type="submit" name="Sign Up" />
        </form>
    </div>
        
    )
}

export default EditEmployeeForm;