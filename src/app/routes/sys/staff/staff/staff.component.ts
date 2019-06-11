import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SysStaffEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-sys-staff-staff',
  templateUrl: './staff.component.html',
})
export class SysStaffStaffComponent implements OnInit {
  url = `/staff/all`;
  searchSchema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '姓名', index: 'userName' },
    { title: '生日', type: 'date', index: 'birthday' },
    { title: '手机号码', index: 'mobile' },
    { title: '邮箱', index: 'mail' },
    { title: '办公地址', index: 'officeAddr' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: SysStaffEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {}

  add() {
    this.modal.createStatic(SysStaffEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }
}
