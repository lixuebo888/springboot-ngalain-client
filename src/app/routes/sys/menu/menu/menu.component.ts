import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {
  NzTreeComponent,
  NzFormatEmitEvent,
  NzDropdownContextComponent,
  NzTreeNode,
  NzDropdownService,
  NzMessageService,
} from 'ng-zorro-antd';
import { SysMenuEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-sys-menu-menu',
  templateUrl: './menu.component.html',
})
export class SysMenuMenuComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private nzDropdownService: NzDropdownService,
    private msgSrv: NzMessageService,
  ) { }
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  @ViewChild('treeCom') treeCom: NzTreeComponent;
  searchValue: any;

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true,
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true,
    },
  ];

  nodeList = [];

  ngOnInit() {
    this.getNodes();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event, this.treeCom.getMatchedNodeList().map(v => v.title), this.treeCom.getExpandedNodeList());
  }
  public getNodes() {
    this.http.get(`/menu/list`).subscribe(res => {
      this.nodeList = res;
    });
  }

  menuId: string;
  public plusMenu(node: any) {
    this.menuId = node.id;
    this.modal.createStatic(SysMenuEditComponent, { menuId: this.menuId, typeContent: "编辑" }).subscribe(() => this.st.reload());
  }

  public editMenu(node: any) {
    console.log(node);
  }

  public deleteMenu(node: any) {
    console.log(node);
  }

  // form表单部分======================================
  i: any;

  schema: SFSchema = {
    properties: {
      menuLabel: { type: 'string', title: '菜单名称' },
      menuUrl: { type: 'string', title: '菜单URL' },
    },
    required: ['menuLabel'],
  };

  save(value: any) {
    this.http.post(`/menu/${this.menuId}/save`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.getNodes();
    });
  }
}
