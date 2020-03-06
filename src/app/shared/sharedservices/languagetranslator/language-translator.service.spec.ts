import { TestBed } from '@angular/core/testing';

import { LanguageTranslatorService } from './language-translator.service';

describe('LanguageTranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageTranslatorService = TestBed.get(LanguageTranslatorService);
    expect(service).toBeTruthy();
  });
});
