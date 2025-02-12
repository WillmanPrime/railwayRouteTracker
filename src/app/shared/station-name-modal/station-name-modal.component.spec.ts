import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationNameModalComponent } from './station-name-modal.component';

describe('StationNameModalComponent', () => {
  let component: StationNameModalComponent;
  let fixture: ComponentFixture<StationNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationNameModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
