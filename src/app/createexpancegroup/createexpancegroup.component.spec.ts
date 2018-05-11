import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateexpancegroupComponent } from './createexpancegroup.component';

describe('CreateexpancegroupComponent', () => {
  let component: CreateexpancegroupComponent;
  let fixture: ComponentFixture<CreateexpancegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateexpancegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateexpancegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
