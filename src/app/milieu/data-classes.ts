'use strict';

// FieldRaw converts to Field to make config files easier to understand for the user.

export class Config {
  title = '';
  name = '';
  directory = ''; // Web Master will provide this.
  intro ?:  string;
  img ?: string;       // Web Master will provide this.
  itemsMode ?: boolean;
  requireAuth ?: boolean;

  fieldsRaw?: FieldRaw[] = []; // Only fill this in.
  fields?: Field[] = [];
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
