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
  const [heightFt, setHeightFt] = useState(signupData.height_ft || "");
  const [heightInch, setHeightInch] = useState(signupData.height_inch || "");
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
    
    // Update the global context with keys matching the database
    updateSignupData({ 
      height_ft: heightFt, 
      height_inch: heightInch, 
      weight: weight 
    });
    
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
  const [goal, setGoal] = useState(""); // will be set to 1 or 2

// Determine recommendation based on weight
const weight = signupData.weight || 0; // Default to 0 if weight is not available
const recommendation = weight > 75 ? "We recommend Weight Loss Plan" : "We recommend Weight Gain Plan";

  const handleNext = async () => {
    if (!goal) {
      alert("Please select a goal");
      return;
    }
    // Update the context with the selected goal (numeric)
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
        // Signup successful; navigate to the dashboard
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
      {/* Recommendation Text */}
      <p className="goal-recommendation">{recommendation}</p>
      {/* Option for Lose Weight */}
      <div
        className={`goal-box lose-box ${goal === 1 ? "selected" : ""}`}
        onClick={() => setGoal(1)}
      >
        <p className="lose-text">Lose weight</p>
      </div>
      {/* Option for Gain Weight */}
      <div
        className={`goal-box gain-box ${goal === 2 ? "selected" : ""}`}
        onClick={() => setGoal(2)}
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
  const [planFill, setPlanFill] = useState(0);
  // Constant calorie goal
  const planGoal = 1000;

  // State for macros averages
  const [macroCarbs, setMacroCarbs] = useState(0);
  const [macroProteins, setMacroProteins] = useState(0);
  const [macroFats, setMacroFats] = useState(0);

  // State for streak
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date();
    
    // Set the main date title
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const ordinal = getOrdinal(day);
    setDateString(`${weekday}, ${day}${ordinal} ${month}`);

    // Generate days for the current week (starting from Sunday)
    const generateWeekDays = () => {
      const week = [];
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        week.push({
          name: date.toLocaleDateString("en-US", { weekday: "short" }),
          number: date.getDate(),
          isToday: date.toDateString() === today.toDateString(),
        });
      }
      return week;
    };

    setWeekDays(generateWeekDays());

    // Load initial planFill from localStorage (if any)
    const storedFill = parseInt(localStorage.getItem("planFill"), 10) || 0;
    setPlanFill(storedFill);

    // Fetch today's total calories from API
    fetch(`${process.env.REACT_APP_API_URL}/api/calories_today`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Today's fill data:", data);
          localStorage.setItem("planFill", data.fill);
        })
        .catch(error => console.error("Error fetching today's calories:", error));

    // Fetch today's macro averages from API
    fetch(`${process.env.REACT_APP_API_URL}/api/macros_today`)
      .then(response => response.json())
      .then(data => {
        setMacroCarbs(data.avg_carbs);
        setMacroProteins(data.avg_proteins);
        setMacroFats(data.avg_fats);
      })
      .catch(error => console.error("Error fetching macros:", error));

    // Fetch streak from API
    fetch(`${process.env.REACT_APP_API_URL}/api/streak`)
      .then(response => response.json())
      .then(data => {
        setStreak(data.streak);
      })
      .catch(error => console.error("Error fetching streak:", error));
  }, []);

  // Helper for ordinal suffix
  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  // Ensure planFill is a number.
  const safePlanFill = Number(planFill) || 0;
  // Calculate progress percentage (cap at 100%)
  const progress = Math.min((safePlanFill / planGoal) * 100, 100);
  
  // Set circle circumference (adjust as needed) and compute dash offset
  const circumference = 283;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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

      {/* Dynamic Calorie Ring */}
      <div className="calorie-ring">
        <svg width="175" height="175" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="8" fill="none" />
          {/* Progress Circle with 2s transition */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="green"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 4s ease" }}
          />
          {/* Calorie Text */}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="12">
            {safePlanFill} / {planGoal} kcal
          </text>
        </svg>
      </div>

      {/* Macro Labels */}
      <div className="macros-label-carbs">Carbs</div>
      <div className="macros-label-protein">Protein</div>
      <div className="macros-label-fat">Fat</div>
      
      {/* Macro Circles and Text */}
      <div className="macro-circle-1"></div>
      <div className="macro-text-1">{macroCarbs}%</div>
      <div className="macro-circle-2"></div>
      <div className="macro-text-2">{macroProteins}%</div>
      <div className="macro-circle-3"></div>
      <div className="macro-text-3">{macroFats}%</div>
      
      {/* Calorie Tracking (Streak) */}
      <div className="calorie-streak-box"></div>
      <div className="calorie-tracking-label">Calorie tracking</div>
      <div className="calorie-streak-text">Streak</div>
      <div className="streak-number">{streak}</div>
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

  const handleLogout = () => {
    // Clear stored user data and token from localStorage
    localStorage.clear();
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          &#8592;
        </button>
        <h1 className="title">Settings</h1>
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src="/profile.png" alt="User Profile" />
        </div>
        <h2 className="greeting">Thank you for using Health Horizon</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
  const [predictedFood, setPredictedFood] = useState(null);
  const [nutrition, setNutrition] = useState(null);

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
    if (!capturedImage) {
      alert("No image captured!");
      return;
    }

    alert("Image is being processed! Please wait.");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: capturedImage }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowReviewBox(true);
        setPredictedFood(data.food_item);
        setNutrition(data.nutrition);
      } else {
        alert(data.error || "Prediction failed");
      }
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process the image.");
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
          <p className="review-time">Nutritional Details</p>
          <div className="review-box">
            <img src={capturedImage || "/IMG_1744.jpg"} alt="review" className="review-image" />
            <p className="review-label-food">Food Item: {predictedFood}</p>
            <p className="review-label-cal">Calories</p>
            <p className="review-value-cal">{nutrition?.calories || "N/A"} cal</p>
            <p className="review-label-prot">Proteins</p>
            <p className="review-value-prot">{nutrition?.proteins || "N/A"}%</p>
            <p className="review-label-carb">Carbohydrates</p>
            <p className="review-value-carb">{nutrition?.carbohydrates || "N/A"}%</p>
            <p className="review-label-fat">Fats</p>
            <p className="review-value-fat">{nutrition?.fats || "N/A"}%</p>
            <p className="review-label-sug">Sugar</p>
            <p className="review-value-sug">{nutrition?.sugar || "N/A"}%</p>
            <p className="review-label-vit">Vitamins</p>
            <p className="review-value-vit">{nutrition?.vitamins || "N/A"} </p>
            <p className="review-label-min">Minerals</p>
            <p className="review-value-min">{nutrition?.minerals || "N/A"} </p>
            <p className="review-label-qty">Quantity</p>
            <p className="review-value-qty">{nutrition?.quantity || "N/A"} </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Recipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [mainRecipe, setMainRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const plan_id = 1;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/recommended?plan_id=${plan_id}`) // Changed from http://localhost:5000
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        if (data && data.length) {
          setMainRecipe(data[0]);
          setRecipes(data.slice(1));
        }
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, [plan_id]);

  const closeOverlay = () => setSelectedRecipe(null);

  return (
    <div className="recipe-screen">
      <p className="recommended-recipes">Recommended Recipes</p>
      
      {/* Dynamic Recipe Main Section */}
      {mainRecipe && (
        <div 
          className="recipe-main" 
          style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/static/images/${mainRecipe.image})` }} // Changed from http://localhost:5000
          onClick={() => setSelectedRecipe(mainRecipe)}
        >
          <div className="recipe-title">{mainRecipe.recipe_name}</div>
        </div>
      )}

      {/* Dynamic Recipe Grid */}
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.recommended_id}
            className="recipe-item"
            onClick={() => setSelectedRecipe(recipe)}
            style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/static/images/${recipe.image})` }} // Changed from http://localhost:5000
          >
            <div className="recipe-name">{recipe.recipe_name}</div>
          </div>
        ))}
      </div>
      
      {/* Overlay for recipe details */}
      {selectedRecipe && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${process.env.REACT_APP_API_URL}/static/images/${selectedRecipe.image}`} // Changed from http://localhost:5000
              alt={selectedRecipe.recipe_name}
              className="overlay-image"
            />
            <h2>{selectedRecipe.recipe_name}</h2>
            <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
            <p><strong>Steps:</strong> {selectedRecipe.recipe_steps}</p>
            <p><strong>Calories:</strong> {selectedRecipe.calorie}</p>
            <button onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
      
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

const Plan = () => {
  const navigate = useNavigate();

  // State for day labels and numbers
  const [yesterdayName, setYesterdayName] = useState("");
  const [todayName, setTodayName] = useState("");
  const [tomorrowName, setTomorrowName] = useState("");
  const [yesterdayDate, setYesterdayDate] = useState(0);
  const [todayDate, setTodayDate] = useState(0);
  const [tomorrowDate, setTomorrowDate] = useState(0);
  const [selectedDay, setSelectedDay] = useState("today"); // "yesterday", "today", or "tomorrow"

  // State to store plan meal items from plan_display
  const [planItems, setPlanItems] = useState({});
  // Cache for each day's plan items so we don't re-fetch for already selected day
  const [planCache, setPlanCache] = useState({});

  // Calorie progress values
  const [calorieFill, setCalorieFill] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);

  // Get planId dynamically (for example from localStorage)
  const planId = localStorage.getItem("planId") || 1;

  // Setup day names and numeric dates once on mount
  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    setTodayDate(day);
    setYesterdayDate(day - 1);
    setTomorrowDate(day + 1);
    
    const dayIndex = now.getDay(); // 0=Sun, 1=Mon,...,6=Sat
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setTodayName(dayNames[dayIndex]);
    setYesterdayName(dayNames[(dayIndex + 6) % 7]);
    setTomorrowName(dayNames[(dayIndex + 1) % 7]);
  }, []);

  // Function to fetch plan items for a given day
  const fetchPlanItems = (day) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/plan_display?plan_id=${planId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(`Plan items for ${day}:`, data);
        // Update cache: use a new object so React sees the change
        setPlanCache(prevCache => ({ ...prevCache, [day]: data }));
        setPlanItems(data);
        // Calculate goal as the sum of the calories of all available meals
        const goal = 
          (data.breakfast ? data.breakfast.calorie : 0) +
          (data.lunch ? data.lunch.calorie : 0) +
          (data.dinner ? data.dinner.calorie : 0);
        setCalorieGoal(goal);
        localStorage.setItem("planGoal", goal);
      })
      .catch(error => console.error("Error fetching plan display items:", error));
  };

  // useEffect to fetch plan items when selectedDay changes,
  // but only fetch if we don't have them in cache already.
  useEffect(() => {
    if (!planId) return;

    if (planCache[selectedDay]) {
      // If the plan items have been cached, use them.
      setPlanItems(planCache[selectedDay]);
      const data = planCache[selectedDay];
      const goal = 
          (data.breakfast ? data.breakfast.calorie : 0) +
          (data.lunch ? data.lunch.calorie : 0) +
          (data.dinner ? data.dinner.calorie : 0);
      setCalorieGoal(goal);
      localStorage.setItem("planGoal", goal);
    } else {
      // Otherwise, fetch the plan items and cache them.
      fetchPlanItems(selectedDay);
    }
  }, [planId, selectedDay, planCache]);

  // Fetch today's filled calories (only for "today" view)
  useEffect(() => {
    if (selectedDay === "today") {
      fetch(`${process.env.REACT_APP_API_URL}/api/calories_today`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Today's fill data:", data);
          setCalorieFill(data.fill);
          localStorage.setItem("planFill", data.fill);
        })
        .catch(error => console.error("Error fetching today's calories:", error));
    } else {
      // For yesterday or tomorrow, fill should be zero.
      setCalorieFill(0);
      localStorage.setItem("planFill", 0);
    }
  }, [selectedDay]);

  // Handler for day selection
  const handleDayClick = (day) => {
    if (day !== selectedDay) {
      setSelectedDay(day);
      // When the day changes, if it's not in the cache, the effect will fetch it.
    }
  };

  // Calculate fill percentage (avoid division by zero)
  const fillPercentage = calorieGoal > 0 ? Math.min((calorieFill / calorieGoal) * 100, 100) : 0;

  return (
    <div className="plan-screen">
      {/* Title */}
      <h1 className="plan-title">Plan</h1>
      
      {/* Day Selection */}
      <div className="plan-day-container">
        <div 
          className={`plan-day ${selectedDay === 'yesterday' ? 'selected' : ''}`}
          onClick={() => handleDayClick('yesterday')}
        >
          <p className="plan-day-label">{yesterdayName}</p>
          <p className="plan-day-number">{yesterdayDate}</p>
        </div>
        <div 
          className={`plan-day ${selectedDay === 'today' ? 'selected' : ''}`}
          onClick={() => handleDayClick('today')}
        >
          <p className="plan-day-label">{todayName}</p>
          <p className="plan-day-number">{todayDate}</p>
        </div>
        <div 
          className={`plan-day ${selectedDay === 'tomorrow' ? 'selected' : ''}`}
          onClick={() => handleDayClick('tomorrow')}
        >
          <p className="plan-day-label">{tomorrowName}</p>
          <p className="plan-day-number">{tomorrowDate}</p>
        </div>
      </div>

      {/* Calorie Progress Section */}
      <div className="plan-calorie-box">
        <div className="plan-calorie-bg"></div>
        <div 
          className="plan-calorie-fill"
          style={{ width: `${fillPercentage}%` }}
        ></div>
        <p className="plan-calorie-count">
          {calorieFill} of {calorieGoal} Calories
        </p>
      </div>

      {/* Meals Section */}
      <div className="plan-meals">
        {/* Breakfast */}
        <h2 className="plan-breakfast-title">Breakfast</h2>
        {planItems.breakfast ? (
          <>
            <p className="plan-breakfast-desc">
              {planItems.breakfast.food_item_name} • about {planItems.breakfast.calorie} calories
            </p>
            <img
              src={`${process.env.REACT_APP_API_URL}/static/images/${planItems.breakfast.image}`}
              alt={planItems.breakfast.food_item_name}
              className="plan-breakfast-img"
            />
          </>
        ) : (
          <p className="plan-no-item">No breakfast item available</p>
        )}

        {/* Lunch */}
        <h2 className="plan-lunch-title">Lunch</h2>
        {planItems.lunch ? (
          <>
            <p className="plan-lunch-desc">
              {planItems.lunch.food_item_name} • about {planItems.lunch.calorie} calories
            </p>
            <img
              src={`${process.env.REACT_APP_API_URL}/static/images/${planItems.lunch.image}`}
              alt={planItems.lunch.food_item_name}
              className="plan-lunch-img"
            />
          </>
        ) : (
          <p className="plan-no-item">No lunch item available</p>
        )}

        {/* Dinner */}
        <h2 className="plan-dinner-title">Dinner</h2>
        {planItems.dinner ? (
          <>
            <p className="plan-dinner-desc">
              {planItems.dinner.food_item_name} • about {planItems.dinner.calorie} calories
            </p>
            <img
              src={`${process.env.REACT_APP_API_URL}/static/images/${planItems.dinner.image}`}
              alt={planItems.dinner.food_item_name}
              className="plan-dinner-img"
            />
          </>
        ) : (
          <p className="plan-no-item">No dinner item available</p>
        )}
      </div>

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
