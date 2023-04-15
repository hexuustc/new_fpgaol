<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7 px-0 ">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Edit</h6>
                  <h3 v-if="!notsaved" class="nav-link-text text-center ls-1 mb-1 h3">代码编辑</h3>
                  <h3 v-if="notsaved" class="nav-link-text text-center ls-1 mb-1 h3">代码编辑 - 未保存</h3>
                </div>
              </div>
            </template>
            <div class="row">
              <div class="col-2">
                
                <el-tree :data="data" :props="defaultProps" highlight-current=true
                  node-key="label" ref="DeviceGroupTree" :expand-on-click-node=false @node-click="handleNodeClick">

                  <template v-slot="{ node }">
                    <span class="custom-tree-node">
                      <span>{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
                <el-button type="text" v-if="selected == 'folder' || selected == 'src_root'" @click="() => newFile()">
                  新文件
                </el-button>
                <el-button type="text" v-if="selected == 'ip_root'">
                  新IP核
                </el-button>
                <el-button type="text" v-if="selected == 'folder' || selected == 'src_root'" @click="() => newFolder()">
                  新文件夹
                </el-button>
                <el-button type="text" v-if="selected == 'ipcore' || selected == 'folder' || selected == 'file'"
                  @click="() => clickDelete()">
                  删除
                </el-button>
                <el-button type="text" v-if="selected == 'ipcore' || selected == 'folder' || selected == 'file'"
                  @click="() => clickRename()">
                  重命名
                </el-button>
              </div>
              <div class="col-10">
                <ace v-model="content" v-if="selected=='file'||selected=='xdc'" ref="MyAce" @mychange="edited"></ace>
              </div>
              <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="savecode"> 保存 </base-button>
              </div>
              <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="compile"> debug </base-button>
              </div>
              <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="clean"> clean storage </base-button>
              </div>
              <div class="col-2 mt-2">
                {{ save_message }}
              </div>
            </div>
          </card>
        </div>
      </div>

      <!-- End charts-->
    </div>
  </div>
</template>
<script>
// Charts


import ace from "../components/CustomAce.vue";
export default {
  components: {
    ace,
  },
  data() {
    return {
      notsaved: false,
      menuVisible: false,
      selected: "",
      save_message: "message here",
      content: "",
      data: [{
        label: "source",
        type: "src_root",
        children: [{
          label: "top.v",
          type: "file",
          text: "module top(\n\
  input [7:0] sw,\n\
  output [7:0] led\n\
  );\n\
  \n\
  assign led = sw;\n\
  \n\
endmodule\n"},
        {
          label: "alu.v",
          type: "file",
          text: "",
        }, {
          label: "decode.v",
          type: "file",
          text: "",
        },
        {
          label: "imm.v",
          type: "file",
          text: "",
        },
        {
          label: "Regfile.v",
          type: "file",
          text: "",
        }
        ]
      }, {
        label: "ipcore",
        type: "ip_root",
        children: []
      },
      {
        label: "fpgaol.xdc",
        type: "xdc",
        text: "fdfd",
      }],
      defaultProps: {
        children: "children",
        label: "label"
      }

    };
  },
  mounted() {
    if (localStorage.code_data == undefined) {
      this.init_localstorage();
    }

    this.data = JSON.parse(localStorage.getItem("code_data"));
  },
  methods: {
    init_localstorage() {
      localStorage.setItem("code_data", JSON.stringify(this.data));
    },
    clean() {
      localStorage.removeItem("code_data");
    },
    handleNodeClick(data) {
      this.selected = data.type
    },
    edited() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode()
      node.text = this.content
      this.notsaved = true
    },
    savecode() {
      localStorage.setItem("code_data", JSON.stringify(this.data));
      this.notsaved = false
      console.log(JSON.stringify(this.data))
    },
    newFile() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode()
      this.$prompt("请输入文件名", "文件名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        node.children.push({ "label": value, "text": "" })
        this.notsaved = true
      })
    },
    newFolder() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode()
      this.$prompt("请输入文件夹名", "文件夹名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        node.children.push({ "label": value, "children": [] })
        this.notsaved = true
      })
    },
    clickDelete() {
      var key = this.$refs.DeviceGroupTree.getCurrentKey()
      var node = this.$refs.DeviceGroupTree.getNode(key)
      const children = node.parent.childNodes;
      const index = children.findIndex(d => d.id === node.id);
      children.splice(index, 1);

    },
    clickRename() {
      this.$prompt("请输入新名字", "新名字", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        var node = this.$refs.DeviceGroupTree.getCurrentNode()
        node.label = value
        this.notsaved = true
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消输入"
        });
      });
    },
    compile() {
      console.log(this.data)
      //this.$router.push("/compile");
    }
  }

};
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
