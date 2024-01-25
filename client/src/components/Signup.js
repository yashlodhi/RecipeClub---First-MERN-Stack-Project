import React, {useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"


function Signup() {

    const [smallPassword, setSmallPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')
    const [isError, setIsError] = useState(false);

    async function submit(e){
        e.preventDefault();
        try{
            if(password.length<8) setSmallPassword(true);
            else{
                setSmallPassword(false);  
                await axios.post("https://recipeclub-backend.onrender.com/signup",{username, password})
                .then((res)=>{
                    let msg1  = res.data.msg;
                    setIsError(res.data.isError);
                    setMsg(msg1) ; 
                })
                .catch((e)=>{
                    console.log(e);
                    setIsError(true);
                    setMsg("Couldn't connect to the server. Please try again!") ; 
                    
                })
            } 
        }
        catch(e){
            console.log(e);
        }
    }

    return ( 
        <div className="login_signup">
            <div>
            <h1>Sign Up</h1>
            <form action="POST" onSubmit={submit}>
                <div className="name_pass">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Username" onChange={(e)=> {setUsername(e.target.value);setSmallPassword(false)}} required />
                {isError ? <p id="errorMsg">{msg}</p> : <p id="successMsg">{msg} </p>}
                </div>
                <div className="name_pass">
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder="Password" onChange={(e)=>{ setPassword(e.target.value);setSmallPassword(false)}}  required />
                {smallPassword ? <p id="errorMsg">Password's length should be atleast equal to 8.</p> : <></>}
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account ? <Link to="/login">Login</Link></p>
            

            </div>
        </div>
     );
}
 
export default Signup;
