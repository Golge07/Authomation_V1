import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
   url = "http://127.0.0.1:8000/api/shelf";
  constructor(private http:HttpClient) { }

 index(){
  return this.http.get(this.url).pipe(catchError(this.handleError));
 }
 show(id){
  return this.http.get(this.url+"/"+id).pipe(catchError(this.handleError));
 }
 store(body:{name,type,comment,quantity,number}){
  return this.http.post(this.url,body).pipe(catchError(this.handleError));
 }
 update(body:{id,name,type,comment,quantity,number}){
  console.log(this.url+"/"+body["id"]);
  return this.http.put(this.url+"/"+body["id"],body).pipe(catchError(this.handleError));
 }
 destroy(id){
  console.log(id);
  
  return this.http.delete(this.url+"/"+id).pipe(catchError(this.handleError));
 }
 handleError(error) {
  return throwError(error || "server Error")
}

}
