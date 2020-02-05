import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessiondetailsPage } from './sessiondetails.page';

describe('SessiondetailsPage', () => {
  let component: SessiondetailsPage;
  let fixture: ComponentFixture<SessiondetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessiondetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessiondetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
