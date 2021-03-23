import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEtudiantFormationComponent } from './profil-etudiant-formation.component';

describe('ProfilEtudiantFormationComponent', () => {
  let component: ProfilEtudiantFormationComponent;
  let fixture: ComponentFixture<ProfilEtudiantFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilEtudiantFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilEtudiantFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
