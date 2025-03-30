import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useEffect } from "react";
import "./styles.css";

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
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2 className="login-title">Log in</h2>

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

      <button className="login-button" onClick={() => navigate("/dashboard")}>
        Log in
      </button>

      <p className="forgot-password">Forgot password?</p>
    </div>
  );
};

const SignupEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }
    navigate("/signup-name");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">Let’s create your account</div>
      <label className="email-label" htmlFor="email-input">Enter your email</label>
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
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    navigate("/signup-password");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-email")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">How should we call you?</div>
      <label className="email-label" htmlFor="name-input">Enter your name</label>
      <input
        type="text"
        id="name-input"
        className="email-input"
        placeholder=""
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleNext = () => {
    if (!password.trim()) {
      alert("Please enter a password");
      return;
    }
    navigate("/signup-gender");
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-name")}>
        <div className="vector"></div>
      </div>
      <div className="create-account">Choose a strong password</div>
      <label className="email-label" htmlFor="password-input">Your password</label>
      <input
        type="password"
        id="password-input"
        className="email-input"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="visibility-icon" onClick={() => { /* Toggle visibility logic */ }}>
        <div className="visibility-vector"></div>
      </div>
      <div className="next-btn" onClick={handleNext}></div>
      <div className="next-text" onClick={handleNext}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupGender = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  
  const handleNext = () => {
    if (gender) {
      navigate("/signup-age");
    } else {
      alert("Please select your gender");
    }
  };

  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="footer"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-password")}>
        <div className="vector"></div>
      </div>
      <div className="gender-container">
        <p className="gender-title">What’s your biological gender?</p>
        <label className="gender-option">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />
          <span className="gender-icon male-icon"></span>
          <span>Male</span>
        </label>
        <label className="gender-option">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />
          <span className="gender-icon female-icon"></span>
          <span>Female</span>
        </label>
        <div className="next-btn" onClick={handleNext}></div>
        <div className="next-text" onClick={handleNext}>Next</div>
      </div>
    </div>
  );
};

const SignupAge = () => {
  const navigate = useNavigate();
  return (
    <div className="screen-container">
      <div className="header"></div>
      <div className="back-arrow" onClick={() => navigate("/signup-gender")}>
        <div className="vector"></div>
      </div>
      <div className="age-title">What’s your age?</div>
      <label className="age-label" htmlFor="age-select">Select in years</label>
      <select id="age-select" className="age-select">
        {Array.from({ length: 76 }, (_, i) => {
          const age = i + 5;
          return <option key={age} value={age}>{age}</option>;
        })}
      </select>
      <div className="next-btn" onClick={() => navigate("/signup-measurements")}></div>
      <div className="next-text" onClick={() => navigate("/signup-measurements")}>Next</div>
      <div className="footer"></div>
    </div>
  );
};

const SignupMeasurements = () => {
  const navigate = useNavigate();
  const [heightFt, setHeightFt] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [weight, setWeight] = useState("");

  const handleNext = () => {
    if (!heightFt.trim() || !heightInch.trim() || !weight.trim()) {
      alert("Please fill in all measurement fields");
      return;
    }
    navigate("/dashboard");
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
        placeholder=""
        value={heightFt}
        onChange={(e) => setHeightFt(e.target.value)}
      />
      <input
        type="text"
        id="height-inch"
        className="height-input-right"
        placeholder=""
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
        placeholder=""
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

  // Update the main date label on mount
  useEffect(() => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const ordinal = getOrdinal(day);
    setDateString(`${weekday}, ${day}${ordinal} ${month}`);
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
      {/* Dynamic Main Date Title */}
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
      <WeekDays />

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
      
      {/* Calorie Tracking (Streak) Box */}
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

  // Capture photo from webcam, trigger a download (simulate saving), and display it.
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      downloadImage(imageSrc);
    }
  };

  // Trigger a download of the captured image (simulate saving to gallery)
  const downloadImage = (dataUrl) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "captured_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open the file picker to select an image from the device (gallery).
  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // When a file is chosen, read it and display it in the preview area.
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

  // Process button functionality: show a popup.
  const processImage = () => {
    alert("Image is being processed! Please wait.");
    // Add additional processing logic here if needed.
  };

  return (
    <div className="record-screen">
      <div className="header"></div>
      <div className="footer"></div>
      
      {/* Record Title */}
      <p className="record-text">Record</p>
      
      {/* Rectangle 4: Camera Preview */}
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
      
      {/* Ellipse 1: Capture Button */}
      <div className="ellipse1" onClick={capturePhoto}></div>
      
      {/* Capture Label */}
      <p className="capture-text">Capture</p>
      
      {/* Process Button (replacing flash) */}
      <div className="process-btn" onClick={processImage}></div>
      <p className="process-text">Process</p>
      
      {/* Gallery Button */}
      <div className="gallery-btn" onClick={openGallery}></div>
      <p className="gallery-text">Gallery</p>
      
      {/* Hidden file input for gallery selection */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Bottom Navigation */}
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
