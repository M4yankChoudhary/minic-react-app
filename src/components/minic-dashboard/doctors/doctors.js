import './doctors.css';
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DoctorTable from './tables';
import AddDoctor from './forms/addDoctor';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { BrowserRouter, Link, Route, Switch, useParams, useLocation, useRouteMatch } from 'react-router-dom';

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
  backgroundBlueGradient:{
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  }
});


const Doctors = () => {
  const classes = useStyles();
  const location = useLocation();
  console.log(location)

  let { path, url } = useRouteMatch();

  const [showButton, setShowButton] = useState(true);
  const [showAddButton, setShowAddButton] = useState(true);

  const setHide = () => {
    setShowButton(false)
    // setShowAddButton(false)
    setShowAddButton(false);
    // h();
  }
  const unHide = () => {
    setShowButton(true)
    // setShowAddButton(true)
    setShowAddButton(true);
    // f();
  }


  // const h = () => {
    
  // }
  // const f = () => {
    
  // }


  return (
    <div>
      <BrowserRouter>
        <div className="dr-appbar">
          <ul>
            {showButton ? (<li>
              Doctors
            </li>) : (
                <li>
                  <Link to={`${url}/`} onClick={unHide}><ArrowBackIcon /></Link> <h6 class="display-inline-block">Add Doctor</h6>
                </li>
              )}

            <li>
              {

                showAddButton ? (

                  <Tooltip title="Add"  aria-label="add">
                    <Link to={`${url}/add`} onClick={setHide}><Fab className={classes.absolute, classes.backgroundBlueGradient}>
                      <AddIcon />
                    </Fab>
                    </Link>
                  </Tooltip>)
                  :
                  (
                    <h1></h1>
                  )
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