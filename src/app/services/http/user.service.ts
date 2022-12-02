import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  url = "http://127.0.0.1:8000/api/user"
  checkUser(email, password) {
    const body = { email: email, password: password }
    return this.http.post(this.url +"/check/", body)
  }
  show(id) {
    return this.http.get(this.url+"/"+id)
  }
  destroy(id) {
    return this.http.delete(this.url + "/" + id)
  }
  update(body: { id, name, email, password, permission }) {
    return this.http.put(this.url + "/" + body['id'], body)
  }
  store(body: { name, email, password, permission }) {
    console.log("test");
    
    return this.http.post(this.url,body)
  }
} 
