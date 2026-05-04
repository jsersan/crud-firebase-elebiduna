import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { TranslationService } from '../../services/translation.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit, OnDestroy {

  heroe: HeroeModel = new HeroeModel();
  
  // Propiedades para textos traducidos
  heroTitle: string = '';
  heroBack: string = '';
  heroName: string = '';
  heroPower: string = '';
  heroSave: string = '';
  statusAlive: string = '';
  statusDead: string = '';
  
  private langSubscription: Subscription;

  constructor( 
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    public translationService: TranslationService
  ) { 
    console.log('[HeroeComponent] Constructor');
  }

  ngOnInit() {
    console.log('[HeroeComponent] ngOnInit');
    
    // Actualizar textos inmediatamente
    this.updateTexts();

    // Obtengo el id de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      // Recupero de FireBase toda la información del héroe
      this.heroesService.getHeroe( id )
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
    
    // Escuchar cambios de idioma
    this.langSubscription = this.translationService.currentLanguage$.subscribe((lang) => {
      console.log('[HeroeComponent] Detectado cambio de idioma a:', lang);
      this.updateTexts();
    });
  }
  
  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
  
  private updateTexts(): void {
    this.heroTitle = this.translationService.translate('hero.title');
    this.heroBack = this.translationService.translate('hero.back');
    this.heroName = this.translationService.translate('hero.name');
    this.heroPower = this.translationService.translate('hero.power');
    this.heroSave = this.translationService.translate('hero.save');
    this.statusAlive = this.translationService.translate('status.alive');
    this.statusDead = this.translationService.translate('status.dead');
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: this.t('alert.wait'),
      text: this.t('alert.saving'),
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.heroe.id ) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: this.t('alert.updated'),
        icon: 'success'
      });
    });
  }
}