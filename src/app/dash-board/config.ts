import { Field } from './field';
import { FieldRaw } from './field-raw';

'use strict'

export class Config {
  title = '';
  name = '';
  dataLabel = '';
  directory = '';
  intro = '';
  img = '';

  fieldsRaw: FieldRaw[] = [];
  fields: Field[] = [];
}

/* copyright AEO all right reserved */
