import { Component } from '@angular/core';

@Component({
  selector: 'aeo-footer',
  template: `
    <footer class="fluid-container">
      <div class="row">
        <div class="col-lg-4">

        </div>
        <div class="col-lg-4">

        </div>
        <div class="col-lg-4">
        Copyright 2017 AEO
        </div>
      </div>
    </footer>`,
  styles:[`
    footer{
      background-color: black;
      color: white;
      text-align: center;
    }
  `]
})
export class AeoFooterComponent{

}
