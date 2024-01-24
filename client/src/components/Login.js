import React, {useState} from "react"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"


function Login(props) {
    let setLoggedStatus = props.setLoggedStatus;
    let setUserName = props.setUsername;
    const [smallPassword, setSmallPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    
    async function submit(e){
        e.preventDefault();
        try{
            if(password.length<8) setSmallPassword(true);
            else{
                setSmallPassword(false);  
                await axios.post("http://localhost:8000/login",{username, password})
                .then((res)=>{
                    let msg1  = res.data.msg;
                    setIsError(res.data.isError);
                    setMsg(msg1) ; 
                    if(msg1==="User Found"){
                        setLoggedStatus(true);
                        setUserName(res.data.username)
                        navigate('/myprofile');
                    }
                })
                .catch((e)=>{
                    console.log(e);
                })
            } 
        }
        catch(e){
            console.log(e);
            setIsError(true);
            setMsg("Couldn't connect to the server. Please try again!") ; 
        }
    }

    return ( 
        <div className="login_signup">
            <div>
            <h1>Login</h1>
            <form action="POST" onSubmit={submit}>
                <div className="name_pass">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Username" onChange={(e)=> {setUsername(e.target.value); setMsg("")}} required />
                </div>
                <div className="name_pass">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value); setMsg("")}} minLength="8"  required />
                </div>
                {isError ? <p id="errorMsg">{msg}</p> : <p id="successMsg">{msg}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account ? <Link to="/signup">Signup</Link></p>
            

            </div>
        </div>
     );
}
 
export default Login;