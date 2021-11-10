const mongoose = require('mongoose');
const debug = require('debug')('app:base');
require('dotenv').config();
const fs = require('fs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => debug('Connected to database...'))
.catch(( err ) => debug('Error: ', err));


// Add course collection to database
const schema = new mongoose.Schema({ 
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    __v: Number
});
const Course = mongoose.model('Course', schema);

// Add course data to database
// async function addCourses() {
//     const courseData = fs.readFileSync('exercise-data.json');
//     let courses = JSON.parse(courseData);
//     courses = await Course.insertMany(courses);
//     debug(courses);
// }
// addCourses();

// Exercise 1
// Get all the published backend coures,
// sort them by their name,
// pick only their name and author,
// display them.
// async function getCourses() {
//     return await Course
//     .find({ 
//         isPublished: true,
//         tags: 'backend'
//     })
//     .sort({ name:1 })
//     .select({ name: 1, author:1, tags: 1 });
// }
// async function run() {
//     debug(await getCourses());
// }
// run();

// Exercise 2
// Get all published frontend and backend courses,
// sort by their price in descending order,
// pick only their name, author and price
// display them
// async function getCourses() {
//     return await Course
//     .find({ isPublished: true, tags: { $in: [ 'frontend', 'backend' ]}})
//     // .and([ { isPublished: true }, { $or : [ {tags: 'frontend' }, { tags: 'backend' }]}])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1, price: 1 });
// }
// async function run() {
//     debug(await getCourses());
// }
// run();

// Exercise 3
// Get all published courses that are $15 or more,
// or have the word by in their title
// async function getCourses() {
//     return await Course
//     .find({ isPublished: true })
//     .or([{ price: { $gte: 15 }}, 
//                 { name: /.*by.*/i}])    // i for case insensitive
//     // .and([ { isPublished: true }, { $or : [ {tags: 'frontend' }, { tags: 'backend' }]}])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1, price: 1 });
// }
// async function run() {
//     debug(await getCourses());
// }
// run();


// UPDATING MONGODB DOCUMENTS
// Query first approach
// Useful when you want to validate
//  ie: do not update author if the course is published
// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if (!course) return;
//     course.set({
//         isPublished: true,
//         author: 'Another Author'
//     });
//     debug(await course.save());
// }
// updateCourse('5a68fdc3615eda645bc6bdec');

// Update first approach
// Used when you know you have the correct information
//   ie: updating fb likes
// Use 'mongodb update operators' EXTREMELY USEFUL
// async function updateCourse(id) {
//     const result = await Course.findByIdAndUpdate(id, 
//     {
//         $set: { 
//             isPublished: true,
//             author: 'Jack'
//         }
//     }, { new: true });
//     debug(result);
// }
// updateCourse('5a68fde3f09ad7646ddec17e');

async function removeCourse(id) {
    // const result = await Course.deleteOne({ id: id}); // returns whether deleted
    const course = await Course.findByIdAndDelete(id, { new: true }); // returns deleted course
    debug(course);
}
removeCourse('5a68fdf95db93f6477053ddd');