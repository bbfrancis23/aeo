// Opt

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

export class Field {
  name = '';
  values = [{ name: '', filtered: false }];
}

export class FieldRaw {
  name = '';
  values = [''];
}
/* copyright AEO all right reserved */
