import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorApiService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:8980/prod/category');
  }

  getSubCategories(subcat:string):Observable<string[]>{
    return this.http.get<string[]>(`http://localhost:8980/prod/subcategory/${subcat}`);
  }

  getOutput(details:object):Observable<any>{
    console.log(details);
    return this.http.post<any>('http://localhost:8980/prod/profit',details);
  }
}
