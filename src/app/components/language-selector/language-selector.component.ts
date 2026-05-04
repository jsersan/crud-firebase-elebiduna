import { Component } from '@angular/core';
import { TranslationService, Language } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  template: `
    <div class="language-selector">
      <a 
        class="lang-link"
        [class.active]="isActive('eu')"
        (click)="setLanguage('eu')">
        Eu
      </a>
      <span class="separator">|</span>
      <a 
        class="lang-link"
        [class.active]="isActive('es')"
        (click)="setLanguage('es')">
        Es
      </a>
    </div>
  `,
  styles: [`
    .language-selector {
      position: fixed;
      top: 0;
      right: 20px;
      background-color: #e0e0e0;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1000;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .lang-link {
      color: #666;
      text-decoration: none;
      font-size: 14px;
      font-weight: normal;
      cursor: pointer;
      padding: 2px 4px;
      transition: all 0.2s ease;
    }
    .lang-link:hover {
      color: #333;
      text-decoration: underline;
    }
    .lang-link.active {
      color: #000;
      font-weight: bold;
      text-decoration: underline;
    }
    .separator {
      color: #999;
      font-size: 14px;
      user-select: none;
    }
  `]
})
export class LanguageSelectorComponent {

  constructor(
    public translationService: TranslationService
  ) {
    console.log('[LanguageSelector] Constructor, idioma inicial:', this.translationService.getCurrentLanguage());
  }

  isActive(lang: Language): boolean {
    const current = this.translationService.getCurrentLanguage();
    const active = current === lang;
    console.log(`[LanguageSelector] isActive(${lang}): ${active}, current: ${current}`);
    return active;
  }

  setLanguage(lang: Language): void {
    console.log('[LanguageSelector] setLanguage:', lang);
    this.translationService.setLanguage(lang);
  }
}