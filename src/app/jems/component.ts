import { Component, Input } from '@angular/core';
import { Jem } from './jem';
import { JemService } from './jem.service';
import { AccountService } from '../account/data';

@Component({
  selector: 'jem',
  template: `
  <a class="scroll-to-control" id="{{jemService.urlify(jem.title)}}"></a>
    <div  class="card mb-3"
        [ngClass]="{  'border-success': jem.type === 'Best Practices',
                      'border-info': jem.type === 'How to',
                      'border-danger': jem.type === 'Mistakes',
                      'border-dark': jem.type === 'Reference',
                      'border-light': jem.type === 'Style Guide'}" *ngIf="!quickView">
    <item-controls [item]="jem" [milieuService]="jemService" *ngIf="accountService.authenticated" ></item-controls>
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
  </div>
  <div class="card p-1 text-white"
    [ngClass]="{
      'bg-success': jem.type === 'Best Practices',
      'bg-danger': jem.type === 'Mistakes',
      'bg-info': jem.type === 'How to',
      'bg-dark': jem.type === 'Style Guide'}" style="margin-bottom: 5px" *ngIf="quickView">
    <item-controls [item]="jem" *ngIf="accountService.authenticated" ></item-controls>
      <p><b>{{jem.title}}: </b> {{jem.description}}</p>
      <pre >{{jem.code}}</pre>
  </div>`
})
export class JemComponent {

  @Input() quickView: boolean = false;
  contentCopied = false;

  @Input() jem: Jem;
  @Input() jemService: JemService;

  constructor(public accountService: AccountService) { }

  copy() {
    let txt = document.createElement("textarea");
    txt.value = this.jem.code;
    txt.setAttribute('style', "poition: fixed; left: 0; top: 0; opacity: 0");
    document.body.appendChild(txt);
    txt.select();
    document.execCommand('copy');
    document.body.removeChild(txt);

    this.contentCopied = true;
    setTimeout(() => {
      this.contentCopied = false;
    }, 3000);
  }


}
