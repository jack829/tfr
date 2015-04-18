var Users = require('./userModel.js');
var Q = require('q');

module.exports = {
  
  getCandidates: function(req, res) {
    console.log("in the pretty new getCandidates function")
    var findCandidates = Q.nbind(Users.find, Users);
    findCandidates({
      $and: [{
        $or: [{"location.myPlace.city": req.params.location}, {"location.desiredPlace.city": req.params.location}]
      }, {
        fbid: {$ne: req.params.id}
      }]
    })
    .then(function(data){
      res.send(data);
    })
  },

  addOrFindCurrentUser: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    findOrCreate(
      {fbid: req.params.id}, 
      {$setOnInsert: {
        fbid: req.params.id, 
        name: req.body.name,
        profile: req.body.profile,
        location: req.body.location,
        roommatePreferences: req.body.roommatePreferences,
        liked: req.body.liked
        }
      },
      {upsert: true, new: true}
    )
    .then(function(user) {
      // console.log("user from db in post ", user)
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    console.log("params in updateProperty ", req.params)
    findOrCreate(
      {fbid: req.params.id }, 
      {$set: {profile: req.body.profile}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  }, 

  updateLocation: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    findOrCreate(
      {fbid: req.params.id }, 
      {$set: {location: req.body.location}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  },

  updateRoommatePreferences: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {roommatePreferences: req.body.roommatePreferences}},
        {upsert: true, new: true}
      )
      .then(function(user){
        res.send(user);
      });
  }
};