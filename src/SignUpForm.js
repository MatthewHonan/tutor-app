import React, { useState } from 'react';
import './SignUpForm.css';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [educationLevel, setEducationLevel] = useState('undergrad');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      userType: userType,
      city: city,
      state: state,
      university: university,
      fieldOfStudy: major,
      levelOfEducation: educationLevel,
      profileDescription: description,

    };
    const postUserData = async (url = "", data = {}) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    };
    console.log(user);
    setSuccessMessage("Account created successfully!");
    
    postUserData("http://localhost:8080/signup", user)
      .then((data) => {
      navigate("/", { state: { successMessage: "Account created successfully!" } });
      console.log("Success:", data);
      })
      .catch((error) => console.error("Error:", error));   
  };

  return (
    <div className="SignUpForm">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </label>
        <br />
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br />
        <label>
          University:
          <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} />
        </label>
        <br />
        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        <br />
        <label>
          Major:
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
        </label>
        <br />
        <label>
          Education Level:
          <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)}>
            <option value="undergrad">Undergraduate</option>
            <option value="postgrad">Postgraduate</option>
            
          </select>
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
