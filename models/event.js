const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const moment = require("moment");

const events = [
  {
    id: "1",
    topic: "Education",
    title: "Programming NetBeans",
    description: "Learn java programming in NetBeans IDE.",
    location: "Woodward Hall 120",
    // startTime: DateTime.fromISO("10:00").toLocaleString(DateTime.TIME_SIMPLE),
    // endTime: DateTime.fromISO("11:00").toLocaleString(DateTime.TIME_SIMPLE),
    startTime: DateTime.fromISO("2020-01-12T20:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2020-01-12T22:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/NetBeans.png",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "2",
    topic: "Free stuff",
    title: "Free food",
    description: "Free food from the DDSO club to celebrate Holi.",
    location: "Student Union",
    startTime: DateTime.fromISO("2016-09-12T08:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2016-09-12T10:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/download.png",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "3",
    topic: "Free stuff",
    title: "Free school supplies",
    description: "Handing out free school supplies such as binders, papers, pencils, etc.",
    location: "In front of Student Union",
    startTime: DateTime.fromISO("2017-12-23T12:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2017-12-23T13:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/How-to-get-free-school-supplies-by-mail-.webp",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "4",
    topic: "Education",
    title: "Prepare for Data Structures",
    description: "Data Structures and Algorithms professor holding a office hours to go over the content coverd in the upcoming test.",
    location: "Woodward Hall 140",
    startTime: DateTime.fromISO("2018-12-23T12:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2018-12-23T15:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/intro-data-structure-–-1.png",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "5",
    topic: "Free stuff",
    title: "Free chocolates for good luch",
    description: "Handing out free chocolates for good luck before the final.",
    location: "Student Union",
    startTime: DateTime.fromISO("2022-12-23T12:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2022-12-23T13:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/good-luck-on-your-exams-candy-bar-wrappers-printable-instant-download-student-gift-final-exams-gift-college-care-package-gift-idea-5e32eda3.jpg",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    id: "6",
    topic: "Education",
    title: "Mock interview",
    description: "ACM meeting to over common questions asked in technical interview.",
    location: "Woodward Hall 106",
    startTime: DateTime.fromISO("2024-08-23T12:30:00").toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.fromISO("2024-08-23T15:30:00").toLocaleString(DateTime.DATETIME_MED),
    image: "/images/blog-1-640x428.jpg",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
  },
];

exports.find = function () {
  return events;
};

exports.findById = function (id) {
  return events.find((event) => event.id === id);
};

exports.save = function (event) {
  event.id = uuidv4();
  event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

  events.push(event);
};

exports.updateById = function (id, newEvent) {
  let event = events.find((event) => event.id === id);
  if (event) {
    event.topic = newEvent.topic;
    event.title = newEvent.title;
    event.description = newEvent.description;
    event.location = newEvent.location;
    event.startTime = DateTime.fromISO(newEvent.startTime); //moment method
    event.endTime = DateTime.fromISO(newEvent.endTime);

    // let date = newEvent.When;
    // event.startTime = DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    // let start_time = moment(newEvent.Start, ["HH:mm"]).format("hh:mm A");
    // event.startTime = start_time;
    // let end_time = moment(newEvent.End, ["HH:mm"]).format("hh:mm A");
    // event.endTime = end_time;

    // event.ImageURL = newEvent.ImageURL; //working because it is not doing anything

    //event.image = newEvent.image;
    return true;
    // Handle image update
    // if (newEvent.image) {
    //   event.image = "uploads/" + newEvent.image;
    // } else {
    //   // If newEvent.image is an empty string, set event.image to an empty string
    //   event.image = "";
    // }

    // return true;
  } else {
    return false;
  }
};

exports.deleteById = function (id) {
  let index = events.findIndex((event) => event.id === id);
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
