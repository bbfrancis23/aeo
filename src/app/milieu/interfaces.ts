'use strict';

// FieldRaw converts to Field to make config files easier to understand for the user.

export interface Config {
  title: string ;
  name: string ;
  directory: string ; // Web Master will provide this.
  intro ?:  string;
  img ?: string;       // Web Master will provide this.
  itemsMode ?: boolean;
  requireAuth ?: boolean;

  fieldsRaw?: FieldRaw[]; // Only fill this in.
  fields?: Field[];
}

export interface Field {
  name: string ;
  values: any;  //[{ name: string, filtered: boolean }];
}

export interface FieldRaw {
  name: string;
  values: string[];
}
/* copyright AEO all right reserved */
