import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import './table.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cardWidth: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    color: 'black',
  },
  pos: {
    marginBottom: 12,
  },
  absolute: {
    height: 45,
    width: 45,
  },
  appBarItem: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBlueGradient: {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  }
});






function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  let { url } = useRouteMatch();
  const history = useHistory();



  useEffect(() => {
    const getDoctor = async () => {
      // setIsLoading(true);
      const response = await fetch('http://localhost:8080/api/doctors');
      const data = await response.json()
      setDoctors(data);
      // setIsLoading(false);
    };
    getDoctor();

  }, []);

  const handleRowClick = (path) => {
    history.push(`${url}/${path}`);
  }

  const classes = useStyles();
  return (
    <div>
      <div className="dr-appbar">
        <ul>
          <li>
            Doctors
          </li>
          <li>
            <Tooltip title="Add" aria-label="add">
              <Link to={`${url}/add`}><Fab className={classes.backgroundBlueGradient}>
                <AddIcon />
              </Fab>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </div>

      <TableContainer className="doctor-table" style={{ overflowX: 'scroll' }} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Doctor ID</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors === "" ? (<p>No record</p>) :
              (doctors.map((doctor) => (
                <TableRow hover onClick={() => { handleRowClick(doctor.doctorId) }} key={doctor.doctorId}>
                  <TableCell scope="row">
                    {doctor.doctorId}
                  </TableCell>
                  <TableCell scope="row">
                    {doctor.doctorName}
                  </TableCell>
                  <TableCell scope="row">
                    {doctor.gender}
                  </TableCell>
                  <TableCell scope="row">
                    {doctor.specialization}
                  </TableCell>
                  <TableCell scope="row">
                    {doctor.experience} years
                            </TableCell>
                  <TableCell scope="row">
                    {doctor.phoneNumber}
                  </TableCell>
                </TableRow>)
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

}


export default DoctorTable;