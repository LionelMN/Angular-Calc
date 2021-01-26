import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface item {_id:number, img:string, name:string, last:number, total:number}
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http : HttpClient) { }

  public getAll() :Observable<item[]>{
    return this.http.get(`${environment.backUrl}/items`) as Observable<item[]>
  }
}
