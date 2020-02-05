import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatesessionsPage } from './createsessions.page';

describe('CreatesessionsPage', () => {
  let component: CreatesessionsPage;
  let fixture: ComponentFixture<CreatesessionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesessionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatesessionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
