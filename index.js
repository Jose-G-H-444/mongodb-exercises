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
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: { $in: [ 'frontend', 'backend' ]}})
    // .and([ { isPublished: true }, { $or : [ {tags: 'frontend' }, { tags: 'backend' }]}])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}
async function run() {
    debug(await getCourses());
}

run();
