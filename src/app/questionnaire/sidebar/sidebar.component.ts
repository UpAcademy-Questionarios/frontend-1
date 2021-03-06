import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap';
import { faCaretDown,faCaretUp, faExpandAlt, faCompressAlt, faQuestion, faHistory, faFile, faFileAlt, faPlusSquare, faChartPie} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../services/account-service/account.service';
import { Account } from '../models/account/account';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})
export class SidebarComponent implements OnInit {
  public showSideBar = false;
  public role: string;
  faCompress = faCompressAlt;
  faExpand = faExpandAlt;
  faQuestion = faQuestion;
  faHistory = faHistory;
  faFile = faFile;
  faFileAlt = faFileAlt;
  faPlusSquare = faPlusSquare;
  faChartPie = faChartPie;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;

  public collapsed = false;
  public new = false;
  public newFile = false;
  public template = false;
  public statistics = false;
  public userName: string;
  public imgLink: string //= "https://media-exp1.licdn.com/dms/image/C4D03AQH7xYqkYmOpJQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=SiunMfepOPZZRd7GtMP8Av-ydZc58X85ffHyDZpauQU"
  public hideNewFileTemplate = true;

  constructor(
    private userApi: UserServiceService,
    private accountService: AccountService,
    private router: Router) {
      if ((this.userApi.isAdmin())  || (this.userApi.isSuperUser()))  {
        this.showSideBar = true;
      }
      console.log(this.imgLink);
      this.userName = userApi.getCurrentName();
      //this.imgLink = accountService.getCurrentAccount().imageLink
      let userId = userApi.getCurrentUser().id
      accountService.getAccount(userId).subscribe(
        (account: Account) => {
          this.imgLink = account.imageLink;}
      )
      console.log(this.imgLink);
   }

  ngOnInit() {
  }


}
