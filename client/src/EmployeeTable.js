import {useContext, useEffect} from 'react';
import {EmployeeContext} from './EmployeeContext.js'
import './EmployeeTable.css';

function EmployeeTable() {


    const {
        employeeList, setEmployeeList,
        selectAll, setSelectAll
    } = useContext(EmployeeContext);

  useEffect(() => {
    let selectedArr = employeeList
      ?.map( obj => obj["checked"])
      .filter( bool => bool )
    
    if (selectedArr?.length === employeeList?.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }

    if (employeeList?.length === 0){
      setSelectAll(false)
    }

  }, [employeeList, setSelectAll]);

  const handleSelectEmployee = (idx, event) => {
    if (event.target.checked){
      setEmployeeList(
        [...employeeList.slice(0,idx), {...employeeList[idx], checked: true}, ...employeeList.slice(idx+1)]
      )
    } else {
      setEmployeeList(
        [...employeeList.slice(0,idx), {...employeeList[idx], checked: false}, ...employeeList.slice(idx+1)]
      )
    }
  }

  const handleSelectAllEmployees = (event) => {
    if (event.target.checked){
      setSelectAll(true)
      setEmployeeList(
        employeeList.map(obj=> ({...obj, checked: true}))
      )
    } else {
      setSelectAll(false)
      setEmployeeList(
        employeeList.map(obj=> ({...obj, checked: false}))
      )
    }
  }
  
  return (
      <table className="employee-table">
        <thead>
            <tr>
            <th> 
              <input 
                checked={selectAll ? 'checked' : ''}
                onChange={(event) => handleSelectAllEmployees(event)} 
                type="checkbox" 
              /> 
            </th>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
            <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {employeeList ?
                employeeList.map( (obj, idx) => 
                <tr key={obj.id}>
                    <td>
                      <input 
                        checked={obj.checked ? 'checked ': ''}
                        onChange={(event) => handleSelectEmployee(idx, event)} 
                        type="checkbox" />
                      </td>
                    <td>{obj.id}</td>
                    <td>{obj.first_name}</td>
                    <td>{obj.last_name}</td>
                    <td>{obj.email_address}</td>
                    <td>{obj.job}</td>
                </tr>  
                ) :
                <tr>
                  <td>loading...</td>
                </tr>
            }
        </tbody>
      </table>
  );
}

export default EmployeeTable;
