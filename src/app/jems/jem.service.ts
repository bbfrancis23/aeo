/*import { Injectable } from '@angular/core';
import { Config } from '../dash-board/config';
import { Headers, Http } from '@angular/http';


import { ActivatedRoute } from "@angular/router";

import { Utilities } from '../utilities';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DashBoardService } from '../dash-board/dash-board.service';

import { Jem } from './jem';

import { OnInit, AfterContentInit } from '@angular/core';


import { Location } from '@angular/common';

@Injectable()
export class JemService extends DashBoardService {

  //private readonly headers = new Headers({ 'Content-Type': 'application/json' });
  config: Config = {
    title: 'Code Jems',
    name: 'jems',
    intro: "Short-cut keys, Best Practices, How to and Mistakes. Code Jems,  it's all here",
    img: "assets/img/code-jems.jpg",

    fieldsRaw: [
      { name: 'tech', values: ['Angular 4', 'CSS', 'Express', 'Git', 'HTML', 'JavaScript', 'Less', 'MongoDB', 'Mean Stack', 'NodeJS', 'TypeScript'] },
      { name: 'type', values: ['Best Practices', 'How to', 'Mistakes', 'Short-Cut Keys', 'Style Guide'] }
    ],
    fields: []
  }
  ////////////////////////////////////////////

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  /////////////////////////////////////////////


  private readonly jemUrl = `api/${this.config.name}`; // todo this should be configed

  private jemsSource = new BehaviorSubject<Jem[]>([]);
  currentJems = this.jemsSource.asObservable();

  changeJems(jems: Jem[]) { this.jemsSource.next(jems); }

  constructor(private r: ActivatedRoute, private http: Http, private u: Utilities, private l: Location) { super(r, http, u, l) }

  getJems(): Promise<Jem[]> {

    return this.http.get(this.jemUrl).toPromise().then(response => response.json().data as Jem[]);
  }

  deleteJem(id: string): string {

    let url = `${this.jemUrl}/${id}`

    //console.log(url);

    this.http.delete(url).toPromise().then((response) => {
      //console.log(response);
    });



    //console.log(response);

    return 'success';
  }

  //createJem(jem: Jem): Promise<Jem> {
  //const url = `{$this.jemUrl}`
  //  return this.http
  //    .post(this.jemUrl, JSON.stringify({ 'jem': jem }), { headers: this.headers })
  //    .toPromise()
  //    .then((res) => {
  //      jem._id = res.json(); //console.log(jem._id, res.json());
  //      return jem;
  //    })
  //    .catch(this.handleError);
  //}

  //private handleError(error: any): Promise<any> {
  //  console.error('An error occurred', error); // for demo purposes only
  //  return Promise.reject(error.message || error);
  //  }


}
//*/
