import { fromEvent, pairwise, switchMap, map, takeUntil } from 'rxjs';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const ctxCanvas = canvas.getContext('2d')!;

ctxCanvas.lineWidth = 4;

interface Position {
  x: number;
  y: number;
}

function drawLine([prev, next]: Position[]) {
  ctxCanvas.beginPath();
  ctxCanvas.moveTo(prev.x, prev.y);
  ctxCanvas.lineTo(next.x, next.y);
  ctxCanvas.stroke();
}

const mouseMove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
const mouseDown$ = fromEvent<MouseEvent>(canvas, 'mousedown');
const mouseUp$ = fromEvent<MouseEvent>(canvas, 'mouseup');
const mouseOut$ = fromEvent<MouseEvent>(canvas, 'mouseout');

const points$ = mouseMove$.pipe(
  // Работает как обычный map
  map<MouseEvent, Position>(({ clientX, clientY }) => {
    const { top, left } = canvas.getBoundingClientRect();

    return {
      x: clientX - left,
      y: clientY - top,
    };
  }),
  // Выдает прошлое и текущее зачение в виде массива ([0, 1], [1, 2], [2, 3])
  pairwise<Position>()
);

mouseDown$
  .pipe(
    // Переключает потоки
    switchMap(() => points$.pipe(takeUntil(mouseOut$), takeUntil(mouseUp$)))
  )
  .subscribe(drawLine);
