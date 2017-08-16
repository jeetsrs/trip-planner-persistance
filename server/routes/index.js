var router = require("express").Router();
var Hotel = require("../models").Hotel;
var Restaurant = require("../models").Restaurant;
var Activity = require("../models").Activity;
var Itinerary = require("../models").Itinerary;

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
    res.json(itinerary);
    router.post()
      });
});

router.post("/itineraries", (req, res, next) => {
  const [ hotels, restaurants, activities ] = req.body;
  //create itinerary with all associations
    console.log(req.body);
    Itinerary.create({
    })
        .then((response) => {
      console.log(response)
        })
        .catch(next)
});



module.exports = router;
