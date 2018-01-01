import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="fluid-container">
      <div class="row">
        <div class="col-lg-12">
          <a href="https://angular.io" target="_blank"><img src="assets/img/angular.png" title="Angular" ></a>
          <a href="https://www.mongodb.com/" target="_blank"><img src="assets/img/mongo.png" title="MongoDB" ></a>
          <a href="https://nodejs.org" target="_blank"><img src="assets/img/nodejs.png" title="NodeJS" style=""></a>
          <a href="https://getbootstrap.com" target="_blank"><img src="assets/img/bootstrap.png" title="Bootstrap" style=""></a>
          <a href="https://www.digitalocean.com" target="_blank"><img src="assets/img/digitalocean.png" title="DigitalOcean" style=""></a>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
        © 2018 AEO ALL RIGHT RESERVED
        </div>
      </div>
    </footer>`
})
export class AppFooterComponent{

}
