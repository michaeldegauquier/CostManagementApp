import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPricesComponent } from './overview-prices.component';

describe('OverviewPricesComponent', () => {
  let component: OverviewPricesComponent;
  let fixture: ComponentFixture<OverviewPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
