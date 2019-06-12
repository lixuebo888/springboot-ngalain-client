import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-sys-menu-edit',
  templateUrl: './edit.component.html',
})
export class SysMenuEditComponent implements OnInit {
  record: any = {};
  i: any;
  menuId: string;
  typeContent: string;

  schema: SFSchema = {
    properties: {
      no: { type: 'string', title: '编号' },
      owner: { type: 'string', title: '姓名', maxLength: 15 },
      callNo: { type: 'number', title: '调用次数' },
      href: { type: 'string', title: '链接', format: 'uri' },
      description: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['owner', 'callNo', 'href', 'description'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  schemaMenu: SFSchema = {
    properties: {
      menuLabel: { type: 'string', title: '菜单名称' },
      menuUrl: { type: 'string', title: '菜单URL' },
    },
    required: ['menuLabel'],
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    // if (this.record.id > 0)
    //   this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }

  saveMenu(value: any) {
    this.http.post(`/menu/${this.menuId}/save`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });

  }
}
