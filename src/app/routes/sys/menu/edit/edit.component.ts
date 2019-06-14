import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sys-menu-edit',
  templateUrl: './edit.component.html',
})
export class SysMenuEditComponent implements OnInit {
  menuType: number;
  typeContent: string;
  node: any;

  schemaMenu: SFSchema = {
    properties: {
      menuLabel: { type: 'string', title: '菜单名称' },
      menuUrl: { type: 'string', title: '菜单URL' },
    },
    required: ['menuLabel'],
  };

  formData: {};

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.menuType === 2) {
      this.formData = { menuLabel: this.node.title, menuUrl: this.node.menuUrl };
    }
  }

  close() {
    this.modal.destroy();
  }

  operate(value: any) {
    if (this.menuType === 1) {
      this.saveMenu(value);
    }
    if (this.menuType === 2) {
      this.editMenu(value);
    }
  }

  saveMenu(value: any) {
    this.http.post(`/menu/${this.node.id}/save`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  editMenu(value: any) {
    this.http.post(`/menu/${this.node.id}/edit`, value).subscribe(res => {
      this.msgSrv.success('编辑成功');
      this.modal.close(true);
    });
  }
}
