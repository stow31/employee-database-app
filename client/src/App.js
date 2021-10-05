import axios from 'axios';
import { useContext, useEffect } from 'react';
import EmployeeTable from './EmployeeTable.js';
import EmployeeManagement from './EmployeeManagement.js';
import NewEmployeeForm from './NewEmployeeForm.js';
import EditEmployeeForm from './EditEmployeeForm.js';
import Header from './Header.js';
import './App.css';
import { EmployeeContext } from './EmployeeContext.js';
import { Switch, Route } from 'react-router-dom';

function App() {
  
  const {
    setEmployeeList,
  } = useContext(EmployeeContext);

  useEffect(() => {
  axios
    .get("/api")
    .then((res) => {
      setEmployeeList(
        res.data.map(obj=> ({...obj, checked: false}))
      )
    }
      );
  }, [setEmployeeList]);

  return (
    <div className="App">
      <Header />
      <Switch>

        <Route path="/new-employee">
          <NewEmployeeForm />
        </Route> 

        <Route path="/edit-employee">
          <EditEmployeeForm />
        </Route>

        <Route path="/">
          <EmployeeManagement/>
          <EmployeeTable />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
