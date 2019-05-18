import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountMapComponent } from './count-map.component';

describe('CountMapComponent', () => {
  let component: CountMapComponent;
  let fixture: ComponentFixture<CountMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
