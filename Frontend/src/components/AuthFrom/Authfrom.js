// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
// import "./AuthForm.css"; // Add a CSS file for styling
// // import SignInwithGoogle from "./signinwithgoogle";

// const AuthForm = () => {
//   const [isSignIn, setIsSignIn] = useState(true); // Toggle between sign in and sign up

//   useEffect(() => {
//     // Check for token in localStorage
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // If no token, default to the Login view and show toast message
//       setIsSignIn(true); // Show Login by default
//       toast.error("You are not authenticated! Please login.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   }, []); // Run only on component mount

  

//   return (
//     <div className="auth-container">
//       <ToastContainer /> {/* Add the ToastContainer to display toast messages */}
//       <form className="auth-form">
//         <h2>Please {isSignIn ? "Login" : "Sign Up"} To Continue</h2>

//         <div className="tabs">
//           {/* Use Link to route between Sign In and Sign Up */}
//           <Link to="/login" className={`tab ${isSignIn ? "active" : ""}`}>
//             Sign In
//           </Link>
//           <Link to="/register" className={`tab ${!isSignIn ? "active" : ""}`}>
//             Sign Up
//           </Link>
//         </div>

//         {/* Optional Social Login Component */}
//         <SocialLogin />
//       </form>
//     </div>
//   );
// };
 

// const SocialLogin = () => {
//   const handleGoogleLogin = () => {
//     // Redirect to Google authentication
//     window.location.href = "http://localhost:5050/api/auth/google"; // Use this link to initiate Google login
//   };

//   return (
//     <div className="social-login">
//       <p>or</p>
//       <div className="social-btn-group">
//         <button onClick={handleGoogleLogin} className="social-btn google">Google</button>
//         <button className="social-btn facebook">Facebook</button>
//       </div>
//       <div className="social-btn-group">
//         <button className="social-btn linkedin">LinkedIn</button>
//         <button className="social-btn github">GitHub</button>
//       </div>
//     </div>
//   );
// };


// export default AuthForm;

// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./AuthForm.css";
// import LoginForm from "../Login/Login"; // Import LoginForm
// import RegisterForm from "../Register/Register"; // Import RegisterForm

// const AuthForm = () => {
//   const [isSignIn, setIsSignIn] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setIsSignIn(true); // Show Login by default
//       toast.error("You are not authenticated! Please login.", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   }, []);

//   return (
//     <div className="auth-container">
//       <ToastContainer />
//       <div className="auth-form"> {/* Changed form to div */}
//         <h2>Please {isSignIn ? "Login" : "Sign Up"} To Continue</h2>

//         <div className="tabs">
//           <button
//             type="button"
//             className={`tab ${isSignIn ? "active" : ""}`}
//             onClick={() => setIsSignIn(true)}
//           >
//             Sign In
//           </button>
//           <button
//             type="button"
//             className={`tab ${!isSignIn ? "active" : ""}`}
//             onClick={() => setIsSignIn(false)}
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* Conditionally render LoginForm or RegisterForm */}
//         {isSignIn ? <LoginForm /> : <RegisterForm />}

//         {/* Optional Social Login */}
//         <SocialLogin />
//       </div>
//     </div>
//   );
// };

// const SocialLogin = () => {
//   const handleGoogleLogin = () => {
//     window.location.href = "http://localhost:5050/api/auth/google"; // Initiate Google login
//   };

//   return (
//     <div className="social-login">
//       <p>or</p>
//       <div className="social-btn-group">
//         <button onClick={handleGoogleLogin} className="social-btn google">
//           Google
//         </button>
//         <button className="social-btn facebook">Facebook</button>
//       </div>
//       <div className="social-btn-group">
//         <button className="social-btn linkedin">LinkedIn</button>
//         <button className="social-btn github">GitHub</button>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.css";
import LoginForm from "../Login/Login";
import RegisterForm from "../Register/Register";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsSignIn(true);
      toast.error("You are not authenticated! Please login.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, []);

  // Define the function to switch to login
  const switchToLogin = () => {
    setIsSignIn(true);
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <div className="auth-form">
        <h2>Please {isSignIn ? "Login" : "Sign Up"} To Continue</h2>
        <div className="tabs">
          <button
            type="button"
            className={`tab ${isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab ${!isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>
        {isSignIn ? <LoginForm /> : <RegisterForm onRegisterSuccess={switchToLogin} />}
        <SocialLogin />
      </div>
    </div>
  );
};

const SocialLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5050/api/auth/google";
  };

  return (
    <div className="social-login">
      <p>or</p>
      <div className="social-btn-group">
        <button onClick={handleGoogleLogin} className="social-btn google">Google</button>
        <button className="social-btn facebook">Facebook</button>
      </div>
      <div className="social-btn-group">
        <button className="social-btn linkedin">LinkedIn</button>
        <button className="social-btn github">GitHub</button>
      </div>
    </div>
  );
};

export default AuthForm;
