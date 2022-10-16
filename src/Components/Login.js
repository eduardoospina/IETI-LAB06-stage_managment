import React, {useEffect, useState} from 'react';
import {Avatar, Grid, Paper, TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import '../Login.css';
import '../button2.css';
import '../Button1.css';


function Login () {

    const navigate = useNavigate();
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState({auth : false});
    const [error, setError] = useState({error : false});

    const [submit, setSubmit] = useState({submit : false});
    const url = 'http://localhost:8080/api/auth';

    

    const entro = () =>{
        setAuth({auth : true});
        console.log('autorizado')
        navigate('/paginainicio')
    }

    useEffect(() =>{
        const request = {'url': url, body:{"email":mail,"password":password}}
        try {
            if (submit.submit){ 
                console.log(request)
                FetchPOST(request).then(res => (res.data.hasOwnProperty('token') ? entro(): setError({error:true})));
            }
        } catch(e){
            console.log(e);
            setError(true);
        }

    },[submit]);

    return (
        <div id = "backgroundid">
            <Grid id = "gridid" align='center'>
                <Paper elevation={10} id = "paperid">
                    <Avatar id = "avatarid">Eci Task</Avatar>
                        <p>
                            <h2 id = "h2id">Log in</h2>
                        </p>

                    <p>
                        <TextField 
                        id = "emailid" 
                        label = "Email" 
                        placeholder = "Enter your Email" 
                        value={mail} 
                        onChange={(e) => {setMail(e.target.value);}}/>
                    </p>

                    <p>
                        <TextField 
                        id = "passwordid" 
                        label = "password" 
                        value={password}  
                        placeholder = "Enter your password" 
                        type = "password"
                        onChange={(e) => {setPassword(e.target.value)}}/>
                    </p>

                    <p>
                        <button 
                        className="myButton myButton" >
                        Sign Up
                        </button>

                        <button
                        className="button button1" 
                        onClick={ () => {
                        setSubmit({submit : true})}} >
                        Log in
                        </button>
                    </p>

                </Paper>
            </Grid>
        </div>
    )
}

let FetchPOST = async (requestParams) => {
    try {
        var error = ''
        const url = requestParams.url;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify(requestParams.body)
        };

        var res = await fetch (url, requestOptions);
        var data = await res.json(); 
    } catch(e){
        error = e.message;
    }
    return {res,data,error}
}

export default Login;