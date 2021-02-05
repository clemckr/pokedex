import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PokemonCardComponent } from '../components/pokemon-card/pokemon-card.component';
import { PokemonsListComponent } from '../components/pokemons-list/pokemons-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, PokemonCardComponent, PokemonsListComponent],
})
export class HomePageModule {}
