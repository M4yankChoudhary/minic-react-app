import React from 'react';
import { withCookies } from 'react-cookie';

// Material UI
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// Local Imports
import './addDoctor.css';


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
  };


  
class AddDoctor extends React.Component {

    constructor(props) {
        super(props);
    }

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

      addDoctor = event => {
        console.log(this.state.credentials)
        fetch('http://localhost:8080/api/doctor/save', {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.doctor),
        }).then
        (data =>  data.json())
        .then(
          data => {
            // if(data.doctorName) {
            //     alert("Data Added successfully!")
            // };
            console.log(data)
          }
        ).catch(error => {
          console.error(error);
        })
      }
      
      inputChanged = event => {
        const doc = this.state.doctor;
        doc[event.target.name] = event.target.value;
        this.setState({doctor: doc})
      }

      


    render() {
        // decalre variables here
        const { classes } = this.props;
        return (
            <div className="doctor-form">
            <div>
                <Card>
                    {/* <h1>Add doctor</h1> */}
                    {/* <Divider/>   */}
                    <div >
                        <form noValidate autoComplete="off">
                            <div className="dr-form-inputs">
                            <TextField onChange={this.inputChanged} name="doctorName" className="dr-input" id="outlined-basic" label="Doctor Name" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="dob" className="dr-input" type="date" id="outlined-basic" label="Date of birth" variant="outlined" InputLabelProps={{shrink: true,}} />
                            <TextField onChange={this.inputChanged} name="specialization" className="dr-input" id="outlined-basic" label="Specialization" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="experience" className="dr-input" id="outlined-basic" label="Experience" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="age" className="dr-input" id="outlined-basic" label="Age" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="phoneNumber" className="dr-input" id="outlined-basic" label="Phone" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="email" className="dr-input" id="outlined-basic" label="Email" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="gender" className="dr-input" id="outlined-basic" label="Gender" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="doctorDetails" className="dr-input" id="outlined-basic" label="Doctor details" variant="outlined" />
                            <TextField onChange={this.inputChanged} name="address" className="dr-input" id="outlined-basic" label="Address" variant="outlined" />
                            </div>
                            <div className="submit-button">
                            <Button className={classes.root} onClick={this.addDoctor} type="button" variant="contained">
                                Submit
                            </Button>
                            </div>
                        </form>
                        
                    </div>
                </Card>
            </div>
        </div>
        );
    }

}

AddDoctor.propTypes = {
    classes: PropTypes.object.isRequired,
  };  

export default withStyles(styles)(AddDoctor);