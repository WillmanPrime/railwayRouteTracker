import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLinesComponent } from './list-of-lines.component';

describe('ListOfLinesComponent', () => {
  let component: ListOfLinesComponent;
  let fixture: ComponentFixture<ListOfLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
