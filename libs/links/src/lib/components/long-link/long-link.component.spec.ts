import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongLinkComponent } from './long-link.component';

describe('LongLinkComponent', () => {
  let component: LongLinkComponent;
  let fixture: ComponentFixture<LongLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LongLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
