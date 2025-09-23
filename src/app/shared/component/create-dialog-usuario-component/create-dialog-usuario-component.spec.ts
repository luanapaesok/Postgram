import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDialogUsuarioComponent } from './create-dialog-usuario-component';

describe('CreateDialogUsuarioComponent', () => {
  let component: CreateDialogUsuarioComponent;
  let fixture: ComponentFixture<CreateDialogUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDialogUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDialogUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
