import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEnseignantFormationComponent } from './profil-enseignant-formation.component';

describe('ProfilEnseignantFormationComponent', () => {
  let component: ProfilEnseignantFormationComponent;
  let fixture: ComponentFixture<ProfilEnseignantFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilEnseignantFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilEnseignantFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
