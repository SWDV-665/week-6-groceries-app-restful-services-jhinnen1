import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the GroceriesServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceriesServiceProvider {

  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  //baseURL = "http://localhost:8080";
  baseURL = "http://192.168.2.195:8080";

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesServiceProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }  else {
        errMsg = error.message ? error.message : error.toString();
      } 
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

removeItem(id) {
  this.http.delete(this.baseURL + '/api/groceries/' + id).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
  })
}

addItem(item) {
  this.http.post(this.baseURL + '/api/groceries/', item).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
  })
}

editItem(updatedItem, itemId) {
  this.http.put(this.baseURL + '/api/groceries/' +itemId, updatedItem).subscribe(res => {
    this.items = res;
    this.dataChangeSubject.next(true);
  })
}
}
