import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsereDadosPage } from './insere-dados.page';

describe('InsereDadosPage', () => {
  let component: InsereDadosPage;
  let fixture: ComponentFixture<InsereDadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsereDadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsereDadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
