import React from "react";
import {Card, CardContent,Typography} from '@mui/material';

function Task(props){
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography className='nombre' component = "h2">  {props.name}
                </Typography>
                <Typography className='descripcion' component = "h3">  {props.description}
                </Typography>
                <Typography className='fecha' component = "h3">   dueDate: {props.dueDate}
                </Typography>
                <Typography className='status' component = "h3">   {props.status}
                </Typography>
                b = ""
                b = 7
                
            </CardContent>
        </Card>

    )

};