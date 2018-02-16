import { Config } from '../milieu/data';

'use strict';

export const JEM_CONFIG: Config = {
  title: 'Code Jems',
  name: 'jems',
  //dataLabel: "jem",
  intro: "Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here",
  img: "assets/img/code-jems.jpg",
  directory: 'code-jems',

  fieldsRaw: [
    { name: 'tech', values: ['Angular', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'Less', 'MongoDB', 'NodeJS', 'TypeScript'] },
    { name: 'type', values: ['Best Practices', 'How to', 'Mistakes', 'Reference', 'Style Guide' ] }
  ],
  fields: []
};

/* copyright 2017 AEO All Rights Reserved. */
