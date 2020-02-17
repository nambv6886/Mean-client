import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  @Input() heroes: Hero[];
  // @Input() binhtest: Hero;
  @Input() selectedHero: Hero;
  @Output() selectedHeroToParent = new EventEmitter<Hero>();
  constructor() { }

  ngOnInit() {
    console.log('id: ', this.selectedHero.id);
  }

  onSelect(hero) {
    this.selectedHero = hero;
    this.selectedHeroToParent.emit(hero);
  }

}
