import React, {useState, useEffect } from 'react';
import {Grid, Paper, Card, CardContent,Typography} from '@mui/material'

function PaginaInicio() {

    const [tasks, settasks] = useState(null);
    ;

    useEffect(() => {
        if (tasks === null) getTasks(); 
      });
    


    function getTasks() {
        fetch("http://localhost:8081/api/task", {
          method: "GET",
          headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        })
          .then((response) => response.json())
          .then((datas) => {
            settasks(datas);
          });
      }
  
    return (
        <Grid id = "gridid2" align='center'>
            <Paper elevation={10} id = "paperid2">
                <h1>Autorizado y entro</h1>

                <Typography component="h1" variant="h5">
                    Tasks
                </Typography>
                <p>

                    <div>
                        <Typography component="h2">
                            Tarea1
                        </Typography>
                        <Typography component="h3">
                            primera tarea
                        </Typography>
                        <Typography component="h3">
                            dueDate: 2021-12-24
                        </Typography>
                        <Typography component="h3">
                            TODO
                        </Typography>
                    </div>

                    <div>
                        <Typography component="h2">
                            Tarea2
                        </Typography>
                        <Typography component="h3">
                            segunda tarea
                        </Typography>
                        <Typography component="h3">
                            dueDate: 2021-12-24
                        </Typography>
                        <Typography component="h3">
                            TODO
                        </Typography>
                    </div>

                    <div>
                        <Typography component="h2">
                            Tarea3
                        </Typography>
                        <Typography component="h3">
                            tercera tarea
                        </Typography>
                        <Typography component="h3">
                            dueDate: 2021-12-24
                        </Typography>
                        <Typography component="h3">
                            TODO
                        </Typography>
                    </div>

                    <div>
                        <Typography component="h2">
                            Tarea4
                        </Typography>
                        <Typography component="h3">
                            cuarta tarea
                        </Typography>
                        <Typography component="h3">
                            dueDate: 2021-12-24
                        </Typography>
                        <Typography component="h3">
                            TODO
                        </Typography>
                    </div>

                </p>
                <button>
                        New task
                </button>
            </Paper>

        </Grid>
    );
  };

  const fetchData = () => {
    
    return fetch("http://localhost:8081/api/task")
          .then((response) => response.json())
          .then((data) => console.log(data));}


    

export default PaginaInicio;