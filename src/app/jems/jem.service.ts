import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DashBoardService } from '../dash-board/dash-board.service';

import { Jem } from './jem';

@Injectable()
export class JemService extends DashBoardService{

  
  ////////////////////////////////////////////

  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
     this.messageSource.next(message)
   }
   /////////////////////////////////////////////

   private readonly headers = new Headers({'Content-Type': 'application/json'});
   private readonly jemUrl = 'api/jems'; // todo this should be configed

   private jemsSource = new BehaviorSubject<Jem[]>([]);
   currentJems = this.jemsSource.asObservable();

   changeJems( jems: Jem[] ){ this.jemsSource.next( jems ); }






  constructor(private http: Http){super()}


  refesh(){
    let jems = this.http.get(this.jemUrl).toPromise().then(response => response.json().data as Jem[]);
    jems.then(jems=> this.changeJems(jems));

  }

  getJems(): Promise<Jem[]>{

    return this.http.get(this.jemUrl).toPromise().then(response => response.json().data as Jem[]);
  }

  deleteJem(id:string): string{

    let url = `${this.jemUrl}/${id}`

    //console.log(url);

    this.http.delete(url).toPromise().then((response)=>{
      //console.log(response);
    });



    //console.log(response);

    return 'success';
  }

  createJem(jem: Jem): Promise<Jem>{
    //const url = `{$this.jemUrl}`
    return this.http
     .post(this.jemUrl, JSON.stringify({'jem':jem}), {headers: this.headers})
     .toPromise()
     .then((res) => {jem._id = res.json(); //console.log(jem._id, res.json());
       return jem;})
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
