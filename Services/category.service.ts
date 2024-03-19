import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = 'http://localhost:3001/';

  constructor(private http: HttpClient) {}

  getcategoryData(): Observable<any> {
    return this.http.get(this.baseUrl + 'allcategories');
  }

  getcategoryListData(): Observable<any> {
    return this.http.get(this.baseUrl + 'viewcategories');
  }
}
