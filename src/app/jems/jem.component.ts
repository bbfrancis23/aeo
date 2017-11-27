import { Component, Input } from '@angular/core';
import { Jem } from './jem';
import { MilieuService } from '../milieu/milieu.service';
"use strict";

@Component({
  selector: 'jem',
  template: `
    <div  class="card mb-3"
        [ngClass]="{  'border-success': jem.type === 'Best Practices',
                      'border-danger': jem.type === 'Mistakes',
                      'border-info': jem.type === 'How to',
                      'border-dark': jem.type === 'Style Guide'}">
    <item-controls [item]="jem" *ngIf="data.dashBoard" ></item-controls>
    <div class="card-body">
      <h4 class="card-title">{{jem.title}}</h4>
      <h5>{{jem.tech}}</h5>
      <h5>
        <span class="badge"
          [ngClass]="{
            'badge-success':jem.type === 'Best Practices',
            'badge-danger': jem.type === 'Mistakes',
            'badge-info': jem.type === 'How to',
            'badge-dark': jem.type === 'Style Guide'}" >
              {{jem.type}}
        </span>
      </h5>
      <p class="card-text">{{jem.description}}</p>
      <div style="position: relative">
        <pre style="background-color: black; color:white; padding: 10px;"><div class="copy-control"><a class="material-icons" title="Copy" ><div (click)="copy()">content_copy</div></a></div>{{jem.code}}<br></pre>
        <div class="alert alert-success" *ngIf="contentCopied">Content Copied</div>
      </div>
    </div>
  </div>`
})
export class JemComponent {

  contentCopied = false;

  @Input() jem: Jem;
  constructor(protected data: MilieuService) { }

  copy(){
    let txt = document.createElement("textarea");
    txt.value = this.jem.code;

    document.body.appendChild(txt);
    txt.select();
    document.execCommand('copy');
    this.contentCopied = true;
    setTimeout( () =>{
      this.contentCopied = false;
    }, 3000);
  }


}
