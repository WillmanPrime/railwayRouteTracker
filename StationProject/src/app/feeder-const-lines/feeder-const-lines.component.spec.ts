import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederConstLinesComponent } from './feeder-const-lines.component';

describe('FeederConstLinesComponent', () => {
  let component: FeederConstLinesComponent;
  let fixture: ComponentFixture<FeederConstLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeederConstLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeederConstLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
