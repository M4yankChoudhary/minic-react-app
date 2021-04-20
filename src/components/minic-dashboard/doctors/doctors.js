// React
import React from 'react';
import { useState } from 'react';

// Local Imports
import './doctors.css';
import DoctorTable from './tables';
import AddDoctor from './forms/addDoctor';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BrowserRouter, Link, Route, Switch, useRouteMatch } from 'react-router-dom';

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
  backgroundBlueGradient: {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  }
});


const Doctors = () => {

  const classes = useStyles();
  let { path, url } = useRouteMatch();

  // to hide/unhide the add button 
  const [showButton, setShowButton] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);
  
  const setHide = () => {
    setShowButton(false)
    setShowAddButton(false);
  }
  const unHide = () => {
    setShowButton(true)
    setShowAddButton(true);
  }

  return (
    <div>
      <BrowserRouter>
        <div className="dr-appbar">
          <ul>
            {showButton ? (<li>
              Doctors
            </li>) : (
                <li>
                  <Link to={`${url}/`} onClick={unHide}><ArrowBackIcon /></Link> <h6 className="display-inline-block">Add Doctor</h6>
                </li>
              )}

            <li>
              {
                showAddButton ? (
                  <Tooltip title="Add" aria-label="add">
                    <Link to={`${url}/add`} onClick={setHide}><Fab className={classes.backgroundBlueGradient}>
                      <AddIcon />
                    </Fab>
                    </Link>
                  </Tooltip>) : (<></>)
              }
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={path}>
            <DoctorTable />
          </Route>
          <Route exact path={`${path}/add`}>
            <AddDoctor />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default Doctors;