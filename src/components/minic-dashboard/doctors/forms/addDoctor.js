// React
import React from 'react';

// Local Imports
import './addDoctor.css';

// Material UI
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

const styles = {
  root: {
    background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  backgroundBlueGradient: {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  }
};



class AddDoctor extends React.Component {

  state = {
    doctor: {
      "address": "",
      "age": 0,
      "dob": "",
      "doctorDetails": "",
      "doctorName": "",
      "email": "",
      "experience": "",
      "gender": "",
      "phoneNumber": 0,
      "specialization": ""
    }
  }

  addDoctor = (event) => {
    console.log(this.state.credentials)
    fetch('http://localhost:8080/api/doctor/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.doctor),
    }).then
      (data => data.json())
      .then(
        data => {
          if (data) {
            window.location.replace('/doctor');
          };
        }
      ).catch(error => {
        console.error(error);
        if(error) {
          alert("Something went wrong!")
        }
      })
  }


  inputChanged = event => {
    const doc = this.state.doctor;
    doc[event.target.name] = event.target.value;
    this.setState({ doctor: doc })
  }

 

  render() {
    // decalre variables here
    const { classes } = this.props;
    return (
      <div>
      <div className="dr-appbar">
      <ul>
        <li>
         Add doctor
        </li>
        <li>
          <Tooltip title="back" aria-label="back">
            <Link to="/doctor"><Fab className={classes.backgroundBlueGradient}>
              <ArrowBack />
            </Fab>
            </Link>
          </Tooltip>
        </li>
      </ul>
    </div>
    
      <div className="doctor-form">
        <div>
          <Card>
            <div>
              <form noValidate autoComplete="off" >
                <div className="dr-form-inputs">
                  <TextField onChange={this.inputChanged} name="doctorName" className="dr-input" id="outlined-basic" label="Doctor Name" variant="outlined" required />
                  <TextField onChange={this.inputChanged} name="dob" className="dr-input" type="date" id="outlined-basic" label="Date of birth" variant="outlined" InputLabelProps={{ shrink: true, }} required />
                  <TextField onChange={this.inputChanged} name="specialization" className="dr-input" id="outlined-basic" label="Specialization" variant="outlined" required />
                  <TextField onChange={this.inputChanged} name="experience" className="dr-input" id="outlined-basic" label="Experience" variant="outlined" required />
                  <TextField onChange={this.inputChanged} type="number" name="age" className="dr-input" id="outlined-basic" label="Age" variant="outlined" required />
                  <TextField onChange={this.inputChanged} type="tel" pattern="\d+" name="phoneNumber" className="dr-input" id="outlined-basic" label="Phone" variant="outlined" required />
                  <TextField onChange={this.inputChanged} name="email" className="dr-input" id="outlined-basic" label="Email" variant="outlined" required />
                  <TextField onChange={this.inputChanged} name="gender" className="dr-input" id="outlined-basic" label="Gender" variant="outlined" />
                  <TextField onChange={this.inputChanged} name="doctorDetails" className="dr-input" id="outlined-basic" label="Doctor details" variant="outlined" required />
                  <TextField onChange={this.inputChanged} name="address" className="dr-input" id="outlined-basic" label="Address" variant="outlined" required />
                </div>
                <div className="submit-button">
                  <Button className={classes.root} onClick={this.addDoctor} type="button" variant="contained">Submit</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
      </div>
    );
  }

}

AddDoctor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddDoctor);