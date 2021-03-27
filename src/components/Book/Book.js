import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
       checkIn: new Date(),
       checkOut: new Date(),
        
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkIn = date;
        setSelectedDate(newDate)
    };

    
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOut = date;
        setSelectedDate(newDate)
    };

    const handleBooking=()=>{
         const newBooking = {...loggedInUser,...selectedDate}
         fetch("http://localhost:5000/addBooking",{
             method:"POST",
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify(newBooking)
         })
         .then(res =>res.json)
         .then(data=>{
             console.log(data);
         })
    }
    const { bedType } = useParams();
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> Hellow {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="CheckIn Date "
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label=" CheckOut Date "
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    {/* <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    /> */}
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>

        </div>
    );
};

export default Book;