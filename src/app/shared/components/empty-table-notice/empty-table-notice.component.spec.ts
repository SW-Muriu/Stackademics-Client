import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTableNoticeComponent } from './empty-table-notice.component';

describe('EmptyTableNoticeComponent', () => {
  let component: EmptyTableNoticeComponent;
  let fixture: ComponentFixture<EmptyTableNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTableNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTableNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
