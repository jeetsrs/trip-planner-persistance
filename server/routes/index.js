var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require("../models").Itinerary;
var prune = require('json-prune');

router.get("/", (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] })
  ])
    .then(([hotels, restaurants, activities]) => {
      res.json({
        hotels,
        restaurants,
        activities
      });
    })
    .catch(next);
});

router.get("/itineraries/:id", (req, res, next) => {
  var itineraryID = req.params.id;
  Itinerary.find({
      where: {
        id: itineraryID
      },
      include: [{ all: true, nested: true }]
  })
      .then((itinerary) => {
      console.log(itinerary.dataValues)
    res.json(itinerary);
      });
});

router.post("/itineraries", (req, res, next) => {
  console.log('in post');
    var bod = JSON.parse(prune(req.body));
  const { hotels, restaurants, activities } = bod;
   var hotelIdArr = hotels.map((hotel) => {
      return hotel.id;
   })
    var restaurantIdArr = restaurants.map((restaurant) => {
      return restaurant.id;
   })
    var activityIdArr = activities.map((activity) => {
      return activity.id;
   })
    console.log(hotelIdArr, restaurantIdArr, activityIdArr);
  //create itinerary with all associations
    Itinerary.create({
    })
        .then((itin) => {
      itin.addHotels(hotelIdArr)
      itin.addRestaurants(restaurantIdArr)
      itin.addActivities(activityIdArr)
        })
        .catch(next)
});



module.exports = router;
