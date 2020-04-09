import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadTitleComponent } from './typeahead-title.component';
import {IconModule} from '../icon';

describe('TypeaheadTitleComponent', () => {
  let component: TypeaheadTitleComponent;
  let fixture: ComponentFixture<TypeaheadTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
      declarations: [ TypeaheadTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
