// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const { checkSchema } = require('express-validator')
// const configureDB = require('./config/db')
// const User = require('./app/models/admin-model')
// const path = require('path');
// const userRoutes = require('./app/Router/userroute');
// const passport = require('passport');
// const session = require('express-session');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// configureDB()
// const app = express()
// const port = 5050
// app.use(cors())
// app.use(express.json())
// app.use(session({
//   secret: 'Monika',
//   resave: false,
//   saveUninitialized: true
// }));


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//   clientID: "375622512547-mdjjq8254p4cliibl2gi2gga0lvul3ej.apps.googleusercontent.com"
//   ,
//   clientSecret: "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",
//   callbackURL: 'http://localhost:5050/api/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       user = new User({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.displayName
//       });
//       await user.save();
//     }
//     const tokenData = {
//       id: user._id,
//   };
//   const token = jwt.sign(tokenData, "monika", { expiresIn: '5h' });
  
//   return done(null, { user, token });
//   } catch (error) {
//     done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

// app.get('/api/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/api/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     const token = req.user.token;
//     // Redirect to the frontend after successful login
//     res.redirect('http://localhost:3000/dashboard');
//   }
// );
// app.use('/api', userRoutes)
// const adminRegisterValidationSchema = require('./app/validations/admin-register-validations')
// const adminCltr = require('./app/controllers/admin-cltr')
// const adminLoginValidationSchema = require('./app/validations/admin-login-validation')
// const authenticateUser = require('./app/middlewares/authenticateUser')
// const { forgotEmailValidationSchema, otpValidationSchema } = require('./app/validations/forgot-reset-validations')
// app.post('/register', checkSchema(adminRegisterValidationSchema), adminCltr.register)
// app.post('/login', checkSchema(adminLoginValidationSchema), adminCltr.login)
// app.get('/account', authenticateUser, adminCltr.account)
// app.get('/checkemail', adminCltr.checkEmail)

// //forgot and reset
// app.post('/forgot-password', checkSchema(forgotEmailValidationSchema), adminCltr.forgotPassword)
// app.post('/reset-password', checkSchema(otpValidationSchema), adminCltr.resetPassword)

// app.listen(port, () => {
//   console.log(`server connected to ${port}`)
// })



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { checkSchema } = require('express-validator');
const configureDB = require('./config/db');
const User = require('./app/models/admin-model');
const path = require('path');
const userRoutes = require('./app/Router/userroute');
const passport = require('passport');
const session = require('express-session');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

configureDB();
const app = express();
const port = 5050;

app.use(cors({
    origin: 'http://localhost:3000', // Update to your frontend URL
    credentials: true, }));
app.use(express.json());
app.use(session({
    secret: 'Monika', // Use an environment variable in production
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.Googleid,
    clientSecret: process.env.googlescreateid,
    callbackURL: 'http://localhost:5050/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
            });
            await user.save();
        }

        // Only pass the user object to serialize
        return done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize only the user ID
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user); // Fetch user by ID and attach it to the session
});

app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
     
     
        const token = req.user._id; // Token from Passport.js user
        console.log("Token",token)
        res.json({ token }); // Send token in JSON response
        // Redirect to the frontend after successful login
        res.redirect('http://localhost:3000/dashboard')
    }
);

app.use('/api', userRoutes);

const adminRegisterValidationSchema = require('./app/validations/admin-register-validations');
const adminCltr = require('./app/controllers/admin-cltr');
const adminLoginValidationSchema = require('./app/validations/admin-login-validation');
const authenticateUser = require('./app/middlewares/authenticateUser');
const { forgotEmailValidationSchema, otpValidationSchema } = require('./app/validations/forgot-reset-validations');

app.post('/register', checkSchema(adminRegisterValidationSchema), adminCltr.register);
app.post('/login', checkSchema(adminLoginValidationSchema), adminCltr.login);
app.get('/account', authenticateUser, adminCltr.account);
app.get('/checkemail', adminCltr.checkEmail);

// Forgot and reset password
app.post('/forgot-password', checkSchema(forgotEmailValidationSchema), adminCltr.forgotPassword);
app.post('/reset-password', checkSchema(otpValidationSchema), adminCltr.resetPassword);

app.listen(port, () => {
    console.log(`Server connected to ${port}`);
});
