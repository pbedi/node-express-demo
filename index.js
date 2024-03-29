const express = require('express');
const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: 'courses1' },
  { id: 2, name: 'courses2' },
  { id: 3, name: 'courses3' }
];

app.get('/', (req, res) => {
  res.send('Hello Tiku');
});

//read list
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

//read item
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with given ID was not found');
    return;
  }
  res.send(course);
});

// Create item
app.post('/api/courses', (req, res) => {
  //const result = validateCourse(req.body);

  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});
// Update the course put
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with given ID was not found');
    return;
  }

  //const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

// Delete record
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('The course with given ID was not found');
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(`Listening on port ${port}...`);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
