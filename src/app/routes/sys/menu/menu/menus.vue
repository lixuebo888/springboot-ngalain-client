<template lang="html">
  <div class="sysMenuSet common-list arp-pagination">
    <div class="el-c-master-light">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <span class="el-c-primary">菜单管理</span>
      </el-breadcrumb>
    </div>
    
    <arp-fixed-area>
      <div class="com-select">
        <el-form :inline="true" label-width="50px" onsubmit="return false;">
          <el-button type="primary" @click="setDefault('PC', 'PC')">设置PC端默认快捷入口</el-button>
          <el-button type="primary" @click="setDefault('移动', 'mobile')">设置移动端默认快捷入口</el-button>
            <!-- @click="" -->
        </el-form>
      </div>
    </arp-fixed-area>
    

    <div class="table-com">
      <div class="right">
        <div class="tree">
          <el-tree
            :data="regions"
            :props="props"
            :load="loadNode"
            :render-content="renderContent"
            :expand-on-click-node="false"
            @node-expand="handleChildNodeExpand"
            lazy
            @check-change="handleCheckChange">
          </el-tree>
        </div>
        <div class="rightContent" v-loading="fullscreenLoading" element-loading-text="拼命加载中">
          <div class="rightH">
            <ul>
              <li>基本信息</li>
            </ul>
          </div>
          <div class="rightC">
            <el-row>
              <el-form :label-position="labelPosition" label-width="155px" :model="formLabelAlign" >
                <el-col :span="12">
                  <el-form-item label="菜单显示名称：" class="itemt">
                    <el-input placeholder="【必填】" :disabled="disabled" v-model="formLabelAlign.menuLabel" ></el-input>
                  </el-form-item>
                  <el-form-item label="排序：" class="itemt">
                    <el-input type="number" :disabled="disabled"  v-model="formLabelAlign.orderColumn"></el-input>
                  </el-form-item>   
                  <el-form-item label="备注：" class="itemt">
                    <el-input placeholder="【......】" :disabled="disabled"  v-model="formLabelAlign.memo"></el-input>
                  </el-form-item>
                  <el-form-item label="蓝底图标：" class="itemt" >
                    <div class='finish_room'>
                      <div class='finish_room2'>
                        <div v-for='(item1 ,index ) in white_imgs1' class='room_img pc-colour' :class="{ frame: white_frame1 }" :key="index">
                          <img :src="item1">
                          <span v-show="!white_disabled" @click='white_delete_img1(index)'><img src="./img/scc.png" style="height:30px; width:30px;"></span>
                        </div>
                        <div class='room_add_img pc-colour'  :class="{ createDisable: white_createDisable1 }">
                          <span><img src="./img/wtj.png" style="height: 50px;"></span>
                          <span style="color: #fff;">上传图片</span>
                          <input  @change='white_add_img1' :disabled="white_disabled"  type="file">
                        </div>
                      </div>
                    </div>
                  </el-form-item>                                 
                </el-col>
                <el-col :span="12">
                  <el-form-item label="快捷入口显示名称：" class="itemt">
                    <el-input :disabled="disabled" v-model="formLabelAlign.shortCutLabel" ></el-input>
                  </el-form-item>
                  <el-form-item label="菜单URL：" class="itemt" >
                    <el-input placeholder="【#/.../.../...】" :disabled="disabled"  v-model="formLabelAlign.menuUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="是否启用" class="itemt">
                    <el-switch  on-text="是" off-text="否"  :disabled="disabled" on-value="true" off-value="false" v-model="formLabelAlign.isShow"></el-switch>
                  </el-form-item>
                  <el-form-item label="默认图标：" class="itemt" >
                    <div class='finish_room'>
                      <div class='finish_room2'>
                        <div v-for='(item1 ,index ) in imgs1' class='room_img' :class="{ frame: frame1 }" :key="index">
                          <img :src="item1">
                          <span v-show="!disabled" @click='delete_img1(index)'><img src="./img/scc.png" style="height:30px; width:30px;"></span>
                        </div>
                        <div class='room_add_img'  :class="{ createDisable: createDisable1 }">
                          <span><img src="./img/tj.png" style="height: 50px;"></span>
                          <span>上传图片</span>
                          <input  @change='add_img1' :disabled="disabled"  type="file">
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-form>
              </el-row>
              <el-row v-if="showDisabled" style="margin-top: 30px;">
                <el-col :span="24" v-if="disabled"><el-button class="btn1"  @click="edit">编辑</el-button></el-col>
                <el-col :span="12" v-else-if="!disabled"><el-button class="btn2" @click="update">保存</el-button></el-col>
                <el-col :span="12" v-if="!disabled"><el-button class="btn3" @click="cancel">取消</el-button></el-col>
              </el-row>
            </div>
        </div>
      </div>
    </div>
    <setDefaultCommon 
      :formVisible="formVisible" 
      :menuType="menuType" 
      :tableTitle="tableTitle" 
      @setCancel="setCancel"
      @addCommon="addCommon">
      </setDefaultCommon>
      
      <searchOrphanMenuDialog
      :menu="menu"
      :dialogVisible="searchOrphanMenuVisible"
      @addSuccess="addMenuOrphan"
      @addCancel="addMenuOrphanCancel">
     </searchOrphanMenuDialog>
     
  </div>
</template>

<script>
import { LocalMenuAPI } from '../../service/LocalMenuService'
import {Manager} from '../../../../service/LoginInfoManager'
import arpAdvancedSearch from '../../../../components/arp-advancedSearch'
import setDefaultCommon from './setDefaultCommon.vue'
import searchOrphanMenuDialog from './orphanMenu.vue'
export default {
  data () {
    return {
      managerContext: Manager.getContext(),
      menu: {},
      searchOrphanMenuVisible: false,
      dialogVisible: false,
      menuType: 'PC',
      formVisible: false,
      tableTitle: '设置PC端默认快捷入口',
      qx: true,
      ok: true,
      fullscreenLoading: false,
      imgs1: [],
      white_imgs1: [],
      frame: true,
      frame1: true,
      white_frame1: true,
      createDisable: false,
      createDisable1: false,
      white_createDisable1: false,
      fileList2: [],
      showDisabled: false,
      disabled: true,
      white_disabled: true,
      labelPosition: 'right',
      fileList: [],
      formLabelAlign: {
        isShow: '',
        isleaf: '',
        menuLabel: '',
        shortCutLabel: '',
        appUrl: '',
        orderColumn: '',
        sideBarMode: '',
        memo: '',
        menuUrl: ''
      },
      regions: [{
        'name': '',
        'id': ''
      }],
      props: {
        label: 'label',
        children: 'ceshi',
        isLeaf: 'isLeaf'
      },
      count: 1,
      ceshi: [],
      updt: [],
      newdata: {},
      backups: {},
      editSave: {},
      currentNode: null,
      shortCutsWc: {
        type: '',
        shortCuts: []
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/home/')
    },
    copyAttributes (src, dest) {
      dest.menuLabel = src.menuLabel
      dest.shortCutLabel = src.shortCutLabel
      dest.orderColumn = src.orderColumn
      dest.memo = src.memo
      dest.menuUrl = src.menuUrl
      dest.isShow = src.isShow
    },
    // 设置默认常用应用
    setDefault (typeStr, type) {
      this.formVisible = true
      this.tableTitle = `设置${typeStr}端默认快捷入口`
      this.menuType = type
    },
    // 取消设置弹窗
    setCancel (bol) {
      this.formVisible = bol
    },
    //  保存设置
    addCommon (menu, type) {
      let user = JSON.parse(sessionStorage.getItem('user.subject'))
      let arr = []
      for (let i = 0; i < menu.length; i++) {
        arr[i] = {}
        arr[i].corpOrgId = user.corpOrg.orgId
        arr[i].userId = user.user.userId
        arr[i].systemType = this.menuType
        arr[i].menuId = menu[i].id
        arr[i].orderNumber = i
      }
      this.shortCutsWc.type = type
      this.shortCutsWc.shortCuts = arr
      LocalMenuAPI.saveDefaultMenu(this.shortCutsWc).then(res => {
        this.$alert('设置成功！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.setCancel(false)
          }
        })
      }, () => {
        this.$alert('设置失败！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.goInvoiceList()
          }
        })
      })
    },
    cancel () {
      this.disabled = true
      this.white_disabled = true
      if (this.newdata.new === 'yes') {
        this.newdata = {}
        if (this.backups.img === null) {
          this.createDisable1 = false
          this.frame1 = true
        } else if (this.backups.img) {
          this.imgs1[0] = this.backups.img
          this.createDisable1 = true
          this.frame1 = false
        }
        if (this.backups.whiteImg === null) {
          this.white_createDisable1 = false
          this.white_frame1 = true
        } else if (this.backups.whiteImg) {
          this.white_imgs1[0] = this.backups.whiteImg
          this.white_createDisable1 = true
          this.white_frame1 = false
        }
        this.copyAttributes(this.backups, this.formLabelAlign)
        this.$message('新建未保存')
      } else {
        if (this.editSave.img === null) {
          if (this.imgs1 !== null) {
            this.imgs1[0] = null
          }
          this.createDisable1 = false
          this.frame1 = true
        } else if (this.editSave.img) {
        }
        if (this.editSave.whiteImg === null) {
          if (this.white_imgs1 !== null) {
            this.white_imgs1[0] = null
          }
          this.white_createDisable1 = false
          this.white_frame1 = true
        } else if (this.editSave.whiteImg) {
        }
        this.copyAttributes(this.editSave, this.formLabelAlign)
        this.$message('编辑未保存')
      }
    },
//    修改上传
    delete_img1 (item) {
      this.imgs1 = []
      this.createDisable1 = false
    },
    white_delete_img1 (item) {
      this.white_imgs1 = []
      this.white_createDisable1 = false
    },
    add_img1 (event) {
      var reader = new FileReader()
      var img2 = event.target.files[0]
      reader.readAsDataURL(img2)
      var that = this
      reader.onloadend = function () {
        that.imgs1.push(reader.result)
      }
      this.imgs1.splice(0, 1)
      this.createDisable1 = true
      this.frame1 = false
      event.path[0].value = ''
    },
    white_add_img1 (event) {
      var reader = new FileReader()
      var img2 = event.target.files[0]
      reader.readAsDataURL(img2)
      var that = this
      reader.onloadend = function () {
        that.white_imgs1.push(reader.result)
      }
      this.white_imgs1.splice(0, 1)
      this.white_createDisable1 = true
      this.white_frame1 = false
      event.path[0].value = ''
    },
//    end
    mouseenter (store, data) {
    },
    append (store, data, node) {
      this.disabled = false
      this.white_disabled = false
      this.copyAttributes(this.formLabelAlign, this.backups)
      this.currentNode = node
      this.backups.img = this.imgs1[0]
      this.backups.whiteImg = this.white_imgs1[0]
      this.newdata.new = 'yes'
      this.newdata.parentId = data.id
      this.formLabelAlign.menuLabel = ''
      this.formLabelAlign.shortCutLabel = ''
      this.formLabelAlign.appUrl = ''
      this.formLabelAlign.orderColumn = ''
      this.formLabelAlign.memo = ''
      this.formLabelAlign.menuUrl = ''
      this.imgs = []
      this.createDisable = false
      this.imgs1 = []
      this.white_imgs1 = []
      this.createDisable1 = false
      this.white_createDisable1 = false
      this.formLabelAlign.isShow = ''
      this.showDisabled = true
    },

    remove (store, data, node) {
      const delId = data.dat.id
      var r = confirm('该菜单对应的角色、部门、分组关联关系将一并删除，是否确认删除？')
      if (r === true) {
        LocalMenuAPI.remove(delId).then(data => {
          this.$message('删除成功！')
          node.parent.removeChild(node)
        }, () => {
          this.$message({
            type: 'warning',
            message: '删除失败！'
          })
        })
      } else {
        return false
      }
    },
    edit () {
      this.copyAttributes(this.formLabelAlign, this.editSave)
      this.editSave.img = this.imgs1[0]
      this.editSave.whiteImg = this.white_imgs1[0]
      this.disabled = false
      this.white_disabled = false
    },
    update () {
      const upd = this.updt
      const newpd = this.newdata
      upd.img = this.imgs1[0]
      upd.whiteImg = this.white_imgs1[0]
      this.copyAttributes(this.formLabelAlign, upd)
      if (!upd.menuLabel) {
        alert('请输入菜单名称')
        return
      } else {
        if (newpd.new === 'yes') {
          const newd = {}
          const pid = this.newdata
          newd.parentId = pid.parentId
          newd.img = this.imgs1[0]
          newd.whiteImg = this.white_imgs1[0]
          this.copyAttributes(this.formLabelAlign, newd)
          LocalMenuAPI.create(newd).then(res => {
            if (res.data) {
              this.$message('新建成功')
              this.currentNode.loaded = false
              this.currentNode.loadData()
            }
          })
          newpd.new = ''
        } else {
          LocalMenuAPI.update(upd).then(res => {
            if (res.data) {
              this.$message('更新成功')
              this.currentNode.parent.loaded = false
              this.currentNode.parent.loadData()
            }
          })
        }
      }
      this.disabled = true
      this.white_disabled = true
    },
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    handleChildNodeExpand (data, node, event) {
    },
    handleCheckChange (data, checked, indeterminate) {
    },
    handleNodeClick (data, node) {
      let user = JSON.parse(sessionStorage.getItem('user.subject'))
      if (user.corpOrg.orgId === data.dat.corpOrgId) {
        this.showDisabled = true
      } else {
        this.showDisabled = false
      }
      this.currentNode = node
      this.disabled = true
      this.white_disabled = true
      this.updt = node.data.dat
      if (node.data.dat.img === null) {
        this.createDisable1 = false
        this.frame1 = true
      } else if (node.data.dat.img) {
        this.createDisable1 = true
        this.frame1 = false
      }
      if (node.data.dat.whiteImg === null) {
        this.white_createDisable1 = false
        this.white_frame1 = true
      } else if (node.data.dat.whiteImg) {
        this.white_createDisable1 = true
        this.white_frame1 = false
      }
      if (node.data.dat) {
        this.imgs1[0] = node.data.dat.img
        this.white_imgs1[0] = node.data.dat.whiteImg
        this.copyAttributes(node.data.dat, this.formLabelAlign)
      }
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 400)
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        LocalMenuAPI.findChildren('-1').then(res => {
          let pdata = []
          for (let val of res.data) {
            pdata.push({label: val.menuLabel, id: val.id, isLeaf: val.childrenCount === 0, dat: val})
          }
          resolve(pdata)
        })
      } else {
        LocalMenuAPI.findChildren(node.data.id).then(res => {
          let pdata = []
          for (let val of res.data) {
            pdata.push({label: val.menuLabel, id: val.id, isLeaf: val.childrenCount === 0, dat: val})
          }
          resolve(pdata)
        })
      }
    },
    showMenuOrphan (data, node) {
      this.menu = data.dat
      this.currentNode = node
      this.searchOrphanMenuVisible = true
    },
    addMenuOrphan () {
      this.currentNode.loadData()
    },
    addMenuOrphanCancel () {
      this.menu = {}
      this.searchOrphanMenuVisible = false
    },
    renderContent (h, { node, data, store }) {
      let isSuperAdmin = this.managerContext.isSuperAdmin()
      let user = JSON.parse(sessionStorage.getItem('user.subject'))
      if (isSuperAdmin) {
        if (node.level !== 1) {
          if (user.corpOrg.orgId === data.dat.corpOrgId) {
            return (
            <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.append(store, data, node)} icon="plus"></el-button>
                <el-button size="mini" on-click={ () => this.remove(store, data, node) } icon="delete"></el-button>
              </div>
            </span>
            )
          } else {
            return (
              <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.append(store, data, node)}icon="plus"></el-button>
              </div>
            </span>
            )
          }
        } else {
          return (
            <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.append(store, data, node)}icon="plus"></el-button>
              </div>
            </span>
          )
        }
      } else {
        if (node.level !== 1) {
          if (user.corpOrg.orgId === data.dat.corpOrgId) {
            return (
            <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.showMenuOrphan(data, node)}>
                <i class="fa fa-chain"></i></el-button>
                <el-button size="mini" on-click={ () => this.append(store, data, node)} icon="plus"></el-button>
                <el-button size="mini" on-click={ () => this.remove(store, data, node) } icon="delete"></el-button>
              </div>
            </span>
            )
          } else {
            return (
              <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.showMenuOrphan(data, node)}><i class="fa fa-chain"></i></el-button>
                <el-button size="mini" on-click={ () => this.append(store, data, node)}icon="plus"></el-button>
              </div>
            </span>
            )
          }
        } else {
          return (
            <span class="tree_node">
              <span>
                <span on-click={ () => this.handleNodeClick(data, node) }>{node.label}</span>
              </span>
              <div class="btnr" style="float: right; margin-right: 20px">
                <el-button size="mini" on-click={ () => this.showMenuOrphan(data, node)}><i class="fa fa-chain"></i></el-button>
                <el-button size="mini" on-click={ () => this.append(store, data, node)}icon="plus"></el-button>
              </div>
            </span>
          )
        }
      }
    }
  },
  mounted: function () {
  },
  components: {
    arpAdvancedSearch, setDefaultCommon, searchOrphanMenuDialog
  }
}
</script>
<style>
	.common-list .el-table__header-wrapper th{
		position: relative;
	}
	.common-list .el-table__header-wrapper th:after{
		content: "\200B";
		display: inline-block;
		width: 1px;
		height: 20px;
		background: #dcdce8;
		position: absolute;
		right: 0;
		top: 4px;
	}
	.common-list .el-table__header-wrapper th:nth-last-child(2):after{
		background: none;
	}

  .pc-colour {
    background-color: #327de7
  }
</style>
<style rel="stylesheet/sass" lang="sass">
	.common-list
		.el-table__header-wrapper
			border-bottom: 1px solid #dcdce8
	.common-list
		.el-form-item
			.el-input
				min-width: 80px
	.common-list
		.el-table__body-wrapper
			.el-table__row
				td:nth-last-child(1)
					.cell
						visibility: hidden!important

	.common-list
		.el-table__body-wrapper
			.el-table__row:hover
				td:nth-last-child(1)
					.cell
						visibility: visible!important

		.el-table__header-wrapper th
			/*border-right: 1px solid #e1e1e1*/
			border-bottom: none!important

		.el-table__header-wrapper th:nth-last-child(2)
			border-right: none!important
		.pagination-com .el-pagination__total
			margin-top: -3px

		.pagination-com .el-pagination__sizes
			margin-top: -3px
		.com-select .el-form-item
				margin-bottom: 0 !important
				margin-right: 20px
</style>

<style scoped rel="stylesheet/sass" lang="sass">
	.tran-an-enter, .tran-an-leave-to
		transform: translateY(-10px)
		opacity: 0

	.tran-an-enter-active
		transition: all .3s ease
	.tran-an-leave-active
		transition: all .3s ease


	.senior-com:before
		position: absolute
		top: -4px
		right: 20px
		content: " "
		width: 5px
		height: 5px
		background-color: #fff
		border-left: 1px solid #42a5f5
		border-top: 1px solid #42a5f5
		transform: rotate(45deg)
	.senior-com
		position: absolute
		right: 0
		top: 50px
		padding: 5px
		z-index: 99
		background-color: #fff
		border-style: solid
		border-width: 1px
		box-shadow: 0px 0px 5px #bbb
		border-radius: 3px

	.isCheck
		position: relative
		i
			transition: transform .3s
			transform: rotate(360deg)
	.temp-cb
		font-size: 12px
		position: absolute
		top: 73px
		/*left: 100px*/

	.cursor
		cursor: pointer
	.font-size-12
		font-size: 12px
		transform: rotate(180deg)
	.pagination-com
		text-align: right
		margin-top: 20px
		margin-bottom: 20px

	.w-71
		width: 71px
	.table-com
		padding: 10px

	.next-title
		padding: 10px 0
		background: #e8ebf1

	.icon-com
		width: 20px
		height: 20px
	.w-260
		width: 260px
	.com-select
		padding: 10px 15px
		height: 35px
	.w-70
		width: 70px
	.isFixed
		position: fixed
		background-color: #Fff
		top: 0
		z-index: 999
		width: 92%
</style>

<style lang="scss" scoped>
.table-com{
  .right{
    margin-right: 20px;
    display: flex;
  }
  .tree{
    width: 370px;
    font-size: 14px;
    font-family: '微软雅黑';
    text-align: left;
    margin-right: 10px;
    margin-left: 10px;
  }
  .rightContent{
    width: 100%;
    height: fit-content;
    padding-left: 5px;
    background-color: #fff;
    border: 1px solid #d1dbe5;
    .rightH{
      height: 43px;
      /* padding: 0 20px; */
      border: none;
      border-bottom: 1px solid #dedede;
      ul{
        width: 105px;
        height: 43px;
        line-height: 43px;
      /* padding: 0 20px; */
        
        border: none;
        border-bottom: 1px solid #dedede;
        li{
          color: #0181e4;
          border-bottom: 2px solid #0181e4;
          text-align: center;
        }
      }
    }
    .rightC{
      padding: 20px;
    }
  }
}
</style>


<style lang="scss" scoped>
.sysMenuSet {
  .com-select {
    background: #fff;
    margin-top: 10px;
  }
  .table-com {
    background: #fff;
    margin-top: 10px;
  }
}
img{
  border: 0
}
html,body{
  width: 100%;
  height: 100%;
}
.btn1{
  color: #0181e4;
  border-color: #0181e4;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
  padding: 5px 8px;
  min-width: 80px;
  height: 34px;
}
.btn2{
  color: #fff;
  border-color: #f90;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
  padding: 5px 8px;
  min-width: 80px;
  height: 34px;
  float: right;
  background-color: #f90;
}
.btn3{
  color: #fff;
  border-color: #f90;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 16px;
  padding: 5px 8px;
  min-width: 80px;
  height: 34px;
  float: left;
  background-color: #f90;
}
.btn1:hover{
  color: #fff;
  background-color: #0181E4;
}
.btn2:hover{
  background-color:rgba(255, 153, 0, 0.8);
}
.el-tree-node__content:hover{
  .el-button {
    display: block;
  }
}
.el-tree-node__content{
  .el-button {
    display: none;
  }
}

.finish_room{
  height: auto;
}
.finish_room2{
  width: 100%;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
}
.finish_room2 .room_img{
  width: 150px;
  height: 100px;
  margin-right: 10px;
  overflow: hidden;
}
.finish_room2 .room_img img{

  width: 100%;
  height: 100%;
}
.finish_room2>.room_img span{
  position: absolute;
  width: auto;
  height: auto;
  right: 5px;
  bottom:3px;
}
.room_add_img{
  width: 148px;
  height: 98px;
  text-align: center;
  border:1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.room_add_img >span:nth-child(1){
  margin-top: 10px;
  width: 120px;
  /*height: 40px;*/
  overflow: hidden;
}
.room_add_img >span:nth-child(2){
  margin-bottom: 5px;
}
.room_add_img input{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 69;
  opacity: 0;
}
.createDisable,.frame{
  display: none;
}
.createDisable1,.frame1{
  display: none;
}
.white_createDisable1,.white_frame1{
  display: none;
}
</style>
<style lang="scss">
.sysMenuSet .el-tree-node__content:hover  .btnr{
  display: block;
}
.sysMenuSet .btnr {
  display: none;
}
.sysMenuSet .btnr:hover {
  display: block;
}
</style>