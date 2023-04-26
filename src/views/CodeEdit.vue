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

                <el-tree :data="data" :props="defaultProps" highlight-current=true node-key="label" ref="DeviceGroupTree"
                  :expand-on-click-node=false @node-click="handleNodeClick">

                  <template v-slot="{ node }">
                    <span class="custom-tree-node">
                      <span>{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
                <el-button type="text" v-if="selected == 'folder' || selected == 'src_root'" @click="() => newFile()">
                  新文件
                </el-button>
                <el-button type="text" v-if="selected == 'ip_root'" @click="() => newIp()">
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
                <ace v-model="content" v-if="selected == 'file' || selected == 'xdc'" ref="MyAce" @mychange="edited">
                </ace>
                <div v-if="selected == 'ipcore'" class="m-4">
                  <p>类型</p>
                  <el-select v-model="ipcore_params._meta_type" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const__meta_type" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>

                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'clk_wiz'" class="m-4">
                  <p>CLKOUT1_REQUESTED_OUT_FREQ</p>
                  <el-input v-model="ipcore_params.CLKOUT1_REQUESTED_OUT_FREQ" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="50.000" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'clk_wiz'" class="m-4">
                  <p>CLKOUT2_USED</p>
                  <el-select v-model="ipcore_params.CLKOUT2_USED" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const_bool" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'clk_wiz'" class="m-4">
                  <p>CLKOUT2_REQUESTED_OUT_FREQ</p>
                  <el-input v-model="ipcore_params.CLKOUT2_REQUESTED_OUT_FREQ" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="23.456" />
                </div>

                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>depth</p>
                  <el-input v-model="ipcore_params.depth" class="w-40" style="width: 240px" @change="params_change" placeholder="16" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>data_width</p>
                  <el-input v-model="ipcore_params.data_width" class="w-40" style="width: 240px" @change="params_change" placeholder="16" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>memory_type</p>
                  <el-select v-model="ipcore_params.memory_type" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const_memory_type" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>default_data_radix</p>
                  <el-select v-model="ipcore_params.default_data_radix" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const_default_data_radix" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>default_data</p>
                  <el-input v-model="ipcore_params.default_data" class="w-40" style="width: 240px" @change="params_change" placeholder="0000" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'dist_mem_gen'" class="m-4">
                  <p>coefficient_file</p>
                  <el-input v-model="ipcore_params.coefficient_file" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="../../../../qwq.coe" />
                </div>

                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Memory_Type</p>
                  <el-select v-model="ipcore_params.Memory_Type" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const_Memory_Type" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Write_Depth_A</p>
                  <el-input v-model="ipcore_params.Write_Depth_A" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="512" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Write_Width_A</p>
                  <el-input v-model="ipcore_params.Write_Width_A" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="512" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Read_Width_A</p>
                  <el-input v-model="ipcore_params.Read_Width_A" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="512" />
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Load_Init_File</p>
                  <el-select v-model="ipcore_params.Load_Init_File" placeholder="Select" style="width: 240px" @change="params_change">
                    <el-option v-for="item in const_bool" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
                <div v-if="selected == 'ipcore' && ipcore_params._meta_type == 'blk_mem_gen'" class="m-4">
                  <p>Coe_File</p>
                  <el-input v-model="ipcore_params.Coe_File" class="w-40" style="width: 240px" @change="params_change"
                    placeholder="512" />
                </div>



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
      ipcore_params: {
      },
      const_bool: [
        {
          value: true,
          label: "true",
        },
        {
          value: false,
          label: "false",
        },
      ],
      const_Memory_Type: [
        {
          value: "Single_Port_RAM",
          label: "Single_Port_RAM",
        },
      ],
      const_default_data_radix: [
        {
          value: 2,
          label: '2',
        },
        {
          value: 10,
          label: '10',
        },
        {
          value: 16,
          label: '16',
        },
      ],
      const_memory_type: [
        {
          value: 'rom',
          label: 'rom',
        },
        {
          value: 'single_port_ram',
          label: 'single_port_ram',
        },
        {
          value: 'simple_dual_port_ram',
          label: 'simple_dual_port_ram',
        },
        {
          value: 'dual_port_ram',
          label: 'dual_port_ram',
        },
      ],
      const__meta_type: [
        {
          value: 'clk_wiz',
          label: '时钟',
        },
        {
          value: 'dist_mem_gen',
          label: 'dist_mem_gen',
        },
        {
          value: 'blk_mem_gen',
          label: 'blk_mem_gen',
        },
      ],
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
      if (data.type == "file"){
        this.content = data.text
        this.$refs.MyAce.setValue(this.content)
      }
      else if(data.type == "ipcore")
        this.ipcore_params = data.params
    },
    params_change(){
      this.notsaved = true
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
        node.children.push({ label: value, type: "file", text: "" })
        this.notsaved = true
      })
    },
    newIp() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode()
      this.$prompt("请输入ip组件名", "ip组件名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        node.children.push({ label: value, type: "ipcore", params: {} })
        this.notsaved = true
      })
    },
    newFolder() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode()
      this.$prompt("请输入文件夹名", "文件夹名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        node.children.push({ label: value, type: "folder", children: [] })
        this.notsaved = true
      })
    },
    clickDelete() {
      var key = this.$refs.DeviceGroupTree.getCurrentKey()
      var node = this.$refs.DeviceGroupTree.getNode(key)
      const children = node.parent.childNodes;
      const index = children.findIndex(d => d.id === node.id);
      children.splice(index, 1);
      this.notsaved = true
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
