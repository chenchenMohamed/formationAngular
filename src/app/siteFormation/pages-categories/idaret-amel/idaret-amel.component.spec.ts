import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdaretAmelComponent } from './idaret-amel.component';

describe('IdaretAmelComponent', () => {
  let component: IdaretAmelComponent;
  let fixture: ComponentFixture<IdaretAmelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdaretAmelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdaretAmelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
