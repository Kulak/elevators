import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorControllerComponent } from './elevator-controller.component';

describe('ElevatorControllerComponent', () => {
  let component: ElevatorControllerComponent;
  let fixture: ComponentFixture<ElevatorControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
