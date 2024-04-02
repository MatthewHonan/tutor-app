import React, { useState } from 'react';
import './StudentHome.css';
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: 'Maria Gomez',
      distance: '3.8mi.',
      rating: '3.9/5',
      subject: 'Calculus 2',
      availability: 'Mon 2:00 PM - 4:00 PM',
      profilePicture: 'https://www.wealthspire.com/wp-content/uploads/2019/10/Lutchman-Sacha_Web.jpg.webp', // Replace with the actual URL or path to Tutor A's profile picture
    },
    {
      id: 2,
      name: 'Hector Suarez',
      distance: '5.6mi.',
      rating: '4.3/5',
      subject: 'Organic Chemistry',
      availability: 'Tue 10:00 AM - 12:00 PM',
      profilePicture: 'https://chemistry.stanford.edu/sites/chemistry/files/styles/hs_medium_scaled_360px/public/events/leibfarth_headshot_0.jpg.webp?itok=vWW1AzKn', // Replace with the actual URL or path to Tutor B's profile picture
    },
    {
      id: 3,
      name: 'Timothy Wu',
      distance: '2.4mi.',
      rating: '4.4/5',
      subject: 'Programming 2',
      availability: 'Mon 10:00 AM - 12:00 PM',
      profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Professor_Steven_Chu_ForMemRS_headshot.jpg', // Replace with the actual URL or path to Tutor A's profile picture
    },
    // Add more tutor objects as needed
  ]);

  const navigate = useNavigate();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleScheduleSession = (tutor) => {
    setSelectedTutor(tutor);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleAccountButton = () => {
    navigate("/account");
  };

  return (
    <div className="StudentHome">
      <h1>Welcome to Student Home</h1>
      <div className="tutorList">
        <h2>Available Tutors</h2>
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor.id}>
              <div className="tutorProfilePicture">
                <img src={tutor.profilePicture} alt={`Profile of ${tutor.name}`} />
              </div>
              <div className="tutorInfo">
                <p>{tutor.distance} - {tutor.name} - {tutor.subject} - Rating: {tutor.rating}</p>
                <p>{tutor.availability}</p>
              </div>
              <button onClick={() => handleScheduleSession(tutor)}>Schedule Session</button>
            </li>
          ))}
        </ul>
      </div>
      {showSuccessMessage && (
        <div className="successMessage">
          Tutoring session with {selectedTutor?.name} has been scheduled successfully!
        </div>
      )}
      <button className="accountButton" onClick={handleAccountButton}>View Account Info</button>
    </div>
  );
};

export default StudentHome;
