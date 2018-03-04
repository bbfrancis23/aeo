import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrianFrancisMilieuComponent } from './brian-francis-milieu.component';

describe('BrianFrancisMilieuComponent', () => {
  let component: BrianFrancisMilieuComponent;
  let fixture: ComponentFixture<BrianFrancisMilieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrianFrancisMilieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrianFrancisMilieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
