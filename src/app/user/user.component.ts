import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {

  isCollapsed = true;
  private titleSubject = new BehaviorSubject<String>('Users')
  public titleAction$ = this.titleSubject.asObservable();

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  ngOnInit(): void {
  }

}
