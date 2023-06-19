import React from "react";
import logo from '../images/Logo1.png';
import './style.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [userName, setName] =useState("");
    
    const [userErr,setErr]= useState("");
    const adduserName = (e) => {
        setName(e.target.value)
    }
    
    const handler =(e) =>{
        e.preventDefault();
        if(userName)
        {
            navigate(`/home/${userName}`);
        }
        else
        {
            const err ="Please enter the username!";
            setErr(err);         
        }
        
     
    }
    
      
    return(        
        <div className="d-flex justify-content-center mt-5 ">
            {/* logo */}
            <div className="mt-4 text-center">
                
                <form className="login  text-center" onSubmit={handler} >
                <img src={logo} alt="TNXT" width="250px" height="250px" />
                    {/* Title  */}
                    <h1 className="title">Login Account</h1>
        
                    {/* Username input  */}
                    <div className="form-outline mb-4">
                    <input type="text" id="form2Example1" className="form-control rounded-pill" placeholder="Enter Your UserName" onChange={adduserName} />
                    <span style={{color:'red'}}>{userErr}</span>
                    </div>
                
               
                              
                    {/* Submit button  */}
                    <button type="button" className="btn btn-danger btn-block py-1 px-5 rounded-pill mb-4" onClick={handler}>SUBMIT</button>
                
                        {/* Register link */}
                    <div className="text-center">
                        <Link to="https://twitter.com/i/flow/signup" target="_blank">Don't have an account?</Link>
                    </div>
                </form>
            </div>
            
        </div>
                   
    );
}

export default  Login;
