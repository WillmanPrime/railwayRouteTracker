import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStationNameComponent } from './search-station-name.component';

describe('SearchStationNameComponent', () => {
  let component: SearchStationNameComponent;
  let fixture: ComponentFixture<SearchStationNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchStationNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStationNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
