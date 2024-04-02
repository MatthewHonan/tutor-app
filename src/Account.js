import React, { useState } from "react";
import './Account.css';

const Account = () => {
  const [userProfile, setUserProfile] = useState({
    username: 'Manuela Rosica',
    description: 'Biomed student at Florida International University, looking for possible tutors!',
    profilePicture: 'https://s3.envato.com/files/389718125/IMG_2208.jpg', // Replace with the actual URL or path to the profile picture
  });

  const handleChangeDescription = (e) => {
    setUserProfile({ ...userProfile, description: e.target.value });
  };

  return (
    <div>
      <h1 className="header">Profile</h1> {/* New header */}
      <div className="AccountPage">
        {/* Left Section: User Information */}
        <div className="leftSection">
          <div className="profilePicture">
            <img src={userProfile.profilePicture} alt="Profile" />
          </div>
          <h3>{userProfile.username}</h3>
          <textarea
            value={userProfile.description}
            onChange={handleChangeDescription}
            rows={8}
            cols={40}
          />
        </div>

        {/* Right Section: Options */}
        <div className="rightSection">
          <h2>Options</h2>
          <ul className="optionList">
            {/* Option buttons */}
            <li>
              <button>Previous Sessions</button>
            </li>
            <li>
              <button>Payment Information</button>
            </li>
            <li>
              <button>Settings</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
