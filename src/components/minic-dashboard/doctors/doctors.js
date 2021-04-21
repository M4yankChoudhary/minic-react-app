// React
import React from 'react';
import { useState } from 'react';

// Local Imports
import './doctors.css';
import DoctorTable from './tables';
import AddDoctor from './forms/addDoctor';
import DoctorDetails from './details/doctorDetails'

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Link, Route, Switch, useRouteMatch, useLocation, useHistory } from 'react-router-dom';

// styling for material ui components
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    color: 'black',
  },
  pos: {
    marginBottom: 12,
  },
  
});


const Doctors = () => {

  let { path } = useRouteMatch();

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={path}>
            <DoctorTable />
          </Route>
          <Route exact path={`${path}/add`}>
            <AddDoctor />
          </Route>
          <Route exact path={`${path}/:id`}>
          <DoctorDetails/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default Doctors;