import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TranslationService } from './services/translation.service';

console.log('=== APP MODULE CARGANDO ===');

// PIPE INLINE - DEFINIDO AQUÍ MISMO
@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {
    console.log('>>> PIPE INLINE CARGADO <<<');
  }

  transform(key: string): string {
    const lang = this.translationService.getCurrentLanguage();
    const result = this.translationService.translate(key);
    console.log(`>>> PIPE INLINE: "${key}" => "${result}" (${lang})`);
    return result;
  }
}

console.log('=== DECLARACIONES ===');
console.log('I18nPipe:', I18nPipe);

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeComponent,
    LanguageSelectorComponent,
    I18nPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }