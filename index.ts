screenLog.init(); // affiche le log de la console
// Cliquez sur la flèche de rafraichissement dans la fenêtre de droite, juste à gauche de l'url pour relancer.

import { Observable, interval} from 'rxjs';
import { take, tap, withLatestFrom } from 'rxjs/operators';

// Création de streams
function createStream(name: string, iterations: number, intervalle: number): Observable<any> {
  return interval(intervalle).pipe(
    take(iterations),
    tap(val => console.log(`[ Stream ${name} ] : ${val}`))
  )
}

const streamA = createStream('A', 5, 100);
const streamB = createStream('B', 5, 200);

streamA.pipe(withLatestFrom(streamB))
                    .pipe(tap(val => console.log(`WITH_LATEST_FROM : ${val}`)))
                    .subscribe();

// L'observable A émet mais B n'a pas encore émis de valeur donc withLatestFrom n'émet rien
// Ensuite B émet
// A émet de nouveau, withLatestFrom émet alors la valeur émise par A et la dernière valeur émise par B