import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useEffect } from "react";
import "./styles.css";
import { useContext } from "react";
import { SignupContext } from "./SignupContext";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="logo"></div>
      <button className="btn sign-up" onClick={() => navigate("/signup-email")}>
        Sign Up
      </button>
      <button className="btn log-in" onClick={() => navigate("/login")}>
        Log In
      </button>
      <p className="terms">
        By continuing, you agree to Health Horizon’s Privacy Policy and Terms of Service
      </p>
      <div className="footer"></div>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log in</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="input-container">
        <label className="input-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login-button" onClick={handleLogin}>
        Log in
      </button>

      <p className="forgot-password">Forgot password?</p>
    </div>
  );
};

const SignupEmail = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  // Initialize email from context if it exists, else use empty string
  const [email, setEmail] = useState(signupData.email || "");

  const handleNext = () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    // Update the global signup context with the email value
    updateSignupData({ email });
    navigate("/signup-name");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">Let’s create your account</div>
      <label className="email-label" htmlFor="email-input">
        Enter your email
      </label>
      <input
        type="email"
        id="email-input"
        className="email-input"
        placeholder=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupName = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  // Initialize name from context if available
  const [name, setName] = useState(signupData.name || "");

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    // Update the global context with the name value
    updateSignupData({ name });
    navigate("/signup-password");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-email")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">How should we call you?</div>
      <label className="email-label" htmlFor="name-input">
        Enter your name
      </label>
      <input
        type="text"
        id="name-input"
        className="email-input"
        placeholder=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>
        Next
      </div>
      <div className="footer"></div>
    </div>
  );
};


const SignupPassword = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  // Initialize password from context if available
  const [password, setPassword] = useState(signupData.password || "");

  const handleNext = () => {
    if (!password.trim()) {
      alert("Please enter a password");
      return;
    }
    // Update the global context with the password value
    updateSignupData({ password });
    navigate("/signup-gender");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-name")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">Choose a strong password</div>
      <label className="email-label" htmlFor="password-input">
        Your password
      </label>
      <input
        type="password"
        id="password-input"
        className="email-input"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>
        Next
      </div>
      <div className="footer"></div>
    </div>
  );
};

const SignupGender = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  // Initialize gender from context if available
  const [gender, setGender] = useState(signupData.gender || "");

  const handleNext = () => {
    if (gender) {
      // Update the global context with the selected gender
      updateSignupData({ gender });
      navigate("/signup-age");
    } else {
      alert("Please select your gender");
    }
  };

  return (
    <div className="gender-container">
      <div className="back-arrow" onClick={() => navigate("/signup-password")}>
        <div className="vector"></div>
      </div>
      <p className="gender-title">What’s your biological gender?</p>
      {/* Box for Male */}
      <div
        className={`gender-box male-box ${gender === "male" ? "selected" : ""}`}
        onClick={() => setGender("male")}
      >
        <p className="male-text">Male</p>
      </div>
      {/* Box for Female */}
      <div
        className={`gender-box female-box ${gender === "female" ? "selected" : ""}`}
        onClick={() => setGender("female")}
      >
        <p className="female-text">Female</p>
      </div>
      {/* Next Button */}
      <div className="gender-next-btn" onClick={handleNext}></div>
      <p className="gender-next-text" onClick={handleNext}>Next</p>
    </div>
  );
};


const SignupAge = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  // Initialize age from context if available
  const [age, setAge] = useState(signupData.age || "");

  const handleNext = () => {
    if (!age) {
      alert("Please select your age");
      return;
    }
    // Update the global context with the selected age
    updateSignupData({ age });
    navigate("/signup-measurements");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-gender")}>
        <div className="vector"></div>
      </div>
      <div className="age-title">What’s your age?</div>
      <label className="age-label" htmlFor="age-select">Select in years</label>
      <select
        id="age-select"
        className="age-select"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      >
        <option value="" disabled>Select Age</option>
        {Array.from({ length: 76 }, (_, i) => {
          const ageValue = i + 5;
          return <option key={ageValue} value={ageValue}>{ageValue}</option>;
        })}
      </select>
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupMeasurements = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);

  // Initialize state from context if available
  const [heightFt, setHeightFt] = useState(signupData.heightFt || "");
  const [heightInch, setHeightInch] = useState(signupData.heightInch || "");
  const [weight, setWeight] = useState(signupData.weight || "");

  const handleNext = () => {
    if (!heightFt.trim() || !heightInch.trim() || !weight.trim()) {
      alert("Please fill in all measurement fields");
      return;
    }
    if (isNaN(heightFt) || isNaN(heightInch) || isNaN(weight)) {
      alert("Please enter valid numeric values");
      return;
    }
    
    // Save data to context
    updateSignupData({ heightFt, heightInch, weight });
    
    navigate("/signup-goal");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-age")}>
        <div className="vector"></div>
      </div>
      <p className="measurement-height-title">How tall are you?</p>
      <input
        type="text"
        id="height-ft"
        className="height-input-left"
        placeholder="Feet"
        value={heightFt}
        onChange={(e) => setHeightFt(e.target.value)}
      />
      <input
        type="text"
        id="height-inch"
        className="height-input-right"
        placeholder="Inches"
        value={heightInch}
        onChange={(e) => setHeightInch(e.target.value)}
      />
      <div className="ft-text measurement-ft-text">Ft</div>
      <div className="inch-text measurement-inch-text">Inch</div>
      
      <p className="measurement-weight-title">What’s your current weight?</p>
      <input
        type="text"
        id="weight-input"
        className="weight-input"
        placeholder="KG"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <div className="kg-text measurement-kg-text">KG</div>

      <div className="next-btn-measure" onClick={handleNext}></div>
      <div className="next-text-measure" onClick={handleNext}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupGoal = () => {
  const navigate = useNavigate();
  const { signupData, updateSignupData } = useContext(SignupContext);
  const [goal, setGoal] = useState("");

  const handleNext = async () => {
    if (!goal) {
      alert("Please select a goal");
      return;
    }
    // Update the context with the selected goal
    updateSignupData({ goal });

    // Prepare final signup data, merging with previous steps
    const finalSignupData = { ...signupData, goal };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalSignupData),
      });
      const result = await response.json();
      if (response.ok) {
        // Signup successful; navigate to the dashboard or next step
        navigate("/dashboard");
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup");
    }
  };

  return (
    <div className="signup-goal-screen">
      {/* Back Button */}
      <div className="back-arrow" onClick={() => navigate("/signup-measurements")}>
        <div className="vector"></div>
      </div>
      <h1 className="goal-title">What’s your goal?</h1>
      {/* Option for Lose Weight */}
      <div
        className={`goal-box lose-box ${goal === "lose" ? "selected" : ""}`}
        onClick={() => setGoal("lose")}
      >
        <p className="lose-text">Lose weight</p>
      </div>
      {/* Option for Gain Weight */}
      <div
        className={`goal-box gain-box ${goal === "gain" ? "selected" : ""}`}
        onClick={() => setGoal("gain")}
      >
        <p className="gain-text">Gain weight</p>
      </div>
      {/* Next Button */}
      <div className="goal-next-btn" onClick={handleNext}></div>
      <p className="goal-next-text" onClick={handleNext}>Next</p>
    </div>
  );
};

// A component to compute and render the 7 day circles dynamically.
const WeekDays = () => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    // Get current day index (0=Sunday, 1=Monday, etc.)
    const currentDay = today.getDay();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date();
      // Adjust so that the week starts on Sunday
      dayDate.setDate(today.getDate() - currentDay + i);
      // Get short weekday name (we only need the first letter)
      const dayLetter = dayDate.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
      const dayNumber = dayDate.getDate();
      days.push({ dayLetter, dayNumber });
    }
    setWeekDays(days);
  }, []);

  return (
    <>
      {weekDays.map((day, index) => (
        <React.Fragment key={index}>
          {/* Each element uses a class with an index (e.g., day-circle-1, day-label-1, day-number-1) */}
          <div className={`day-circle-${index + 1}`}></div>
          <div className={`day-label-${index + 1}`}>{day.dayLetter}</div>
          <div className={`day-number-${index + 1}`}>{day.dayNumber}</div>
        </React.Fragment>
      ))}
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateString, setDateString] = useState("");
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    const today = new Date();
    
    // Set the main date title
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const ordinal = getOrdinal(day);
    setDateString(`${weekday}, ${day}${ordinal} ${month}`);

    // Generate days for the current week
    const generateWeekDays = () => {
      const week = [];
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        
        week.push({
          name: date.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue, etc.
          number: date.getDate(), // 1, 2, 3, ...
          isToday: date.toDateString() === today.toDateString(), // Check if it's today
        });
      }
      return week;
    };

    setWeekDays(generateWeekDays());
  }, []);

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Main Date Title */}
      <div className="dashboard-date-title">{dateString}</div>
      
      {/* Profile Icon */}
      <img
        className="profile-icon"
        src="/profile.png"
        alt="Profile"
        onClick={() => navigate("/Profile")}
        style={{ cursor: "pointer" }}
      />

      {/* Dynamic Day Circles */}
      <div className="week-days-container">
        {weekDays.map((day, index) => (
          <div key={index} className={`day-circle ${day.isToday ? "active" : ""}`}>
            <div className="day-name">{day.name}</div>
            <div className="day-number">{day.number}</div>
          </div>
        ))}
      </div>

      {/* Calorie Ring */}
      <div className="calorie-ring"></div>
      
      {/* Macro Labels */}
      <div className="macros-label-carbs">Carbs</div>
      <div className="macros-label-protein">Protein</div>
      <div className="macros-label-fat">Fat</div>
      
      {/* Macro Circles and Text */}
      <div className="macro-circle-1"></div>
      <div className="macro-text-1">0 g</div>
      <div className="macro-circle-2"></div>
      <div className="macro-text-2">0 g</div>
      <div className="macro-circle-3"></div>
      <div className="macro-text-3">0 g</div>
      
      {/* Calorie Tracking (Streak) */}
      <div className="calorie-streak-box"></div>
      <div className="calorie-tracking-label">Calorie tracking</div>
      <div className="calorie-streak-text">Streak</div>
      <div className="streak-number">90</div>
      <div className="streak-days">Days</div>

      {/* Bottom Navigation */}
      <div className="nav-container">
        <div className="nav-bar">
          <div className="nav-item" onClick={() => navigate("/dashboard")}>
            <div className="nav-icon summary-icon"></div>
            <div className="nav-label">Summary</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/record")}>
            <div className="nav-icon record-icon"></div>
            <div className="nav-label">Record</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/recipe")}>
            <div className="nav-icon recipe-icon"></div>
            <div className="nav-label">Recipe</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/plan")}>
            <div className="nav-icon plan-icon"></div>
            <div className="nav-label">Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      {/* Back Button */}
      <div className="back-arrow" onClick={() => navigate("/dashboard")}>
        <div className="vector"></div>
      </div>

      {/* Profile Heading */}
      <h1 className="profile-title">Profile</h1>

      {/* Profile Image */}
      <div className="profile-image">
        <img src="/profile.png" alt="User Profile" />
      </div>

      {/* User Information */}
      <h2 className="user-name">John Doe</h2>
      <div className="user-details">
        <span>19 years</span> <span>170 cm</span> <span>55 kg</span>
      </div>

      {/* Edit Profile */}
      <p className="edit-profile">Edit profile</p>

      {/* Streak Card */}
      <div className="streak-card">
        <p className="streak-subtitle">Calorie tracking</p>
        <p className="streak-title">Streak<span> </span>
          <span>90</span> Days
        </p>
      </div>

      {/* Invite Friends Card */}
      <div className="invite-card">
        <p>Invite your friends to Health Horizon</p>
        <span className="share-icon">🔗</span>
      </div>
      </div>
  );
};

const Recipe = () => {
  const navigate = useNavigate();
  return (
    <div className="recipe-screen">
      <p className="recommended-recipes">Recommended Recipes</p>
      <div className="recipe-main">
        <div className="recipe-main-bg"></div>
        <div className="recipe-title">Salad</div>
      </div>
      <div className="recipe-grid">
        <div className="recipe-item">Fruits</div>
        <div className="recipe-item">Food No 4</div>
        <div className="recipe-item">Food No 5</div>
        <div className="recipe-item">Egg</div>
      </div>
      
      <div className="nav-container">
        <div className="nav-bar">
          <div className="nav-item" onClick={() => navigate("/dashboard")}>
            <div className="nav-icon summary-icon"></div>
            <div className="nav-label">Summary</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/record")}>
            <div className="nav-icon record-icon"></div>
            <div className="nav-label">Record</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/recipe")}>
            <div className="nav-icon recipe-icon"></div>
            <div className="nav-label">Recipe</div>
          </div>
          <div className="nav-item" onClick={() => navigate("/plan")}>
            <div className="nav-icon plan-icon"></div>
            <div className="nav-label">Plan</div>
          </div>
      </div>
    </div>
    </div>
  );
};

const Record = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showReviewBox, setShowReviewBox] = useState(false);

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCapturedImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    alert("Image is being processed! Please wait.");
    if (!capturedImage) {
      alert("No image captured!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      });
      const result = await response.json();
      console.log("Predicted Food Item:", result.food_item);
      setShowReviewBox(true);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const closeReviewBox = () => {
    setShowReviewBox(false);
  };

  return (
    <div className="record-screen">
      <p className="record-text">Record</p>
      <div className="rectangle4">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="captured-image" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="webcam-view"
          />
        )}
      </div>
      <div className="ellipse1" onClick={capturePhoto}></div>
      <p className="capture-text">Capture</p>
      <div className="process-btn" onClick={processImage}></div>
      <p className="process-text">Process</p>
      <div className="gallery-btn" onClick={openGallery}></div>
      <p className="gallery-text">Gallery</p>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="nav-bar">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          <div className="nav-icon summary-icon"></div>
          <div className="nav-label">Summary</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/record")}>
          <div className="nav-icon record-icon"></div>
          <div className="nav-label">Record</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/recipe")}>
          <div className="nav-icon recipe-icon"></div>
          <div className="nav-label">Recipe</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/plan")}>
          <div className="nav-icon plan-icon"></div>
          <div className="nav-label">Plan</div>
        </div>
      </div>
      {showReviewBox && (
        <div className="review-overlay fade-in">
          <h2 className="review-title">Review captured items</h2>
          <div className="review-close" onClick={closeReviewBox}>✕</div>
          <p className="review-time">8:00 PM</p>
          <div className="review-box">
            <img
              src={capturedImage || "/IMG_1744.jpg"}
              alt="review"
              className="review-image"
            />
            <p className="review-label-cal">Calories</p>
            <p className="review-value-cal">000 cal</p>
            <p className="review-label-fat">Fats</p>
            <p className="review-value-fat">000 cal</p>
            <p className="review-label-vit">Vitamins</p>
            <p className="review-value-vit">000 cal</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Plan = () => {
  const navigate = useNavigate();

  // State to store the day names and date numbers
  const [yesterdayName, setYesterdayName] = useState("");
  const [todayName, setTodayName] = useState("");
  const [tomorrowName, setTomorrowName] = useState("");
  const [yesterdayDate, setYesterdayDate] = useState(0);
  const [todayDate, setTodayDate] = useState(0);
  const [tomorrowDate, setTomorrowDate] = useState(0);

  useEffect(() => {
    const now = new Date();

    // Calculate numeric dates for yesterday, today, tomorrow
    const day = now.getDate();
    setTodayDate(day);
    setYesterdayDate(day - 1);
    setTomorrowDate(day + 1);

    // Calculate day-of-week names
    const dayIndex = now.getDay(); // 0=Sun,1=Mon,...6=Sat
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // 'todayName' is dayNames[dayIndex]
    // 'yesterdayName' is dayNames[(dayIndex + 6) % 7]
    // 'tomorrowName' is dayNames[(dayIndex + 1) % 7]
    setTodayName(dayNames[dayIndex]);
    setYesterdayName(dayNames[(dayIndex + 6) % 7]);
    setTomorrowName(dayNames[(dayIndex + 1) % 7]);
  }, []);

  return (
    <div className="plan-screen">
      {/* Title: Plan */}
      <h1 className="plan-title">Plan</h1>

      {/* Gray rectangle for day selection */}
      <div className="plan-day-box"></div>
      {/* Green highlight behind "Today" */}
      <div className="plan-day-highlight"></div>
      
      {/* Dynamic day names */}
      <p className="plan-day-yesterday">{yesterdayName}</p>
      <p className="plan-day-today">{todayName}</p>
      <p className="plan-day-tomorrow">{tomorrowName}</p>

      {/* Dynamic day numbers */}
      <p className="plan-day-2">{yesterdayDate}</p>
      <p className="plan-day-3">{todayDate}</p>
      <p className="plan-day-4">{tomorrowDate}</p>

      {/* Gray rectangle for calorie progress */}
      <div className="plan-calorie-box"></div>
      {/* White background progress bar */}
      <div className="plan-calorie-bg"></div>
      {/* Green progress bar */}
      <div className="plan-calorie-fill"></div>
      <p className="plan-calorie-count">200 of 1800 Calories</p>

      {/* Breakfast Section */}
      <h2 className="plan-breakfast-title">Breakfast</h2>
      <p className="plan-breakfast-desc">Upma 1 bowl • about 115 calories</p>
      <img
        src="/Best-South-Indian-Rava-Upma-Recipe.png"
        alt="Upma"
        className="plan-breakfast-img"
      />

      {/* Lunch Section */}
      <h2 className="plan-lunch-title">Lunch</h2>
      <p className="plan-lunch-desc">Egg fried rice 1 plate • about 400 calories</p>
      <img
        src="/Easy-Egg-fried-rice-2.png"
        alt="Egg fried rice"
        className="plan-lunch-img"
      />

      {/* Dinner Section */}
      <h2 className="plan-dinner-title">Dinner</h2>
      <p className="plan-dinner-desc">Chapatti & Rice 1 bowl • about 115 calorie</p>
      <img
        src="/roti_or_rice_what_is_better1.png"
        alt="Chapatti & Rice"
        className="plan-dinner-img"
      />

      {/* Bottom Navigation */}
      <div className="nav-container">
        <div className="nav-bar">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>
          <div className="nav-icon summary-icon"></div>
          <div className="nav-label">Summary</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/record")}>
          <div className="nav-icon record-icon"></div>
          <div className="nav-label">Record</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/recipe")}>
          <div className="nav-icon recipe-icon"></div>
          <div className="nav-label">Recipe</div>
        </div>
        <div className="nav-item" onClick={() => navigate("/plan")}>
          <div className="nav-icon plan-icon"></div>
          <div className="nav-label">Plan</div>
        </div>
  </div>
</div>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-email" element={<SignupEmail />} />
          <Route path="/signup-name" element={<SignupName />} />
          <Route path="/signup-password" element={<SignupPassword />} />
          <Route path="/signup-gender" element={<SignupGender />} />
          <Route path="/signup-age" element={<SignupAge />} />
          <Route path="/signup-measurements" element={<SignupMeasurements />} />
          <Route path="/signup-goal" element={<SignupGoal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/record" element={<Record />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
