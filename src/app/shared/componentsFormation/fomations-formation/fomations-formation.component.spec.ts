import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FomationsFormationComponent } from './fomations-formation.component';

describe('FomationsFormationComponent', () => {
  let component: FomationsFormationComponent;
  let fixture: ComponentFixture<FomationsFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FomationsFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FomationsFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
