import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero.model';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero;
  @Output() deleteHero = new EventEmitter<Hero[]>();
  isLoading = false;
  message = '';
  isDone = false;

  constructor(
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit() {
  }


  save() {
    this.isLoading = true;
    this.heroService.updateHero(this.hero).subscribe((data) => {
      this.isLoading = false;
      this.message = 'Saved';
      this.isDone = true;
    });
  }

  delete() {
    this.isLoading = true;
    this.heroService.deleteHero(this.hero).subscribe(data => {
      this.deleteHero.emit(data);
      this.isLoading = false;
      this.isDone = true;
      this.hero.name = '';
      this.hero.id = '';
      this.message = 'Deleted';
    });
  }

}
