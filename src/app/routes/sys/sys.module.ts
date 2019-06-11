import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SysRoutingModule } from './sys-routing.module';
import { SysStaffStaffComponent } from './staff/staff/staff.component';
import { SysStaffEditComponent } from './staff/edit/edit.component';
import { SysStaffViewComponent } from './staff/view/view.component';
import { SysMenuMenuComponent } from './menu/menu/menu.component';
import { SysMenuEditComponent } from './menu/edit/edit.component';
import { SysMenuViewComponent } from './menu/view/view.component';
import { SysRoleRoleComponent } from './role/role/role.component';
import { SysRoleEditComponent } from './role/edit/edit.component';
import { SysRoleViewComponent } from './role/view/view.component';

const COMPONENTS = [
  SysStaffStaffComponent,
  SysMenuMenuComponent,
  SysRoleRoleComponent];
const COMPONENTS_NOROUNT = [
  SysStaffEditComponent,
  SysStaffViewComponent,
  SysMenuEditComponent,
  SysMenuViewComponent,
  SysRoleEditComponent,
  SysRoleViewComponent];

@NgModule({
  imports: [
    SharedModule,
    SysRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysModule { }
