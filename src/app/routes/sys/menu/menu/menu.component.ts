import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {
  NzTreeComponent,
  NzFormatEmitEvent,
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
  ) { }

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

  ngOnInit() {
    this.getNodes();
  }

  public getNodes() {
    this.http.get(`/menu/list`).subscribe(res => {
      this.nodeList = res;
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event, this.treeCom.getMatchedNodeList().map(v => v.title), this.treeCom.getExpandedNodeList());
  }

  menuId: string;
  public plusMenu(node: any) {
    this.menuId = node.id;
    this.modal.createStatic(SysMenuEditComponent, { menuId: this.menuId, typeContent: "编辑" }).subscribe(res => this.getNodes());
  }

  public editMenu(node: any) {
    console.log(node);
  }

  public deleteMenu(node: any) {
    console.log(node);
  }

}
