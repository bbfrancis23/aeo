import { Component } from '@angular/core';

@Component({
  selector: 'aeo-footer',
  template: `
    <footer class="background-sky fluid-container">
      <div class="row">
        <div class="col-lg-12 pt-5">
          <img src='assets/img/angular-white.png' height="40px">
          <img src='assets/img/mongo-white.png' height="40px">
          <img src='assets/img/node-white.png' height="40px">
          <img src='assets/img/bootstrap-white.png' height="40px">
          <img src='assets/img/digital-ocean-white.png' height="35px" title='DigitalOcean'>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 pt-4">
        © 2017 AEO ALL RIGHT RESERVED
        </div>
      </div>
    </footer>`,
  styles:[`
    footer{
      background-color: black;
      color: white;
      text-align: center;
      font-family: "Montserrat", sans-serif;
    }

    .row{

      height: 100px;
    }
  `]
})
export class AeoFooterComponent{

}
