import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomPost } from '../interfaces/custom-post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  readonly urlAPI = "http://localhost:3000/post";
  htppClient = inject(HttpClient);

  create(post: CustomPost){
    console.log(post)
    return this.htppClient.post<CustomPost>(this.urlAPI, post)
  }
}
