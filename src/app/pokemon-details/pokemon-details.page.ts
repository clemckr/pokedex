import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PokemonService } from '../services/pokemon.service';
import Pokemon from '../types/Pokemon';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemon: Pokemon;
  isLoading: boolean;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const name = this.route.snapshot.params['name'] || '1';
    this.pokemonService
      .getPokemon(name)
      .pipe(
        catchError((e) => {
          this.errorMessage = e.message;
          this.isLoading = false;
          return throwError(e);
        })
      )
      .subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.isLoading = false;
      });
  }

  getStatClassname(stat: number) {
    const rate = stat / 200;

    if (rate > 0.75) return 'stat-top';
    if (rate > 0.5) return 'stat-high';
    if (rate > 0.25) return 'stat-medium';
    return 'stat-low';
  }
}
