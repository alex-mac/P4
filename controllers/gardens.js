var express = require('express');
var Gardens = require('../models/gardens');
var router = express.Router();

router.get('/', function(req, res){
  Gardens.find(function(err, gardens) {
    if (err) { return res.send({message: 'An error occurred when finding any gardens'}) }

    res.send(gardens);
  })
});

router.post('/', function(req, res) {
  var garden = new Gardens(req.body);
  garden.save(function(err) {
    if (err) return res.send({message: 'An error occurred when creating a garden'});
    res.send(garden);
  });
});

router.get('/:id', function(req, res) {
  Gardens.findById(req.params.id, function(err, garden) {
    if (err) return res.send({message: 'An error occurred when finding that garden'})
    res.send(garden)
  })
})

router.put('/:id', function(req, res) {
  Gardens.findByIdAndUpdate(req.params.id, req.body, function(err, garden) {
    if (err) return res.send ({message: "Couldn't edit that particular garden"})

    res.send(garden);
  })
});

router.delete('/:id', function(req,res) {
  Gardens.findByIdAndRemove(req.params.id, function(err) {
    if (err) return res.send ({message: "Couldn't delete that particular garden"})

    res.send({"message": "success"});
  })
})

module.exports = router;