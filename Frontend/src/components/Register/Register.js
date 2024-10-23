
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import * as yup from "yup";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import './Register.css'; // Import the CSS file

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({

//     email: "",
//     password: "",
//   });
//   const [serverErrors, setServerErrors] = useState(null);
//   const [checkEmail, setCheckEmail] = useState({});
//   const [clientErrors, setClientErrors] = useState(null);

//   const validationSchema = yup.object({
   
//     email: yup.string().email("Invalid email").required("Email is required"),
//     password: yup.string()
//       .required("Password is required")
//       .min(8, "Password should contain at least 8 characters")
//       .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[0-9]/, "Password must contain at least one number")
//       .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//     if (serverErrors) {
//       setServerErrors(null);
//     }
//     if (clientErrors) {
//       setClientErrors(null);
//     }
//   };

//   const handleEmail = async () => {
//     const response = await axios.get(`http://localhost:5050/checkemail/?email=${form.email}`);
//     setCheckEmail(response.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setClientErrors(null);
//     setServerErrors(null);

//     try {
//       await validationSchema.validate(form, { abortEarly: false });
      
//       const formData = {
       
//         email: form.email,
//         password: form.password,
//       };
      
//       const response = await axios.post('http://localhost:5050/register', formData);
      
//       if (response.status === 201) {
//         toast.success("Registration Successful");
//         setForm({
         
//           email: "",
//           password: "",
//         });
//         navigate('/login');
//       }
//     } catch (err) {
//       if (err.inner) {
//         const newErrors = {};
//         err.inner.forEach(error => { newErrors[error.path] = error.message });
//         setClientErrors(newErrors);
//       } else {
//         setServerErrors(err?.response?.data?.errors);
//       }
//     }
//   };

//   const displayErrors = (errors, field) => {
//     return errors && errors[field] && <span className="error-message">{errors[field]}</span>;
//   };

//   return (
//     <div className="register-box">
     
//       <form onSubmit={handleSubmit}>
    

//         <div className="user-box">
//           <input
//             type="text"
//             id="email"
//             value={form.email}
//             name="email"
//             onChange={handleChange}
//             onBlur={handleEmail}
//             required
//           />
//           <label>Email</label>
//           {displayErrors(clientErrors, "email")}
//           {!clientErrors && displayErrors(serverErrors, "email")}
//           {!clientErrors && checkEmail.exists === true && <span className="error-message">Email already exists</span>}
//         </div>

//         <div className="user-box">
//           <input
//             type="password"
//             id="password"
//             value={form.password}
//             name="password"
//             onChange={handleChange}
//             required
//           />
//           <label>Password</label>
//           {displayErrors(clientErrors, "password")}
//           {!clientErrors && displayErrors(serverErrors, "password")}
//         </div>

//         <button className="btn-primary" type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Register.css';

export default function Register({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [checkEmail, setCheckEmail] = useState({});
  const [clientErrors, setClientErrors] = useState(null);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should contain at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (serverErrors) setServerErrors(null);
    if (clientErrors) setClientErrors(null);
  };

  const handleEmail = async () => {
    const response = await axios.get(`http://localhost:5050/checkemail/?email=${form.email}`);
    setCheckEmail(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientErrors(null);
    setServerErrors(null);

    try {
      await validationSchema.validate(form, { abortEarly: false });

      const formData = { email: form.email, password: form.password };
      const response = await axios.post('http://localhost:5050/register', formData);

      if (response.status === 201) {
        toast.success("Registration Successful");
        setForm({ email: "", password: "" });

        // Call the prop to switch to login view
        if (onRegisterSuccess) onRegisterSuccess();
      }
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach(error => { newErrors[error.path] = error.message });
        setClientErrors(newErrors);
      } else {
        setServerErrors(err?.response?.data?.errors);
      }
    }
  };

  const displayErrors = (errors, field) => {
    return errors && errors[field] && <span className="error-message">{errors[field]}</span>;
  };

  return (
    <div className="register-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            id="email"
            value={form.email}
            name="email"
            onChange={handleChange}
            onBlur={handleEmail}
            required
          />
          <label>Email</label>
          {displayErrors(clientErrors, "email")}
          {!clientErrors && displayErrors(serverErrors, "email")}
          {!clientErrors && checkEmail.exists === true && <span className="error-message">Email already exists</span>}
        </div>

        <div className="user-box">
          <input
            type="password"
            id="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            required
          />
          <label>Password</label>
          {displayErrors(clientErrors, "password")}
          {!clientErrors && displayErrors(serverErrors, "password")}
        </div>

        <button className="btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
}
