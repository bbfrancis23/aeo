import { Component } from '@angular/core';

@Component({
  template: `
    <header class="v-header aeo-container">
      <div class="fullscreen-video-wrap">
        <video src="assets/img/code.mov" autoplay="true" loop="true"></video>
      </div>
      <div class="header-overlay"></div>
      <div class="header-content">
        <h1>Hello Everyone</h1>
        <p> Loren ipsum dolor sit, amet cosecterur apidisicing elit. Inventor temport atempore voluptate, aliquie nam nemo dgnissimos ullam dicta sint unde. </p>
        <a href="#" class="btn">Read More</a>
      </div>
    </header>
  `,
  styles: [`

  `]
})
export class HomeComponent{

}
