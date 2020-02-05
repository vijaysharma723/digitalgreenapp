import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionRecordingPagePage } from './session-recording-page.page';

describe('SessionRecordingPagePage', () => {
  let component: SessionRecordingPagePage;
  let fixture: ComponentFixture<SessionRecordingPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionRecordingPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionRecordingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
