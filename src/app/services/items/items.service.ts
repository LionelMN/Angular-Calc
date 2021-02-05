import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


interface manga {_id:number, img:string, name:string, last:number, total:number};
interface newManga {img:string, name:string, last:number, total:number};
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http : HttpClient) { }

  public getAll() :Observable<manga[]>{
    return this.http.get(`${environment.backUrl}/items`) as Observable<manga[]>
  }

  public create(manga : newManga) :Observable<newManga>{
    console.log(manga)
    return this.http.post(`${environment.backUrl}/items/`, manga) as Observable<newManga>
  }

  public edit(manga : manga) : Observable<manga>{
    return this.http.put(`${environment.backUrl}/items/${manga._id}`, manga) as Observable<manga>
  }

  public remove(name : string) : Observable<manga>{
    return this.http.delete(`${environment.backUrl}/items/${name}`) as Observable<manga>
  }
}
