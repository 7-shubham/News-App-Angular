import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiKey = 'your api key';

  constructor(private http: HttpClient) { }

  initSources(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apikey=' +this.apiKey)
  }

  initArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apikey=' + this.apiKey);
  }

  getArticleById(source:string){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source +'&apikey=' + this.apiKey);
  }
}
