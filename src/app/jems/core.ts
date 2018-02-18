import { Component, EventEmitter, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Jem } from './jem';
import { JemService } from './jem.service';
import { ListVueComponent, MilieuVue } from '../milieu/core';
import { fadeInOutAnimation, flyInOut } from '../milieu/animations';

'use strict';

@Component({
  selector: 'jem-list-vue',
  template: `
    <modal-vue>
      <div [@fadeInOut]="'in'" *ngIf="show"  >
        <div class="card" >
        <div class="card-header">Jems List</div>
        </div>
        <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
        <div class="alert alert-warning" *ngIf="items?.length === 0">No Jems. Please try a Different Filter</div>
        <sized-items-vue-controls
          *ngIf="modalChild.modalMode === false"
          (hideVueEvent)="show=false"
          (modalVueEvent)="modalChild.modalMode=true;"
          (toggleItemSizeEvent)="showBig = !showBig" >
        </sized-items-vue-controls>
        <div >
          <jem  *ngFor="let jem of items; trackBy: trackByJem" [jem]="jem" [jemService]="milieuService" [showBig]="showBig"  ></jem>
        </div>
      </div>
    </modal-vue>`,
  animations: [ fadeInOutAnimation, flyInOut ]
})
export class JemListVueComponent extends ListVueComponent {





}

@Component({
  selector: 'jem-table-of-contents',
  template:`
  <div class="container-fluid">
    <div id="snippits" class="list-group">
      <br>
      <a  class="list-group-item list-group-item-action" *ngFor="let jem of items; trackBy: trackByJem" href="#{{milieuService.urlify(jem.title)}}"  (click)="clicky(jem);" style="margin-left: 5px; text-indent: -10px;" >{{jem.title}}</a>
    </div>
    <hr>
  </div>`
})
export class JemTableOfContents extends JemListVueComponent{

  clicky(jem){

    document.querySelector('#' + this.milieuService.urlify(jem.title)).scrollIntoView();

    //this.jemService.router.navigateByUrl(this.jemService.location.path()+'#'+this.jemService.urlify(jem.title));
    //console.log(this.jemService.location.path()); //href="{{jemService.location.path()}}#{{jemService.urlify(jem.title)}}"
    return false;
  }

}


@Component({
  selector: 'manage-jem',
  template:`
  <modal-vue [modalOnly]="true">
    <div class="card" [@fadeInOut]="'in'" *ngIf="show">
      <div class="card-header">{{manageType}} Jem</div>
      <vue-controls (hideVueEvent)="show=false" (modalVueEvent)="modalChild.modalMode=true" *ngIf="!modalChild.modalMode && jemService.dashBoard" ></vue-controls>
      <modal-controls *ngIf="modalChild.modalMode === true"></modal-controls>
      <div class="card-block p-3" >
        <form  (ngSubmit)="onSubmit();" [formGroup]="jemForm" #formJem="ngForm" *ngIf="!submitted && !message">
          <div class="form-group">
            <label for="title" class="sr-only">Title</label>
            <input class="form-control" formControlName="title" placeholder="Title" required [(ngModel)]="model.title" >
            <div *ngIf="title.invalid && title.touched" class="alert alert-danger">
              <aside *ngIf="title.errors.required" >Title is required.</aside>
              <aside *ngIf="title.errors.maxlength">Title must not be over {{TITLE.maxLength}} characters .</aside>
            </div>
          </div>
          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label for="tech" class="sr-only">Tech</label>
                <select class="form-control" [(ngModel)]="model.tech" formControlName="tech">
                  <option class="grot" *ngFor="let value of jemService.config.fields[0].values">{{value.name}}
                </select>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="Type" class="sr-only">Type</label>
                <select class="form-control" [(ngModel)]="model.type" formControlName="type">
                  <option *ngFor="let value of jemService.config.fields[1].values">{{value.name}}
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="description" class="sr-only">Description</label>
            <textarea class="form-control" placeholder="Description" formControlName="desc" [(ngModel)]="model.description" required></textarea>
            <div *ngIf="desc.invalid && desc.touched" class="alert alert-danger">
              <aside *ngIf="desc.errors.required" >Description is required.</aside>
              <aside *ngIf="desc.errors.maxLength">Descriptin must not be over {{DESC.maxLength}} characters.</aside>
            </div>
          </div>

          <div class="form-group">
            <label for="code" class="sr-only">Code</label>
            <pre><textarea class="form-control" placeholder="code" style="background-color: black; color: white" [(ngModel)]="model.code" formControlName="code"></textarea></pre>
            <div *ngIf="code.invalid && code.touched" class="alert alert-danger">
              <aside *ngIf="code.errors.maxLength">Code must not be over {{CODE.maxLength}} characters.</aside>
            </div>
          </div>
          <button type="submit" class="btn btn-outline-success float-right" [disabled]="jemForm.invalid" >{{manageType}} Jem</button>
        </form>
        <div class="loader" *ngIf="submitted"></div>
        <div class="alert alert-success" *ngIf="message">{{message}}</div>
      </div>
    </div>
  </modal-vue>`,
  animations: [ fadeInOutAnimation ]
})
export class ManageJemComponent extends MilieuVue implements OnInit {
  @Input() jemService: JemService;
  @Input() manageType = '';

  show = true;
  message = null;
  submitted = false;
  jemForm: FormGroup;
  model: any = new Jem();
  readonly TITLE = {maxLength: 64};
  readonly DESC = {maxLength: 1024 };
  readonly CODE = {maxLength: 16384};

  ngOnInit(){

    this.jemForm = new FormGroup({
      'title' : new FormControl('',[Validators.required, Validators.maxLength(this.TITLE.maxLength)]),
      'tech' : new FormControl('Angular'),
      'type' : new FormControl('Best Practices'),
      'desc' : new FormControl('',[Validators.required, Validators.maxLength(this.DESC.maxLength)]),
      'code' : new FormControl('',[Validators.maxLength(this.CODE.maxLength)])
    });


    if(this.manageType === 'Add'){
      this.model.tech = this.jemService.config.fields[0].values[0].name;
      this.model.type = this.jemService.config.fields[1].values[0].name;


    }else{
      this.jemService.currentSelectedItem.subscribe(selectedItem => { this.model = selectedItem; });
    }

  }

  onSubmit(){
    this.submitted = true;
    this.jemService.createItem(this.model).then((data)=>{
      this.jemService.populate();
      this.message = "The Database was updated";
      this.submitted = false;
      setTimeout( () =>{
        if(this.manageType === 'Add'){ this.resetForm(); }
        this.message = null;
      }, 3000);
    });
  }

  resetForm(){
    this.model.tech = this.jemService.config.fields[0].values[0].name;
    this.model.type = this.jemService.config.fields[1].values[0].name;
    this.model.title = null;
    this.model.description = null;
    this.model.code = null;
  }

  get title() { return this.jemForm.get('title'); }
  get desc() { return this.jemForm.get('desc'); }
  get code() { return this.jemForm.get('code'); }
}

@Component({
  selector: 'jem',
  template: `
  <a class="scroll-to-control" id="{{jemService.urlify(jem.title)}}"></a>
    <div  class="card mb-3"
        [ngClass]="{  'border-success': jem.type === 'Best Practices',
                      'border-danger': jem.type === 'Mistakes',
                      'border-info': jem.type === 'How to',
                      'border-dark': jem.type === 'Style Guide'}" *ngIf="showBig">
    <item-controls [item]="jem" [milieuService]="jemService"></item-controls>
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
      'bg-dark': jem.type === 'Style Guide'}" style="margin-bottom: 5px" *ngIf="!showBig">
    <item-controls [item]="jem" *ngIf="jemService.dashBoard" ></item-controls>
      <p><b>{{jem.title}}: </b> {{jem.description}}</p>
      <pre >{{jem.code}}</pre>
  </div>`
})
export class JemComponent {

  @Input() showBig: boolean = true;
  contentCopied = false;

  @Input() jem: Jem;
  @Input() jemService: JemService;

  copy(){
    let txt = document.createElement("textarea");
    txt.value = this.jem.code;
    txt.setAttribute('style',"poition: fixed; left: 0; top: 0; opacity: 0");
    document.body.appendChild(txt);
    txt.select();
    document.execCommand('copy');
    document.body.removeChild(txt);

    this.contentCopied = true;
    setTimeout( () =>{
      this.contentCopied = false;
    }, 3000);
  }


}
