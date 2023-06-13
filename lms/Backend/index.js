const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
// const users = ("./users.js");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(require("./users"));


//Allow Mongoose to connect to our local MongoDB instance.
mongoose.connect("mongodb://127.0.0.1:27017/lmsdb",{useNewurlParser:true}) ; 

// creating schema
// const usersSchema = new mongoose.Schema({
//     username: { type: String,  unique: true },
//     password: { type: String },
//     email: { type: String,unique: true },
//     first_name: { type: String,},
//     last_name: { type: String,},
//     Role: { type: String,enum: ['student', 'instructor', 'admin'] },
//     profile: { type: String }
//   });

//   //create the user model

//   const Users = mongoose.model('Users', usersSchema);

//   app.get('/users', async (req, res) => {
//     try {
//       const foundUsers = await Users.find();
//       res.send(foundUsers);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   });

//   app.post('/users', async (req, res) => {
//     try {
//       const { username, password, email, first_name, last_name, Role, profile } = req.body;
  
//       // Create a new user object based on the provided data
//       const newUser = new Users({
//         username,
//         password,
//         email,
//         first_name,
//         last_name,
//         Role,
//         profile
//       });
  
//       // Save the new user to the database
//       await newUser.save();
  
//       res.status(201).json(newUser);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  

  // course scehma 

  // const coursesSchema = new mongoose.Schema({
  //   courseId: { type: String, required: true, unique: true },
  //   course_name: { type: String, required: true },
  //   instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //   courseDescription: { type: String, required: true },
  //   startDate: { type: Date, required: true },
  //   endDate: { type: Date, required: true },
  // });
  
  // const Courses = mongoose.model('Courses', coursesSchema);


  // app.get('/courses', async (req, res) => {
  //   try {
  //     const foundCourses = await Courses.find();
  //     res.send(foundCourses);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });


  // app.post('/users', async (req, res) => {
  //   try {
  //     const { courseId, course_name, instructorId, courseDescription, startDate, endDate} = req.body;
  
  //     // Create a new user object based on the provided data
  //     const newUser = new Users({
  //       courseId,
  //       course_name,
  //       instructorId,
  //       courseDescription,
  //       startDate,
  //       endDate,
  //     });
  
  //     // Save the new user to the database
  //     await newUser.save();
  
  //     res.status(201).json(newUser);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});