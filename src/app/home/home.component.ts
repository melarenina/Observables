import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {

    const customInvervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval( () => {
        // Next emmit a new value, error throw an error
        // And complete shows that the observable is done
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customInvervalObservable.subscribe(data => {
      console.log(data);
    });

    // This will run at each second
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
  }

  ngOnDestroy(){
    this.firstObsSubscription.unsubscribe();
  }

}
