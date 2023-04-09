import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionMatchsComponent } from './accordion-matchs.component';

describe('AccordionMatchsComponent', () => {
  let component: AccordionMatchsComponent;
  let fixture: ComponentFixture<AccordionMatchsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionMatchsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionMatchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
