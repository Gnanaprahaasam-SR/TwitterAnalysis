import React, { useEffect, useState } from "react";
import './post.css';
import logo1 from '../images/logo.png';
import profile from '../images/profile.svg';
import { Link, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
const Post = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const { username } = useParams();

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
    if (userData.data) {
      getUserPosts();
    }
  }, [userData]);

  const getUserPosts = () => {
    fetch(`http://localhost:5000/userId/${userData.data.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserPosts(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="post">
      {/* nav bar */}
      <div className="bg-dark position-relative mb-3 ps-2">
        {/* company logo */}
        <img src={logo1} alt="TNXT" width="100px" height="50px" />

        {/* profile picture */}
        <div className="rounded-circle">
          <img
            src={userData?.data?.profile_image_url ? userData.data.profile_image_url : profile}
            alt="profile"
            width="50px"
            className="position-absolute rounded-circle me-2  top-0 end-0"
          />         
        </div>
      </div>

      {/* header */}
      <h1 className="text-center header">Tweets</h1>

      {/* back button */}
      <div className="d-flex justify-content-end px-3">
        <Link to={`/home/${username}`} className="btn btn-primary p-1 px-2  rounded-pill">
          Back to Home
        </Link>
      </div>

      {/* poster */}
      <div className="list">
        <div className="poster">
          {userPosts.data && userPosts.data.length > 0 ? (
            userPosts.data.map((post, index) => (
              <div className="d-flex justify-content-center mb-3" key={index}>
                <div className="card" style={{ width: "60%" }}>

                  {/* profile name and image */}
                  
                    <img
                      src={userData?.data?.profile_image_url ?(userData.data.profile_image_url):profile}
                      alt="profile"
                      width="35px"
                      className="position-absolute rounded-circle me-2 mt-2 top-0 end-0"
                    />
                  <h5 className="card-title m-2 id">{userData.data.name}</h5>
                  <div className="card-body">
                  <h6><b>{post.text}</b></h6>
                    {/* post image */}
                    {post.attachments?.media_keys?.length > 0 &&
                      post.attachments.media_keys.map((mediaKey) => {
                        const media = userPosts.includes?.media.find(
                          (m) => m.media_key === mediaKey
                        );
                        if (media?.type === "photo") {
                          return (
                            <img
                              key={media.media_key}
                              src={media.url}
                              className="card-img-top mb-2"
                              alt={`post${index}`}
                            />
                          );
                        }
                        return null;
                      })}
                    
                    <div className="row">
                      {/* timing */}
                      <div className="col-md-6 time">
                        <p className="card-text text-secondary">{post.created_at}</p>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        {/* post */}
                        <a href="#" className="btn btn-danger px-5 response">
                          Response Status
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularProgress />  </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;