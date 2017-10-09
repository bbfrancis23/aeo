import { Component, Input } from '@angular/core';
import { Jem } from './jem';

"use strict";

@Component({
  selector: 'jem',
  template: `
    <div  class="card mb-3"
        [ngClass]="{  'border-success': jem.type === 'Best Practices',
                      'border-danger': jem.type === 'Mistakes',
                      'border-info': jem.type === 'How to'}">
    <item-controls [item]="jem" ></item-controls>
    <div class="card-body">
      <h4 class="card-title">{{jem.title}}</h4>
      <h5>{{jem.tech}}</h5>
      <h5>
        <span class="badge"
          [ngClass]="{
            'badge-success':jem.type === 'Best Practices',
            'badge-danger': jem.type === 'Mistakes',
            'badge-info': jem.type === 'How to'}" >
              {{jem.type}}
        </span>
      </h5>
      <p class="card-text">{{jem.description}}</p>
      <pre style="background-color: black; color:white; padding: 10px;">{{jem.code}}<br></pre>
    </div>
  </div>

  `,
})
export class JemComponent {

  @Input() jem: Jem;


}
