import { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { EmployeeContext } from './EmployeeContext.js'
import Traits from './Traits.js'
import './NewEmployeeForm.css';
import axios from 'axios';

function NewEmployeeForm(){

    const {
        employeeList,
        setEmployeeList,
        traitsList,
        setTraitsList
      } = useContext(EmployeeContext);

    const [user, setUser] = useState()
    const [redirect, setRedirect] = useState(false)
    
    const submit = e => {
        e.preventDefault()
        axios('/api/employee', {
        method: 'POST',
        data: JSON.stringify( user ),
        headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                setEmployeeList([...employeeList, {...res.data.employee, checked: false}])
                setRedirect(true)
            })


    }

    if (redirect) {
        return <Redirect to='/'/>;
    }
    
    return (
    <div className="new-employee-form-container">
        <form className="new-employee-form" onSubmit={submit}>
            <div className="form-grid-container">
                <div className="col-one-container">
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={e => setUser({ ...user, first_name: e.target.value })}
                    />
                
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={e => setUser({ ...user, last_name: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Email Address"
                        onChange={e => setUser({ ...user, email_address: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Job"
                        onChange={e => setUser({ ...user, job: e.target.value })}
                    />
                </div>
                <div className="col-two-container">
                    <Traits/>
                </div>
            </div>
            
            
        
            <button>Create</button>
        </form>
    </div>
    
        
    )
}

export default NewEmployeeForm




