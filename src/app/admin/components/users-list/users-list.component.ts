import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { UserModel } from "../../models/admin-users.model";
import { AuthService } from "../../authentication/auth.service";

import { userAuthorityList } from "../../assets/lists/user-authority-list";

import { AdminUsersCreateModal } from "../users-create/users-create.component";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-admin-userslist',
  templateUrl: './users-list.component.html',
  styleUrls: ['../../../app.component.css', './users-list.component.css']
})
export class AdminUsersList implements OnInit, OnDestroy {
  toolbarTitle = "KULLANICILAR";
  isLoading = false;
  usersList: UserModel[] = [];
  private usersListSub: Subscription;
  private userType: string;
  private userName: string;

  userAuthorityList = userAuthorityList;

  tableColumns: string[] = [
                                "image",
                                "fullName",
                                "userName",
                                "authority",
                                "isActive",
                                "actions"
                              ];

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private globalFunctions: globalFunctions
  ) {}

  ngOnInit(): void {
    this.globalFunctions.setToolbarTitle(this.toolbarTitle);
    this.authService.getUsersList();
    this.usersListSub = this.authService.getUsersListListener()
      .subscribe({
        next: (data: UserModel[]) => {
          this.usersList = data;

        },
        error: (error) => {

        }
      });

  }

  onCreate() {
    const dialogRef = this.dialog.open(AdminUsersCreateModal, {
      data: {
        pageMode: "create"
      }
    });
  }

  onEdit(userInfo: UserModel) {
    const dialogRef = this.dialog.open(AdminUsersCreateModal, {
      data: {
        pageMode: "edit",
        userInfo: userInfo
      }
    });
  }

  onDelete(_id: number) {
    this.authService.deleteUser(_id);
  }

  findAuthority(_name: string): string {
    return this.userAuthorityList.find(list => list.name == _name).value;

  }

  ngOnDestroy(): void {

  }
}
