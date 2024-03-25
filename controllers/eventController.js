const express = require("express");
const model = require("../models/event");

//GET /events: send all the events
exports.index = (req, res, next) => {
  // res.send('send all the stories');
  // let events = model.find();
  // res.render("./event/index", { events });

  model
    .find()
    .then((events) => {
      res.render("./event/index", { events });
    })
    .catch((err) => {
      next(err);
    });
};

// GET /events/new
exports.new = (req, res) => {
  // res.send('send the new form');
  res.render("./event/new");
};

//POST /events
exports.create = (req, res, next) => {
  let event = new model(req.body);
  event
    .save(event) // This line is corrected
    .then((event) => {
      console.log(event);
      res.redirect("/events");
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

//GET /events/:id
exports.show = (req, res, next) => {
  // let id = req.params.id;
  // let event = model.findById(id);
  // // res.send('send event with id ' + req.params.id);
  // if (event) {
  //   res.render("./event/show", { event });
  // } else {
  //   // res.status(404).send('Cannot find event with id: ' + id);
  //   let err = Error("Cannot find event with id " + id);
  //   err.status = 404;
  //   next(err);
  // }

  let id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("Invalid event id");
    err.status = 400;
    return next(err);
  }
  model
    .findById(id)
    .then((event) => {
      if (event) {
        res.render("./event/show", { event });
      } else {
        let err = Error("Cannot find event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

//GET /events/:id/edit:
exports.edit = (req, res, next) => {
  //res.send('send the edit form');
  // let id = req.params.id;
  // let event = model.findById(id);
  // if (event) {
  //   res.render("./event/edit", { event });
  // } else {
  //   // res.status(404).send('Cannot find event with id: ' + id);
  //   let err = Error("Cannot find event with id " + id);
  //   err.status = 404;
  //   next(err);
  // }

  let id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/) === null) {
    let err = new Error("Invalid id");
    err.status = 400;
    next(err);
  }
  model
    .findById(id)
    .then((event) => {
      if (event) {
        res.render("./event/edit", { event });
      } else {
        let err = Error("Cannot find event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};

//PUT /events/:id
exports.update = (req, res, next) => {
  // //res.status(200).send(`update event with id: ${req.params.id}`);
  // //res.send('update event with id: ', req.params.id);
  // let event = req.body;
  // //console.log(event);
  // let id = req.params.id;
  // if (model.updateById(id, event)) {
  //   res.redirect("/events/" + id);
  // } else {
  //   // res.status(404).send('Cannot find event with id: ' + id);
  //   let err = Error("Cannot find event with id " + id);
  //   err.status = 404;
  //   next(err);
  // }

  let event = req.body;
  let id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/) === null) {
    let err = new Error("Invalid id");
    err.status = 400;
    next(err);
  }

  model
    .findByIdAndUpdate(id, event, {
      runValidators: true,
      useFindAndModify: false,
    })
    .then((updatedEvent) => {
      if (updatedEvent) {
        res.redirect("/events/" + id);
      } else {
        let err = Error("Cannot find event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

//DELETE /events/:id
exports.delete = (req, res, next) => {
  // //res.send('delete event with id: ', req.params.id);
  // let id = req.params.id;
  // if (model.deleteById(id)) {
  //   res.redirect("/events");
  // } else {
  //   // res.status(404).send('Cannot find event with id: ' + id);
  //   let err = Error("Cannot find event with id " + id);
  //   err.status = 404;
  //   next(err);
  // }
  let id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/) === null) {
    let err = new Error("Invalid id");
    err.status = 400;
    next(err);
  }
  model
    .findByIdAndDelete(id)
    .then((event) => {
      if (event) {
        res.redirect("/events");
      } else {
        let err = Error("Cannot find event with id " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};
