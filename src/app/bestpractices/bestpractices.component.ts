import { Component, Injectable } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-bestpractices',
  templateUrl: './bestpractices.component.html',
  styleUrls: ['./bestpractices.component.scss'],
})

@Injectable({
providedIn:'root'
})
export class BestpracticesComponent  {


constructor(
  private readonly translate: TranslateService,
)
{
  
}


}
