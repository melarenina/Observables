import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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

        if(count === 5){
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }

        count++;
      }, 1000);
    });


    this.firstObsSubscription = customInvervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      // return data;
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed');
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
