import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoModalComponent } from './more-info-modal.component';

describe('MoreInfoModalComponent', () => {
  let component: MoreInfoModalComponent;
  let fixture: ComponentFixture<MoreInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
