import { useParams, useLocation } from "react-router-dom";
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

// Import Images
import MaleDoctor from './images/male-doctor.png';
import FemaleDoctor from './images/female-doctor.png';

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
  backgroundBlueGradient: {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  }
});

const DoctorDetails = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const classes = useStyles();
  let { id } = useParams();

  useEffect(() => {
    const getDoctor = async () => {
      // setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/doctor/${id}`);
      const data = await response.json()
      setDoctors([data]);
      // setIsLoading(false);
    };
    getDoctor();

  }, [id]);



  return (
    <div>
      <div className="dr-appbar">
        <ul>
          <li>
            Details
        </li>
          <li>
            <Tooltip title="back" aria-label="back">
              <Link to="/doctor"><Fab className={classes.backgroundBlueGradient}>
                <ArrowBackIcon />
              </Fab>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </div>

      {/* {alert(JSON.stringify(doctors[0].doctorName))} */}

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
                <TableRow key={doctor.doctorId}>
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
  )

}

export default DoctorDetails;