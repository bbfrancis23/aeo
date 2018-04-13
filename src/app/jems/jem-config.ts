import { Config } from '../milieu/data';

'use strict';

export const JEM_CONFIG: Config = {
  title: 'Code Jems',
  name: 'jems',
  //dataLabel: "jem",
  intro: "Short-cut keys, Best Practices, How to, Mistakes, Reference and Style Guide. Code Jems,  it's all here!",
  img: "assets/img/code-jems.jpg",
  directory: 'code-jems',
  itemsMode: true,

  fieldsRaw: [
    { name: 'tech', values: ['Angular', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'Less', 'MongoDB', 'NodeJS', 'PM2', 'TypeScript', 'SCP'] },
    { name: 'type', values: ['Best Practices', 'How to', 'Mistakes', 'Reference', 'Style Guide'] }
  ],
  fields: [],

  fieldsDetail: {
    "Angular": { img: "assets/img/angular-med.png", text: "<p>Angular is a TypeScript Front End Framework.</p>" },
    "CSS": { img: "assets/img/css-med.png", text: "Cascading Style Sheets describes the presentation of a HTML Document." },
    "Express": { img: "assets/img/express-med.jpg", text: "Express is a NodeJs framework for web applications." },
    "Git": { img: "assets/img/git-med.png", text: "GIT is a Version Control System for computer files that tracks changes and coordinates amoung mulitple people." },
    "HTML": { img: "assets/img/html-med.png", text: "Hyper Text Markup Language describes the structure of a web page." },
    "JavaScript": { img: "assets/img/javascript-med.png", text: "JavasScript is used to make web pages interactive." },
    "Less": { img: "assets/img/less-med.png", text: "Less is Style Sheet language that compiles to CSS. Adds variables, nesting, mixins, operators and functions to CSS." },
    "MongoDB": { img: "assets/img/mongodb-med.png", text: "Mongo DB is a NoSQL database, that uses Javascript and JSON." },
    "NodeJS": { img: "assets/img/nodejs-med.png", text: "NodeJS is a JavaScript server side enviroment." },
    "PM2": { img: "assets/img/pm2-med.png", text: "Advanced, Production Process Manager for Node.js" },
    "SCP": { text: "Secure Copy allows files to be  copied to, from or between differnt hosts." },
    "TypeScript": { img: "assets/img/typescript-med.png", text: "TypeScript is a superset of JavaScript it adds optional static typing." },
    "Best Practices": { text: "Coding techniques and methodolgies that have proven reliable." },
    "How to": { text: "Example code that shows you how to do something." },
    "Mistakes": { text: "Common mistakes made in coding." },
    "Reference": { text: "Quick Reference" },
    "Style Guide": { text: "Set of Standards to use while coding." }
  }
};

/* copyright 2017 AEO All Rights Reserved. */
