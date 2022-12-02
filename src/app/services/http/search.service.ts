import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  url = "http://127.0.0.1:8000/api/search"
  searchUser(body: { type, value, per }) {
    console.log(body);
    return this.http.post(this.url + "/user/" + body.per, body)
  }
  searchItem(body:{ type, value,per}) {
    
    return this.http.post(this.url + "/item", body)
  }
}
