import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

const subject = new Subject<number>();
// Тоже самое, что и выше, но с начальным значением
const behaviorSubject = new BehaviorSubject<number>(0);
// Накапливает все предыдущие значения
const replaySubject = new ReplaySubject<number>();

subject.next(1);
subject.next(2);

subject.subscribe((value) => {
  console.log('first', value);
});

subject.next(3);

subject.subscribe((value) => {
  console.log('second', value);
});
subject.next(4);
