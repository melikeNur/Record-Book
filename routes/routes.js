const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/users');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) =>
    User.findAll()
        .then(users => {
            res.render('users', {
                users
            });
        })
        .catch(err => console.log(err)));



router.post('/add', (req, res) => {
    
    let { name, age, job } = req.body;
    let errors = [];

    if (!name) {
        errors.push({ text: 'Please write name' });
    }

    if (!age) {
        errors.push({text: 'Please write age'});
    }
    if (!job) {
        errors.push({ text: 'Please write job' });
    }
    if (errors.length > 0) {
        res.render('add');

    } else {
        User.create({
            name,
            age,
            job
        })
            .then(user => res.redirect('/users'))
            .catch(err => res.render('error', { error: err.message }))
        }
    });

 router.post('/edit', (req, res) => {
   User.update(
    {
      name: req.body.name,
      age: req.body.age,
      job: req.body.job
    },
    {
      where: { id: req.body.id }
    }
  )
   .then(() => res.redirect('/users'))
   .catch(err => console.log(err));


 });


router.delete("/delete/:id", (req, res) => {
     User.destroy({
    where: {
      id: req.params.id
    }
  })
   .then(() => res.send("success"))
   .catch(err => res.render('error', { error: err.message }))
});


router.get('/search', (req, res) => {
    let { term } = req.query;
   

    User.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
    .then(users => res.render('users', { users }))
    .catch(err => console.log(err));
});
    

  module.exports = router;