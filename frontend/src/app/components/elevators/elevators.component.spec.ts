import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorsComponent } from './elevators.component';

describe('ElevatorsComponent', () => {
  let component: ElevatorsComponent;
  let fixture: ComponentFixture<ElevatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
