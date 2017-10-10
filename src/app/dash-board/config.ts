import { Field } from './field';
import { FieldRaw } from './field-raw';

'use strict'

export class Config {
  title: string = '';
  name: string = '';
  intro: string = '';
  img: string = '';

  fieldsRaw: FieldRaw[] = [];
  fields: Field[] = [];
}

/* copyright AEO all right reserved */
