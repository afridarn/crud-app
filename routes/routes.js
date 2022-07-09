const router = require('express').Router();
const Movie = require('../models/movie')

router.post('/add', (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    character: req.body.character,
    rating: req.body.rating,
  });
  movie.save((err) => {
    if (err) {
      return res.json({ message: err.message })
    } else {
      req.session.message = {
        message: 'Movie added successfully!'
      };
      return res.redirect('/');
    }
  })
});

router.get('/', async (req, res) => {
  const allMovie = await Movie.find();
  res.render('index', { title: 'Home Page', movie: allMovie });
});

router.get('/add', (req, res) => {
  res.render('add_movie', { title: ' Add Movies' })
});

router.get('/delete/:_id', (req, res) => {
  const { _id } = req.params;
  Movie.deleteOne({ _id })
    .then(() => {
      console.log("Deleted");
      return res.redirect("/");
    })
    .catch(err => console.log(err));
});

router.get('/edit/:_id', (req, res) => {
  const { _id } = req.params;
  Movie.findById(_id, (err, movie) => {
    if (err) {
      return res.redirect('/');
    } else {
      if (movie == null) {
        return res.redirect('/');
      } else {
        res.render('edit_movie', { title: 'Edit movie', movies: movie });
      }
    }
  })
});

router.post('/update/:_id', (req, res) => {
  const { _id } = req.params;
  Movie.findByIdAndUpdate(_id, {
    title: req.body.title,
    year: req.body.year,
    character: req.body.character,
    rating: req.body.rating,
  }, (err, result) => {
    if (err) {
      return res.json({ message: err.message })
    }
    else {
      req.session.message = {
        message: 'Movie updated successfully',
      };
      return res.redirect('/');
    }
  })
});

module.exports = router;