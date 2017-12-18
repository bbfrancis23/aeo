import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="fluid-container">
      <div class="row">
        <div class="col-lg-12 pb-4">
          <img src='assets/img/angular-white.png' height="40px">
          <img src='assets/img/mongo-white.png' height="40px">
          <img src='assets/img/node-white.png' height="40px">
          <img src='assets/img/bootstrap-white.png' height="40px">
          <img src='assets/img/digital-ocean-white.png' height="35px" title='DigitalOcean'>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
        © 2017 AEO ALL RIGHT RESERVED
        </div>
      </div>
    </footer>`
})
export class AppFooterComponent{

}
