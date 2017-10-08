/*
config: any= {
  title: 'Code Jems',
  intro: "Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here",
  img: "assets/img/code-jems.jpg",

  fields: [
    {name: 'tech', values: [ 'Angular 4', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'Less', 'MongoDB', 'Mean Stack', 'NodeJS', 'TypeScript' ]},
    {name: 'type', values: [ 'Best Practices', 'How to',  'Mistakes', 'Short-Cut Keys', 'Style Guide']}
  ]
}
//*/

import { Field } from './field';

export class Config {
  title: string = '';
  intro: string = '';
  img: string = '';

  fields: Field [] = [];
}
