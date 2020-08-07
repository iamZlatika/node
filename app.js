const express = require('express');

const app = express();

//register view engine
app.set('view engine', 'ejs');



app.listen(3000);


app.get('/', (req, res) => {
  // res.send('<p>Home Page</p>');
  res.render('index');
});

app.get('/about', (req, res) => {
  // res.send('<p>About Page</p>');
  res.render('about');
});

app.get('/blog/create', (req, res) => {
  res.render('create')
})
//404 - must be in the bottom! If there is no match above - use method will run
app.use((req, res)=> {
  res.status(404).render('404')
})