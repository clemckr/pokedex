import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import Pokemon from '../types/Pokemon';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchSubject = new BehaviorSubject<string>('');
  pokemons$: Observable<Pokemon[]>;
  pokemons: Pokemon[];
  isLoading: boolean;
  errorMessage: string;
  loaders = new Array(3).fill(0);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.search();
  }

  search() {
    this.searchSubject
      .pipe(
        tap(() => (this.isLoading = true)),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((val) => {
          return this.pokemonService.searchPokemon(of(val));
        }),
        catchError((e) => {
          console.error(e);
          this.isLoading = false;
          this.errorMessage = e.message;
          return throwError(e);
        })
      )
      .subscribe((pokemons) => {
        this.isLoading = false;
        this.pokemons = pokemons;
      });
  }
}
