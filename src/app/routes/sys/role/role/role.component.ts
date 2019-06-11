import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SysRoleEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-sys-role-role',
  templateUrl: './role.component.html',
})
export class SysRoleRoleComponent implements OnInit {
  url = `/role/all`;
  searchSchema: SFSchema = {
    properties: {
      description: {
        type: 'string',
        title: '角色描述',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '角色名称', index: 'name' },
    { title: '角色描述', index: 'description' },
    { title: '创建时间', type: 'date', index: 'createTime' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: SysRoleEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    this.modal.createStatic(SysRoleEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }
}
