import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSourceComponent } from './dialog-source.component';

describe('DialogSourceComponent', () => {
  let component: DialogSourceComponent;
  let fixture: ComponentFixture<DialogSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
