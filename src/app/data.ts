import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  readonly media = { small: 576, med: 768, lg: 992, xl: 1200 }
  readonly touch = ("ontouchstart" in document.documentElement);
}
