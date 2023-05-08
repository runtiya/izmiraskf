import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeaderComponent {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(

  ){}

  ngOnInit(){

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}
