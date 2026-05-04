import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: HeroeModel[] = [];
  cargando = false;
  
  heroesTitle: string = '';
  heroesAdd: string = '';
  tableNumber: string = '';
  tableName: string = '';
  tablePower: string = '';
  tableStatus: string = '';
  tableTools: string = '';
  
  private langSubscription: Subscription;

  constructor( 
    private heroesService: HeroesService,
    public translationService: TranslationService
  ) { 
    console.log('[HeroesComponent] Constructor LLAMADO');
  }

  ngOnInit() {
    console.log('[HeroesComponent] ngOnInit LLAMADO');
    
    // Actualizar textos inmediatamente
    this.updateTexts();
    
    // Cargar heroes
    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false;
      });
      
    // Escuchar cambios de idioma
    this.langSubscription = this.translationService.currentLanguage$.subscribe((lang) => {
      console.log('[HeroesComponent] Detectado cambio de idioma a:', lang);
      this.updateTexts();
    });
  }
  
  ngOnDestroy() {
    console.log('[HeroesComponent] ngOnDestroy - Componente destruido');
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
  
  private updateTexts(): void {
    console.log('[HeroesComponent] updateTexts() LLAMADO');
    const currentLang = this.translationService.getCurrentLanguage();
    console.log('[HeroesComponent] Idioma actual:', currentLang);
    
    this.heroesTitle = this.translationService.translate('heroes.title');
    this.heroesAdd = this.translationService.translate('heroes.add');
    this.tableNumber = this.translationService.translate('table.number');
    this.tableName = this.translationService.translate('table.name');
    this.tablePower = this.translationService.translate('table.power');
    this.tableStatus = this.translationService.translate('table.status');
    this.tableTools = this.translationService.translate('table.tools');
    
    console.log('[HeroesComponent] Textos actualizados - titulo:', this.heroesTitle);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: this.t('alert.confirmDelete'),
      text: `${this.t('alert.confirmDeleteMessage')} ${heroe.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}


