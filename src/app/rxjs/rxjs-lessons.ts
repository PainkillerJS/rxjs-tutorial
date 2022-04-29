import {
  debounceTime,
  Observable,
  map,
  distinctUntilChanged,
  fromEvent,
  takeUntil,
} from 'rxjs';

// const search$ = new Observable((observer) => {
//   const search = document.getElementById('search');
//   const stop = document.getElementById('stop-button');
//
//   if (!search || !stop) {
//     return observer.error('Element don`t find');
//   }
//
//   const onSearch = (event: Event) => {
//     checkSubscription();
//     observer.next(event);
//   };
//
//   const onStop = (event: Event) => {
//     checkSubscription();
//     observer.complete();
//     clear();
//   };
//
//   search.addEventListener('input', onSearch);
//   stop.addEventListener('click', onStop);
//
//   const checkSubscription = () => {
//     if (observer.closed) {
//       observer.complete();
//       clear();
//     }
//   };
//
//   const clear = () => {
//     search.removeEventListener('input', onSearch);
//     stop.removeEventListener('click', onStop);
//   };
// });

// Тоже самое, что и выше
const search$ = fromEvent(document.getElementById('search')!, 'input');
const stop$ = fromEvent(document.getElementById('stop-button')!, 'click');

const searchSubscription = search$
  //Последовательно выполняет функции
  .pipe(
    // Преобразует входные параметры
    //@ts-ignore
    map((event) => (event.target as HTMLInputElement).value),
    debounceTime(500),
    // Проверяет предыдущее значение
    distinctUntilChanged(),
    // Работает до тех пор, пока не отработает указаный поток
    takeUntil(stop$)
  )
  // Подписывается на изменения
  .subscribe({
    next: (value) => {
      console.log(value);
    },
  });

// setTimeout(() => {
//   searchSubscription.unsubscribe();
// }, 1000);
