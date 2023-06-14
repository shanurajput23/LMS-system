// we will create our course schema herer
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');


const coursesSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseDescription: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  });
  
  const Courses = mongoose.model('Courses', coursesSchema);


  router.get('/courses', async (req, res) => {
    try {
      const foundCourses = await Courses.find();
      res.send(foundCourses);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


  router.post('/courses', async (req, res) => {
    try {
      const { courseId, course_name, instructorId, courseDescription, startDate, endDate} = req.body;
  
      // Create a new user object based on the provided data
      const newCourse= new Courses({
        courseId,
        course_name,
        instructorId,
        courseDescription,
        startDate,
        endDate,
      });
  
      // Save the new user to the database
      await newCourse.save();
  
      res.status(201).json(newCourse);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
  module.exports = router;