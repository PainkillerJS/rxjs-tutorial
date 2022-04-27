import {
  debounceTime,
  Observable,
  map,
  distinctUntilChanged,
  fromEvent,
} from 'rxjs';

// const search$ = new Observable((observer) => {
//   const search = document.getElementById('search');
//
//   if (!search) {
//     return observer.error('Element don`t find');
//   }
//
//   search.addEventListener('input', (event) => {
//     observer.next(event);
//   });
// });

// Тоже самое, что и выше
const search$ = fromEvent(document.getElementById('search')!, 'input');

search$
  //Последовательно выполняет функции
  .pipe(
    // Преобразует входные параметры
    //@ts-ignore
    map((event) => (event.target as HTMLInputElement).value),
    debounceTime(500),
    // Проверяет предыдущее значение
    distinctUntilChanged()
  )
  // Подписывается на изменения
  .subscribe({
    next: (value) => {
      console.log(value);
    },
  });
