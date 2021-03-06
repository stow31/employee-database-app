import React, {useState, createContext} from 'react';

export const EmployeeContext = createContext();

export function EmployeeProvider(props){

    const [employeeList, setEmployeeList] = useState(null);
    const [traitsList, setTraitsList] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState();
    const [editEmployee, setEditEmployee] = useState();
    const [userTraits, setUserTraits] = useState([]);


    return <EmployeeContext.Provider value={
        {employeeList,
        setEmployeeList,
        selectAll,
        setSelectAll,
        selectedEmployees,
        setSelectedEmployees,
        editEmployee, 
        setEditEmployee,
        traitsList, 
        setTraitsList,
        userTraits, 
        setUserTraits
        }
    }>
        {props.children}
    </EmployeeContext.Provider>

}