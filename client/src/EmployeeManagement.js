import { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from './EmployeeContext.js';
import { Link, Redirect } from 'react-router-dom';
import './EmployeeManagement.css';
import axios from 'axios';

function EmployeeManagement() {
  
  const { 
    employeeList, setEmployeeList,
    selectedEmployees, setSelectedEmployees,
    editEmployee, setEditEmployee 
  } = useContext(EmployeeContext)

  const [dropDownOption, setDropDownOption] = useState('delete')
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = (e) =>{
    e.preventDefault();

    if (selectedEmployees?.length>0){

      if (dropDownOption==='delete'){

        let selectedObj = { 
          selectedItems: selectedEmployees
                            .map(obj => obj["id"])
                            .join(', ')
        }
        
        axios('/api', {
          method: 'DELETE',
          data: JSON.stringify( selectedObj ),
          headers: { 'Content-Type': 'application/json' },
        }).then( res => {
          let arr = selectedObj["selectedItems"].split(', ');
          let subEmployeeList = [...employeeList]

          arr.forEach( id => {
            let index = subEmployeeList.findIndex(obj => obj.id === Number(id));
            
            subEmployeeList = [...subEmployeeList.slice(0, index), ...subEmployeeList.slice(index+1)];
          } )

          setEmployeeList(subEmployeeList)
        })

      } else if (dropDownOption==='edit'){

        // divert the edit page 
        // have the edit page pre- filled with the information

        let id = selectedEmployees[0]?.id
        let index = employeeList.findIndex(obj => obj.id === id);
        setEditEmployee(employeeList[index])
        setRedirect(true)


      }
    } else {
      console.log('create error message - you must select an item to perform an action')
    }
  }

  useEffect(() =>{
    let selectedArr = employeeList
    ?.filter( obj => obj["checked"] )
    
    setSelectedEmployees(selectedArr)
  }, [employeeList, setSelectedEmployees])

  if (redirect) {
    return <Redirect to='edit-employee'/>;
  }

  return (
      <div className="employee-management-div">

        <span>
          {selectedEmployees?.length > 0 ? selectedEmployees?.length : "0"} item selected
        </span>

        <span>
          <select 
            onChange={(e) => {setDropDownOption(e.target.value)}} className="employee-updates-dropdown">
              <option value="delete">Delete</option>
              {selectedEmployees?.length === 1 ? <option value="edit">Edit</option>  : null}
          </select>
          <button onClick={handleSubmit} className="submit-btn"> Submit </button>
        </span>

        <span>
          <button>
          <Link to="/new-employee">Add New Employee</Link>
          </button>
        </span>

      </div>
  );
}

export default EmployeeManagement;
