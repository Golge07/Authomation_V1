import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-usermodal',
  templateUrl: './usermodal.component.html',
  styleUrls: ['./usermodal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class UsermodalComponent {
  @Input() name: string;
  @Input() dust2: string;
  @Input() password: string;
  @Input() perm: string;
  @Input() id: string;
  @Input() refresh;
  constructor(private alerts: AlertService, private mctrl: ModalController, private userService: UserService) { }
  dismiss() {
    this.mctrl.dismiss();
  }
  update(i, n, e, p, pe) {
    const body= {
      id:i,
      name:n,
      email:e,
      password: p.trim() == "" ? null : p,
      permission:pe
    }
    this.alerts.Alert("Warning!", "Are you sure about Updating object?", '', [{
      text: 'Yes', role: 'ok', handler: () => {this.userService.update(body).subscribe((res) => {
            if (res['durumKodu'] == "900") {
              this.refresh()
              this.alerts.Alert("WARNING!", "", "User succesfully updated!", ['Ok'], '')
            } else {
              this.alerts.Alert("WARNING!", "", "User failed to update!", ['Ok'], '')
            }
          },(er)=>{
            console.log(er);
          })
      }
    }, { text: 'No', role: 'cancell' }], '')
  }
  deleteuser(id) {
    this.alerts.Alert('WARNING', '', 'Really sure about to delete this user?', [{
      text: 'Yes', role: 'ok', handler: () => {
        this.userService.destroy(id).subscribe((res) => {
          console.log(res);
          
          if (res['durumKodu'] == "900") {
            this.refresh
            this.alerts.Alert('WARNING!', '', 'User succesfully to deleted!', ['Ok'], '')
          } else {
            this.alerts.Alert('WARNING!', '', 'User failed to delete!', ['Ok'], '')
          }
        },(er)=>{this.alerts.Alert('WARNING','','There is a problem',['Ok'],'')})
      }
    }, { text: 'No', role: 'cancell' }], '')
  }
}
