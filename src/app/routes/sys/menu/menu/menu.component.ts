import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzTreeComponent, NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { SysMenuEditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-sys-menu-menu',
  templateUrl: './menu.component.html',
})
export class SysMenuMenuComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService) {}

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
  @ViewChild('treeCom') treeCom: NzTreeComponent;
  searchValue: any;

  menuType: string; // 1添加,2编辑

  ngOnInit() {
    this.getNodes();
  }

  public getNodes() {
    this.http.get(`/menu/list`).subscribe(res => {
      this.nodeList = res;
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event, this.treeCom.getMatchedNodeList().map(v => v.title), this.treeCom.getExpandedNodeList());
  }
  public plusMenu(node: any) {
    this.modal
      .createStatic(SysMenuEditComponent, { menuType: 1, typeContent: '添加', node })
      .subscribe(res => this.getNodes());
  }

  public editMenu(node: any) {
    this.modal
      .createStatic(SysMenuEditComponent, { menuType: 2, typeContent: '编辑', node })
      .subscribe(res => this.getNodes());
  }

  public deleteMenu(node: any) {
    this.http.post(`/menu/${node.id}/delete`).subscribe(res => {
      this.getNodes();
      this.msgSrv.success('删除成功');
    });
  }

  highLightTest(node: any) {
    const text = node.title;
    const searchKey = node.component.nzSearchValue;
    const index = text.indexOf(searchKey);
    return ~index ? text.replace(searchKey, `<span class="font-highlight">${searchKey}</span>`) : text;
  }
}
