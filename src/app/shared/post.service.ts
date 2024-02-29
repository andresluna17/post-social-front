import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from './../../environments/environment';

export interface ProductsPaginator {
  items: any[];
  page: number;
  hasMorePages: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  endpoint: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPost(page: number, size: number) {
    let api = `${this.endpoint}/post?page=${page}&size=${size}`;
    return this.http.get(api).pipe(
      map((response: any) => ({
        items: response.data,
        page: page,
        hasMorePages: (page - 1) * size < response.total,
      }))
    );
  }

  createPost(title: string, content: string) {
    let api = `${this.endpoint}/post`;
    return this.http.post(api, { title, content });
  }
}
