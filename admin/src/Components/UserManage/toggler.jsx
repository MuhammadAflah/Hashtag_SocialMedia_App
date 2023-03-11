import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Toggler(props) {
    
    const [checked, setChecked] = useState(props.userId.isBlocked);
    console.log(checked);
    const handleToggle = async () => {
        console.log("handleToggle worked");
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admin/blockUser/${props.userId._id}`, { checked });
            

            setChecked(response.data.isBlocked);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <> {checked ? (
            <CheckCircleIcon sx={{ color: "red" }} />
        ) : (
            <CheckCircleIcon sx={{ color: "green" }} />
        )}
            <Button onClick={handleToggle} variant="outlined">{checked ? "Unblock" : "Block "}</Button>
        </>
    );
}


export default Toggler
