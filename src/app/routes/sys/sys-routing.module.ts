import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SysStaffStaffComponent } from './staff/staff/staff.component';
import { SysMenuMenuComponent } from './menu/menu/menu.component';
import { SysRoleRoleComponent } from './role/role/role.component';

const routes: Routes = [

  { path: 'staff', component: SysStaffStaffComponent },
  { path: 'menu', component: SysMenuMenuComponent },
  { path: 'role', component: SysRoleRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule { }
