import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightStatesComponent } from './light-states.component';

describe('LightStatesComponent', () => {
  let component: LightStatesComponent;
  let fixture: ComponentFixture<LightStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
