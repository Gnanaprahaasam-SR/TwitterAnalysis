import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import logo1 from '../images/logo.png';
import { Autorenew, BorderColor, Comment, Favorite, Visibility } from "@mui/icons-material";
import './style.css';
import profile from '../images/profile.svg';
import { options } from "../components/BarChat";
import { Bar } from 'react-chartjs-2';
const DashBoard = () => {
    const [tweetData, setTweetData] = useState({});
    const { tweetId, username } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        fetch(`http://localhost:5000/username/${username}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (tweetId) {
            getTweetData();
        }
    }, [tweetId]);

    const getTweetData = () => {
        fetch(`http://localhost:5000/tweetInfo/${tweetId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);

                setTweetData(data);

            })
            .catch((error) => console.log(error));
    };

    const labels = ['Likes', 'Comments', 'Retweet', 'views'];
    const likeCount=(tweetData?.data?.[0]?.public_metrics?. like_count?(tweetData.data[0].public_metrics.like_count): 0);
    const replyCount=(tweetData?.data?.[0]?.public_metrics?.reply_count?(tweetData.data[0].public_metrics.reply_count) : 0);
    const impressionCount=(tweetData?.data?.[0]?.public_metrics?.impression_count? (tweetData.data[0].public_metrics.impression_count) : 0 );
    const retweetCount=(tweetData?.data?.[0]?.public_metrics?.retweet_count? (tweetData.data[0].public_metrics.retweet_count) : 0);

    const  data = {
      labels,
      datasets: [
        {
          label: 'response-Status',
          data: [likeCount, replyCount, retweetCount, impressionCount], 
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    };
    console.log("tweetData:", tweetData);
    //   console.log("tweetData.public_metrics:", tweetData.data[0].public_metrics);

    return (
        <div className="home">
            {/* nav bar */}
            <div className="container-fluid ps-2 bg-dark position-relative mb-3">
                {/* company logo */}
                <img src={logo1} alt="TNXT" width="80px" height="60px" />

                {/* profile picture */}
                <div className="rounded-circle">
                <img
                    src={userData?.data?.profile_image_url ?(userData.data.profile_image_url):profile}
                    alt="profile"
                    width="45px"
                    height="45px"
                    className="position-absolute rounded-circle me-2 mt-2 top-0 end-0"
                />
                    
                </div>
            </div>

            {/* header */}
           

            {/* back button */}
            <div className="d-flex justify-content-end my-2 px-5">
                <Link to={`/post/${username}`} className="btn btn-primary p-1 px-3 rounded-pill">
                    Back to Tweets
                </Link>
            </div>

            <div className="m-3">
                <div className="d-flex flex-wrap row">
                    <div className="col-md-4">
                        <div className="d-flex flex-wrap text-center row mb-2 " style={{height:"48%"}}>
                            <div
                                className="col shadow-sm rounded me-1 py-5"
                                style={{
                                    backgroundColor:'#F8AD22',
                                    width: 'fit-content',
                                    color:'white'

                                }}
                            >
                                <Favorite className="text-white display-6" />

                                
                                {tweetData?.data?.[0]?.public_metrics?.like_count !== undefined ? (
                                    <p className="display-6 mt-2">{tweetData.data[0].public_metrics.like_count}</p>
                                ) : (
                                    <p>Not Found</p>
                                )}
                                <h5><b>Likes</b></h5>
                            </div>
                            <div
                                className="col shadow-sm rounded text-center py-5"
                                style={{
                                    backgroundColor:'#F48731',
                                    width: 'fit-content',
                                    color:'white'

                                }}
                            >
                                <Comment className="text-white"/>
                                
                                {tweetData?.data?.[0]?.public_metrics?.reply_count !== undefined ? (
                                    <p className="display-6 mt-2">{tweetData.data[0].public_metrics.reply_count}</p>
                                ) : (
                                    <p>Not Found</p>
                                )}
                                <h5><b>Comments</b></h5>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap text-center row mb-2" style={{height:"48%"}}>
                            <div
                                className="col shadow-sm rounded me-1 py-5"
                                style={{
                                    backgroundColor:'#72C88F',
                                    width: 'fit-content',
                                    color:'white'
                                }}
                            >
                                <Autorenew className="text-white" />                               
                                 {tweetData?.data?.[0]?.public_metrics?.retweet_count !== undefined ? (
                                    <p className="display-6 mt-2">{tweetData.data[0].public_metrics.retweet_count}</p>
                                ) : (
                                    <p>Not Found</p>
                                )} 
                                
                                 <h5><b>Retweet</b></h5>
                            </div>
                            <div
                                className="col shadow-sm rounded text-center py-5"
                                style={{
                                    backgroundColor:'#25ADB7',
                                    width: 'fit-content',
                                    color:'white'
                                }}
                            >
                               <Visibility className="text-white" />
                             
                                {tweetData?.data?.[0]?.public_metrics?.impression_count !== undefined ? (
                                    <p className="display-6 mt-2">{tweetData.data[0].public_metrics.impression_count}</p>
                                ) : (
                                    <p>Not Found</p>
                                )} 
                                   <h5><b>Views</b></h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 mb-2">
                        <div className="shadow p-1 rounded">
                        <Bar options={options} data={data} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
