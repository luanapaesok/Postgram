import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarMessage } from './snack-bar-message';

describe('SnackBarMessage', () => {
  let component: SnackBarMessage;
  let fixture: ComponentFixture<SnackBarMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackBarMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
