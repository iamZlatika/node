const express = require('express');

const app = express();

//register view engine
app.set('view engine', 'ejs');



app.listen(3000);


app.get('/', (req, res) => {
  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
    { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
    { title: 'How to defeat browser', snippet: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, aut.' },
  ];
  // res.send('<p>Home Page</p>');
  res.render('index', { title: 'Home', blogs}, );
});

app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.render('about', { title: 'About' });
});

app.get('/blog/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' })
})
//404 - must be in the bottom! If there is no match above - use method will run
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
