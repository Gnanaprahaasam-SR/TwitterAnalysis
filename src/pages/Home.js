import React, { useEffect, useState } from "react";
import emoj from '../images/Emoji.gif';
import profile from '../images/profile.svg';
import logo1 from '../images/logo.png';
import './style.css';
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {
    const {username} =useParams();
    console.log(username);        
    const[userData,setUserData]=useState({});        

    const pro_image = userData?.data?.profile_image_url? (userData.data.profile_image_url) :profile;
    const UserName = userData?.data?.username? ("@"+userData.data.username):"@username";
    const Name = userData?.data?.name? (userData.data.name) : "Name";
    const totalTweets = 67;

    useEffect(()=>{
        getUserData();
    },[]);
    const getUserData = () => {
        fetch(`http://localhost:5000/username/${username}`)
        .then((res) => res.json())
        .then((data)=>{
            console.log(data);
            setUserData(data);
        })
    };

    const navigate = useNavigate();
    const handleLogout = (e) =>{
        e.preventDefault();
        navigate("/..");
    }

    const formatNumber = (num) => {
        if (num === undefined) {
            return "";
        }
        
        if (num >= 1000) {
            // Divide the number by 1000 and round to one decimal place
            const formattedNum = (num / 1000).toFixed(1) + 'k';
            return formattedNum;
        }
        
        return (num.toString());
    }
    
        
        
    return(        
        <div className="home">
            {/* <!-- nav bar --> */}
            <div className="bg-dark position-relative ps-2 mb-5">

                {/* <!-- company logo --> */}
                <img src={logo1} alt="TNXT" width="100px" height="50px"  />

                {/* <!-- profile picture --> */}
                <div className="rounded-circle">
                <img
                    src={userData?.data?.profile_image_url ?(userData.data.profile_image_url):profile}
                    alt="profile"
                    width="50px"
                    height="50px"
                    className="position-absolute rounded-circle me-2  top-0 end-0"
                />                
                </div>
            </div>
            <div className="container mb-3">
                <div className="row ">
                    
                    {/* <!-- left side content --> */}
                    <div className="col-md-6 mt-5 text-center ">
                        <h1 className="title mb-4  flex-md-wrap">TWITTER</h1>
                        <h3 className="msg mb-4">Twitter Master Report</h3>
                        <p className="description mb-4">Unleashing the power of Sentiment Analysis</p>
                        <div className="d-flex justify-content-evenly">
                            <img src={emoj} alt="emoj" width="250px"/>                            
                        </div>
                    </div>

                    {/* <!-- right side content --> */}
                    <div className="col-md-6  my-5 text-center ">
                        <div className="row ">
                            <div className="col-md-6  mt-4">
                                <div className="d-flex gap-4 flex-column">
                                    <div className="profilecounts">
                                        <div className="p-2 d-flex flex-wrap align-items-center justify-content-evenly">
                                            <h5 className="text-secondary">Total Post</h5>
                                            <h3 style={{color: "#00ACEE"}}>{formatNumber(56)}</h3>
                                        </div>
                                    </div>
                                    <div className="profilecounts">
                                        <div className=" p-2 d-flex  align-items-center justify-content-evenly">
                                            <h5 className="text-secondary">Followers</h5>
                                            <h3 style={{color: "#00ACEE"}}>{formatNumber(4666656)}</h3>
                                        </div>
                                    </div>
                                    <div className="profilecounts">
                                        <div className="p-2 d-flex flex-wrap align-items-center justify-content-evenly">
                                            <h5 className="text-secondary">Following</h5>
                                            <h3 style={{color: "#00ACEE"}}>{formatNumber(7756)}</h3>
                                        </div>
                                    </div>                            
                                </div>

                            </div>
                            <div className="col-md-6 my-4  shadow rounded">
                                <div className="d-flex flex-column align-items-center justify-content-evenly m-3">
                                    <img
                                        src={userData?.data?.profile_image_url ?(userData.data.profile_image_url):profile}
                                        alt="profile"
                                        width="100px"
                                        height="100px"
                                        className="rounded-circle"
                                    />
                                    <label className="h5 text-secondary mt-2">{Name}</label>
                                    <label className="h6 text-secondary">{UserName}</label>
                                    <button onClick={handleLogout} className="btn btn-primary rounded-pill py-1">Sign out</button>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>

            {/* <!-- post analysis button --> */}
            <div className="text-center mb-2 ">
            <Link to={`/post/${username}`} style={{textDecoration:"none"}}><button type="button" className="btn btn-warning p-1 px-5 rounded-pill text-white" data-bs-toggle="tooltip" data-bs-placement="bottom" title="move to post page" >Post Analysis</button></Link>
            </div>
        
        </div>
    );

}

export default Home;