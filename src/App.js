import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
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

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="header"></div>
      <div className="footer"></div>
      
      <div className="date-label">Monday, 17th February</div>
      <div className="summary-heading">Summary</div>
      
      <div className="meal-plot">
        <p className="plot-placeholder">[Meals Log vs Calorie Count Plot]</p>
      </div>
      
      <img className="profile-icon" src="/profile.png" alt="Profile" />
      
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
  const [selectedDay, setSelectedDay] = useState("today");

  return (
    <div className="plan-screen">
      {/* Plan Header */}
      <p className="plan">Plan</p>

      {/* Day Buttons */}
      <div className="day-buttons">
        <button
          className={`day-button yesterday ${selectedDay === "yesterday" ? "active" : ""}`}
          onClick={() => setSelectedDay("yesterday")}
        >
          Yesterday
        </button>
        <button
          className={`day-button today ${selectedDay === "today" ? "active" : ""}`}
          onClick={() => setSelectedDay("today")}
        >
          Today
        </button>
        <button
          className={`day-button tomorrow ${selectedDay === "tomorrow" ? "active" : ""}`}
          onClick={() => setSelectedDay("tomorrow")}
        >
          Tomorrow
        </button>
      </div>

      {/* Dinner Section */}
      <p className="group7 dinner">Dinner</p>
      <div className="group8 dinner-desc">
        <p>Chapatti & Rice 1 bowl • about 115 calorie</p>
      </div>
      <div
        className="roti_image"
        style={{
          backgroundImage: 'url("roti_or_rice_what_is_better1.png")'
        }}
      ></div>

      {/* Additional Groups / Elements from the export */}
      <button className="group6">+ADD</button>
      {/* Breakfast Section */}
      <p className="group7 breakfast">Breakfast</p>
      <div className="group8 breakfast-desc">
        <p>Upma 1 bowl • about 115 calories</p>
      </div>
      <div
        className="best_upma_image"
        style={{
          backgroundImage: 'url("Best-South-Indian-Rava-Upma-Recipe.png")'
        }}
      ></div>

      {/* Lunch Section */}
      <p className="group7 lunch">Lunch</p>
      <div className="group8 lunch-desc">
        <p>Egg fried rice 1 plate • about 400 calorie</p>
      </div>
      <div
        className="easy_rice_image"
        style={{
          backgroundImage: 'url("Easy-Egg-fried-rice-2.png")'
        }}
      ></div>

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
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/record" element={<Record />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
