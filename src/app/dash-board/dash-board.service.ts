import { Config } from './config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, Http } from '@angular/http';
import { OnInit } from '@angular/core'

export class DashBoardService implements OnInit{

    protected config: Config;
    private itemsSource = new BehaviorSubject<any[]>([]);
    currentItems = this.itemsSource.asObservable();

    changeItems( items: any[] ){ this.itemsSource.next( items ); }

    constructor(private httpG: Http){}

    refresh(){
      let items = this.httpG.get(`api/${this.config.name}`).toPromise().then(response => response.json().data);
      items.then(items=> this.changeItems(items));
    }

    ngOnInit(){
      this.refresh();
    }
}
