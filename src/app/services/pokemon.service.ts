import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ALL_POKEMONS_URL, API_URL } from '../constants';
import ApiResponse from '../types/ApiResponse';
import Pokemon from '../types/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonsList$ = this.http.get<ApiResponse>(ALL_POKEMONS_URL).pipe(
    map(({ results }) => results),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  searchPokemon(name$: Observable<string>): Observable<Pokemon[]> {
    return combineLatest([this.pokemonsList$, name$]).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(([pokemons, name]) =>
        pokemons
          .filter((pokemon) => pokemon.name.includes(name))
          .slice(0, 20)
          .map((pokemon) => pokemon.url)
      ),
      switchMap((urls) =>
        urls.length
          ? combineLatest(urls.map((url) => this.http.get<Pokemon>(url)))
          : of([])
      )
    );
  }

  getPokemon(name: string) {
    return this.http.get<Pokemon>(`${API_URL}/pokemon/${name}`);
  }
}
