import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'i18n',
  pure: false
})
export class I18nPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {
    console.log('>>> I18N PIPE CONSTRUCTOR <<<');
  }

  transform(key: string): string {
    const lang = this.translationService.getCurrentLanguage();
    const result = this.translationService.translate(key);
    console.log(`>>> I18N PIPE: "${key}" => "${result}" (${lang})`);
    return result;
  }
}