import { Component, Input, } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GlobalService } from 'src/app/services/global.service';
import { AlertService } from 'src/app/services/alert.service';
import { ShelfService } from 'src/app/services/http/shelf.service';
@Component({
  selector: 'app-shelfmodal',
  templateUrl: './shelfmodal.component.html',
  styleUrls: ['./shelfmodal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ShelfmodalComponent {
  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() quantity: string;
  @Input() number: string;
  @Input() comment: string;
  @Input() Refresh: Function;
  constructor(private global: GlobalService, private alert: AlertService, private mctrl: ModalController, private http: ShelfService) { }
  dismiss() {
    this.mctrl.dismiss();
  }
  updateall(n, t, c, q, s) {
    try {
      let value = q
    if (n == "" && n == " ") {
      this.alert.Alert('WARNING!', '', 'Name cant be empty', ['Ok'], '');
      return
    } else if (t == "" && t == " ") {
      this.alert.Alert('WARNING!', '', 'Type cant be empty', ['Ok'], '');
      return
    } else if (Number.isNaN(Number.parseInt(value)) || Number.parseInt(value) <= 0) {
      value = "Empty"
    } else if (Number.isNaN(Number.parseInt(s))) {
      this.alert.Alert('WARNING!', '', 'Please enter only numbers for the shelfnumber', ['Ok'], '');
      return
    } else if (c == "") {
      c == " "
    }
    const body = {
           "id": this.id.toString(),
           "name": n.toString(),
           "type": t.toString(),
           "comment": c.toString(),
           "quantity": Number.parseInt(q) <= 0 ? "Empty" : value.toString(),
           "number": s.toString()
    }
    this.http.update(body).subscribe((res) => {
      console.log("body=>"+body["number"]);
      
      console.log(res);
      
      if (res['durumKodu'] == "900") {
        this.quantity = value
        this.alert.toast('Item succesfully updated!',"submit")
        this.Refresh()
      } else {
        this.alert.toast('Item failed to update!',"submit")
      }
    })
    } catch (Exception) {
this.alert.Alert('HATA!','','Kayıt güncellenirken bir sorun oluştu!',['Tamam'],'')
    }
  }
  updateq(q) {
    let value = q
      if ((Number.isInteger(Number.parseInt(value)))) {
         if (this.quantity == "Empty" || this.quantity == "Bos" || this.quantity == "Var" || Number.isInteger(this.quantity)) {
          const body={
            "id":this.id,
            "name": this.name,
            "type": this.type == "" ? " " : this.type,
            "comment": this.comment == "" ? " " : this.comment,
            "quantity": value <=0 ? "Empty" : value,
            "number": this.number
          }
          this.http.update(body).subscribe((res) => {
            console.log("res1 => "+res );
            if (res['durumKodu'] == "900") {
              this.quantity = value
              this.alert.toast('Item succesfully updated!',"submit")
              this.Refresh();
            } else {
              this.alert.toast('Item failed to update!',"danger")
            }
          })
        }
        else if (Number.isInteger(Number.parseInt(this.quantity))) {
          value = Number.parseInt(value) + Number.parseInt(this.quantity)
          const body = {
           "id": this.id,
           "name": this.name,
           "type": this.type,
           "comment": this.comment,
           "quantity": Number.parseInt(value) <= 0 ? "Empty" : Number.isNaN(Number.parseInt(q)) ? "Empty" : value,
           "number": this.number
          } 
          this.http.update(body).subscribe((res) => {
            console.log("res2 => "+(res) );
            if (res['durumKodu'] == "900") {
              this.quantity = value <= 0 ? "Empty" : value, this.number
              this.alert.toast('Item succesfully updated!',"submit")
              this.Refresh();
            } else {
              this.alert.toast('Item failed to update!',"submit")
            }
          }
          )
        }
      } else {
        const body ={
          "id":this.id,
          "name": this.name,
          "type": this.type == "" ? " " : this.type,
          "comment": this.comment == "" ? " " : this.comment,
          "quantity" :"Empty",
          "number": this.number
        }
        this.http.update(body).subscribe((res) => {
          console.log("res3 => "+res );
          if (res['durumKodu'] == "900") {
            this.quantity = value
            this.alert.toast('Item succesfully updated!',"submit")
            this.Refresh();
          } else {
            this.alert.toast('Item failed to   update!',"submit")
          }
        })
      }
  
  }
  deleteitem(i) {
    this.alert.Alert('WARNING!','','Really sure about delete this item?',[{text:'Yes',role:'ok',handler: ()=>{ this.http.destroy(i).subscribe((res) => {
     console.log(res);
     
     if (res['durumKodu'] == "900") {
       this.Refresh()
       this.alert.Alert('WARNING!', '', 'Item succesfully to deleted!', ['Ok'], '')
     } else {
       this.alert.Alert('WARNING!', '', 'Item failed to delete!', ['Ok'], '')
     }
   })}},{text:'No',role:'cancell'}],'')
   }
}