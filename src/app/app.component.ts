import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver , BreakpointState} from '@angular/cdk/layout'
import { NewsService } from './service/news.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'news_app';
  public sources:any = [];
  public articles:any=[];
  public selectedNewsChannel:string = "TOP 10 TRENDING NEWS"
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer:BreakpointObserver , private cdr: ChangeDetectorRef, private news:NewsService){
  }

  ngOnInit(): void {
     this.news.initSources().subscribe((res:any)=>{
      console.log(res);
      this.sources = res.sources
     });
     
     this.news.initArticles().subscribe((res:any)=>{
      console.log(res);
      this.articles = res.articles
     })
  }


  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width: 787px)']).subscribe((state: BreakpointState)=>{
      if(state.matches){
        this.sideNav.mode = "over";
        this.sideNav.close();
      }else{
        this.sideNav.mode = "side";
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
}

getNewsById(source:any){
  this.news.getArticleById(source.id).subscribe((res:any)=>{
    this.articles = res.articles;
    this.selectedNewsChannel = source.name
  })
}

}
