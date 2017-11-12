import { Config } from '../milieu/data-classes';

'use strict';

export const JEM_CONFIG: Config = {
  title: 'Real Estate Agent',
  name: 'property',
  dataLabel: 'properties',
  directory: 'real-estate-agent',

  fieldsRaw: [
    { name: 'type', values: ['Residental','Land','Commercial','Multi-Unit','Farm','Residental Lease'] }
  ],
  fields: []
};

/* copyright 2017 AEO All Rights Reserved. */
