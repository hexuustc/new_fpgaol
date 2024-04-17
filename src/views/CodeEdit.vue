<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7 px-0">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Edit</h6>
                  <h3
                    v-if="!notsaved"
                    class="nav-link-text text-center ls-1 mb-1 h3"
                  >
                    代码编辑
                  </h3>
                  <h3
                    v-if="notsaved"
                    class="nav-link-text text-center ls-1 mb-1 h3"
                  >
                    代码编辑 - 未保存
                  </h3>
                </div>
              </div>
            </template>
            <div class="row">
              <div class="col-2">
                <el-tree
                  :key="treeRenderKey"
                  :data="data"
                  :props="defaultProps"
                  highlight-current="true"
                  node-key="id"
                  ref="DeviceGroupTree"
                  :expand-on-click-node="false"
                  @node-click="handleNodeClick"
                >
                  <template v-slot="{ node }">
                    <span class="custom-tree-node">
                      <span>{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
                <el-button
                  type="text"
                  v-if="selected == 'folder' || selected == 'src_root'"
                  @click="() => newFile()"
                >
                  新文件
                </el-button>
                <el-button
                  type="text"
                  v-if="selected == 'code_folder' || data.length == 0"
                  @click="() => newCodeFolder()"
                >
                  新工程
                </el-button>
                <el-button
                  type="text"
                  v-if="selected == 'ip_root'"
                  @click="() => newIp()"
                >
                  新IP核
                </el-button>
                <!-- <el-button
                  type="text"
                  v-if="selected == 'folder' || selected == 'src_root'"
                  @click="() => newFolder()"
                >
                  新文件夹
                </el-button> -->
                <el-button
                  type="text"
                  v-if="
                    selected == 'ipcore' ||
                    selected == 'folder' ||
                    selected == 'file'   ||
                    selected == 'code_folder' ||
                    selected == 'CompileId'
                  "
                  @click="() => clickDelete()"
                >
                  删除
                </el-button>
                <el-button
                  type="text"
                  v-if="
                    selected == 'ipcore' ||
                    selected == 'folder' ||
                    selected == 'file'   
                  "
                  @click="() => clickRename()"
                >
                  重命名
                </el-button>
              </div>
              <div class="col-10">
                <ace
                  v-model="content"
                  v-if="selected == 'file' || selected == 'xdc' || selected=='CompileId'"
                  ref="MyAce"
                  @mychange="edited"
                >
                </ace>
                <div v-if="selected == 'ipcore'" class="m-4">
                  <p>类型</p>
                  <el-select
                    v-model="ipcore_params._meta_type"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const__meta_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>

                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'clk_wiz'
                  "
                  class="m-4"
                >
                  <p>CLKOUT1_REQUESTED_OUT_FREQ</p>
                  <el-input
                    v-model="ipcore_params.CLKOUT1_REQUESTED_OUT_FREQ"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="50.000"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'clk_wiz'
                  "
                  class="m-4"
                >
                  <p>CLKOUT2_USED</p>
                  <el-select
                    v-model="ipcore_params.CLKOUT2_USED"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const_bool"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'clk_wiz'
                  "
                  class="m-4"
                >
                  <p>CLKOUT2_REQUESTED_OUT_FREQ</p>
                  <el-input
                    v-model="ipcore_params.CLKOUT2_REQUESTED_OUT_FREQ"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="23.456"
                  />
                </div>

                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>depth</p>
                  <el-input
                    v-model="ipcore_params.depth"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="16"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>data_width</p>
                  <el-input
                    v-model="ipcore_params.data_width"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="16"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>memory_type</p>
                  <el-select
                    v-model="ipcore_params.memory_type"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const_memory_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>default_data_radix</p>
                  <el-select
                    v-model="ipcore_params.default_data_radix"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const_default_data_radix"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>default_data</p>
                  <el-input
                    v-model="ipcore_params.default_data"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="0000"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'dist_mem_gen'
                  "
                  class="m-4"
                >
                  <p>coefficient_file</p>
                  <el-input
                    v-model="ipcore_params.coefficient_file"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="../../../../qwq.coe"
                  />
                </div>

                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Memory_Type</p>
                  <el-select
                    v-model="ipcore_params.Memory_Type"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const_Memory_Type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Write_Depth_A</p>
                  <el-input
                    v-model="ipcore_params.Write_Depth_A"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="512"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Write_Width_A</p>
                  <el-input
                    v-model="ipcore_params.Write_Width_A"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="512"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Read_Width_A</p>
                  <el-input
                    v-model="ipcore_params.Read_Width_A"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="512"
                  />
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Load_Init_File</p>
                  <el-select
                    v-model="ipcore_params.Load_Init_File"
                    placeholder="Select"
                    style="width: 240px"
                    @change="params_change"
                  >
                    <el-option
                      v-for="item in const_bool"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div
                  v-if="
                    selected == 'ipcore' &&
                    ipcore_params._meta_type == 'blk_mem_gen'
                  "
                  class="m-4"
                >
                  <p>Coe_File</p>
                  <el-input
                    v-model="ipcore_params.Coe_File"
                    class="w-40"
                    style="width: 240px"
                    @change="params_change"
                    placeholder="512"
                  />
                </div>
              </div>
              <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="savecode" title="将代码保存至云端">
                  保存
                </base-button>
              </div>
              <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="compile" :disabled="isCompiling" title="将选中的代码工程提交编译">
                  编译
                </base-button>
              </div>
              <!-- <div class="col-2 mt-2">
                <base-button size="md" type="info" @click="clean">
                  clean storage
                </base-button>
              </div> -->
              <!-- <div class="col-2 mt-2">
                {{ save_message }}
              </div> -->
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

import axios from "axios";
import ace from "../components/CustomAce.vue";
export default {
  components: {
    ace,
  },
  data() {
    return {
      treeRenderKey: 0,
      notsaved: false,
      menuVisible: false,
      selected: "",
      selectedNode: "",
      selectedNodeId:"",
      save_message: "message here",
      content: "",
      ipcore_params: {},
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
          label: "2",
        },
        {
          value: 10,
          label: "10",
        },
        {
          value: 16,
          label: "16",
        },
      ],
      const_memory_type: [
        {
          value: "rom",
          label: "rom",
        },
        {
          value: "single_port_ram",
          label: "single_port_ram",
        },
        {
          value: "simple_dual_port_ram",
          label: "simple_dual_port_ram",
        },
        {
          value: "dual_port_ram",
          label: "dual_port_ram",
        },
      ],
      const__meta_type: [
        {
          value: "clk_wiz",
          label: "时钟",
        },
        {
          value: "dist_mem_gen",
          label: "dist_mem_gen",
        },
        {
          value: "blk_mem_gen",
          label: "blk_mem_gen",
        },
      ],
//       data: [
//         {
//           label: "source",
//           type: "src_root",
//           children: [
//             {
//               label: "top.v",
//               type: "file",
//               text:
//                 "module top(\n\
//   input [7:0] sw,\n\
//   output [7:0] led\n\
//   );\n\
//   \n\
//   assign led = sw;\n\
//   \n\
// endmodule\n",
//             },
//           ],
//         },
//         {
//           label: "ipcore",
//           type: "ip_root",
//           children: [],
//         },
//         {
//           label: "fpgaol.xdc",
//           type: "xdc",
//           text: "## copy the xdc file and paste here",
//         },
//       ],
      init_data: {
        label: "代码1",
        type: "code_folder",
        children:
        [
          {
            label: "source",
            type: "src_root",
            children: [
              {
                label: "top.v",
                type: "file",
                text:
                  "module top(\n\
  input [7:0] sw,\n\
  output [7:0] led\n\
  );\n\
  \n\
  assign led = sw;\n\
  \n\
endmodule\n",
              },
            ],
          },
          {
            label: "ipcore",
            type: "ip_root",
            children: [],
          },
          {
            label: "fpgaol.xdc",
            type: "xdc",
            text: "## copy the xdc file and paste here",
          },
        ]
      },
      data: [{
        label: "代码1",
        type: "code_folder",
        children:
        [
          {
            label: "source",
            type: "src_root",
            children: [
              {
                label: "top.v",
                type: "file",
                text:
                  "module top(\n\
  input [7:0] sw,\n\
  output [7:0] led\n\
  );\n\
  \n\
  assign led = sw;\n\
  \n\
endmodule\n",
              },
            ],
          },
          {
            label: "ipcore",
            type: "ip_root",
            children: [],
          },
          {
            label: "fpgaol.xdc",
            type: "xdc",
            text: "## copy the xdc file and paste here",
          },
        ]
      }],
      defaultProps: {
        children: "children",
        label: "label",
      },
      res:{},
      isCompiling: false,
    };
  },
  mounted() {
    let token = localStorage.getItem('Authorization');
    var form = new FormData();
    form.append('token', token)
    axios
        .post('http://202.38.79.96:9001/code', form)
        .then(response => {
            console.log(response.data);
            switch(response.data.code) {
                case 0:
                    // 如果code为0，跳转到登录页面
                    this.$router.push('/login');
                    break;
                case 1:
                    // 如果code为1，将返回的数据赋给data
                    this.data = response.data.data;
                    break;
                case 2:
                    // 如果code为2，设置data为默认值
                    console.log("no remote data");
                    break;
                default:
                    // 处理其他情况
                    console.error('未知的响应代码');
            }
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
    // if (localStorage.getItem("code_data") === null) {
    //   this.init_localstorage();
    // }
    // this.data = JSON.parse(localStorage.getItem("code_data"));
    this.assignIdsTree();
  },
  methods: {
    // init_localstorage() {
    //   localStorage.setItem("code_data", JSON.stringify(this.data));
    // },
    assignIdsTree(){
      // 使用该函数为树中的每个节点分配ID
      this.data.forEach((rootNode, index) => {
      // 确保索引是两位数
      const rootId = index < 10 ? `0${index}` : `${index}`;
      this.assignIds(rootNode, rootId);
    });
    },
    assignIds(node, parentId = '') {
      node.id = parentId;
      if (node.children) {
        node.children.forEach((child, index) => {
          // 确保索引是两位数，例如：00, 01, 02, ..., 10, 11, ...
          const childId = index < 10 ? `0${index}` : `${index}`;
          this.assignIds(child, `${parentId}${childId}`);
        });
      }
    },
    clean() {
      localStorage.removeItem("code_data");
    },
    handleNodeClick(data) {
      this.selected = data.type;
      this.selectedNode = data;
      this.selectedNodeId = data.id;
      console.log(this.selectedNodeId)
      if (data.type == "file" || data.type == "xdc" || data.type == "CompileId") {
        this.content = data.text;
        this.$nextTick(() => {
          if (this.$refs.MyAce) {
            // 设置内容
            this.$refs.MyAce.setValue(this.content);
            // 根据不同类型设置不同的模式
            let mode;
            if (data.type === "file") {
              mode = "ace/mode/verilog"; // 使用 Verilog 模式
            } else if (data.type === "xdc" || data.type == "CompileId") {
              mode = "ace/mode/text"; // 使用 Text 模式
            }
            // 应用模式
            if (mode) {
              this.$refs.MyAce.setMode(mode);
            }
          }
        });
      } else if (data.type == "ipcore") this.ipcore_params = data.params;
    },
    params_change() {
      this.notsaved = true;
    },
    edited() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode();
      node.text = this.content;
      this.notsaved = true;
    },
    savecode() {
      // localStorage.setItem("code_data", JSON.stringify(this.data));
      // this.notsaved = false;
      // console.log(JSON.stringify(this.data));
      let token = localStorage.getItem('Authorization');
      var form = new FormData();
      form.append('token', token);
      form.append('data', JSON.stringify(this.data)); // 假设 this.data 包含要保存的数据

      axios.post('http://202.38.79.96:9001/savecode', form)
          .then(response => {
              console.log(response.data);
              switch(response.data.code) {
                  case 0:
                      // 如果code为0，跳转到登录页面
                      this.$router.push('/login');
                      break;
                  case 1:
                      // 如果code为1，提示保存成功
                      // 这里可以使用你的UI框架的悬浮框组件，比如使用Element UI的Message组件
                      this.$message({
                          message: '保存成功',
                          type: 'success'
                      });
                      this.notsaved = false;
                      break;
                  default:
                      // 处理其他情况
                      console.error('未知的响应代码');
              }
          })
          .catch(error => {
              console.error('请求失败:', error);
          });
    },
    newFile() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode();
      this.$prompt("请输入文件名", "文件名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        // 使用正则表达式验证输入
        var isValid = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
        if (isValid) {
          node.children.push({ label: value+".v", type: "file", text: "" });
          this.notsaved = true;
          this.assignIdsTree();
        } else {
          // 如果不符合格式，提示用户
          this.$alert("文件名只能包含字母、数字、连字符和下划线", "无效的文件名", {
            confirmButtonText: "确定"
          });
        }
      });
    },
    newCodeFolder() {
      // var node = this.$refs.DeviceGroupTree.getCurrentNode();
      // this.$prompt("请输入文件名", "文件名", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // }).then(({ value }) => {
      //   // 使用正则表达式验证输入
      //   var isValid = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
      //   if (isValid) {
      //     node.children.push({ label: value+".v", type: "file", text: "" });
      //     this.notsaved = true;
      //     this.assignIdsTree();
      //   } else {
      //     // 如果不符合格式，提示用户
      //     this.$alert("文件名只能包含字母、数字、连字符和下划线", "无效的文件名", {
      //       confirmButtonText: "确定"
      //     });
      //   }
      // });
      var length = this.data.length;
      // 创建一个新对象的深拷贝
      var data_temp = JSON.parse(JSON.stringify(this.init_data));
      data_temp['label']="代码"+(length+1);
      this.data.push(data_temp);
      console.log(this.data)
      this.notsaved = true;
      this.assignIdsTree();
    },
    newIp() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode();
      this.$prompt("请输入ip组件名", "ip组件名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        // 使用正则表达式验证输入
        var isValid = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
        if (isValid) {
          node.children.push({ label: value, type: "ipcore", params: {} });
          this.notsaved = true;
          this.assignIdsTree();
        } else {
          // 如果不符合格式，提示用户
          this.$alert("IP核名只能包含字母、数字、连字符和下划线", "无效的文件名", {
            confirmButtonText: "确定"
          });
        }
      });
    },
    newFolder() {
      var node = this.$refs.DeviceGroupTree.getCurrentNode();
      this.$prompt("请输入文件夹名", "文件夹名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        // 使用正则表达式验证输入
        var isValid = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
        if (isValid) {
          node.children.push({ label: value, type: "folder", children: [] });
          this.notsaved = true;
          this.assignIdsTree();
        } else {
          // 如果不符合格式，提示用户
          this.$alert("文件名只能包含字母、数字、连字符和下划线", "无效的文件名", {
            confirmButtonText: "确定"
          });
        }
      });
    },
    relabelCodeFolders() {
      this.data.forEach((item, index) => {
        if (item.type === 'code_folder') {
          item.label = `代码${index + 1}`;
        }
      });
    },
    clickDelete() {
      const key = this.$refs.DeviceGroupTree.getCurrentKey();
      const node = this.$refs.DeviceGroupTree.getNode(key);
      console.log(key,node)
      console.log(node.data.id)
      // const removeLabel = (dataArray, label) => {
      //   dataArray.forEach((item, index) => {
      //     if (item.label === label) {
      //       dataArray.splice(index, 1);
      //     } else if (item.children) {
      //       removeLabel(item.children, label);
      //     }
      //   });
      // };
      // removeLabel(this.data, node.data.label);
      const removeNodeById = (dataArray, nodeId) => {
        for (let i = 0; i < dataArray.length; i++) {
          const item = dataArray[i];
          if (item.id === nodeId) {
            dataArray.splice(i, 1);
            break; // 找到并删除节点后退出循环
          } else if (item.children) {
            removeNodeById(item.children, nodeId);
          }
        }
      };
    
      removeNodeById(this.data, node.data.id);
      this.notsaved = true;
      this.treeRenderKey++;
      this.assignIdsTree();
      this.relabelCodeFolders(); // 调用重新标记的函数
    },
    clickRename() {
      this.$prompt("请输入新名字", "新名字", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          // 使用正则表达式验证输入
          var isValid = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value);
          if (isValid) {
            var node = this.$refs.DeviceGroupTree.getCurrentNode();
            node.label = value;
            this.notsaved = true;
          } else {
            // 如果不符合格式，提示用户
            this.$alert("文件名只能包含字母、数字、连字符和下划线", "无效的文件名", {
              confirmButtonText: "确定"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    compile() {
      // const json = JSON.stringify(this.data);
      // axios
      //   .post("http://202.38.79.96:18888/submit_proj_json", json, {
      //     // headers: {
      //     //   "Content-Type": "application/json",
      //     // },
      //   })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      if (this.isCompiling) {
        console.log("请等待一分钟后再尝试编译");
        this.$alert("请等待一分钟后再尝试编译", "编译中", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.isCompiling = true;
      setTimeout(() => {
        this.isCompiling = false;
      }, 60000); // 60秒后重新启用按钮

      if (this.selectedNodeId) {
        let rootFolder = this.data[parseInt(this.selectedNodeId[0]+this.selectedNodeId[1])]
        console.log(rootFolder);
        if (rootFolder) {
          const children = rootFolder.children;
          let token = localStorage.getItem('Authorization');
          const payload = {
            token: token,
            data: children  // 假设这是要发送的数据
          };
          // 假设 rootFolder 是你要操作的目录对象
          let compileIdNode = rootFolder.children.find(child => child.type === "CompileId");
          // const json = JSON.stringify(children);
          // console.log(json);
          axios.post("http://202.38.79.96:18888/submit_proj_json", payload)
          .then(res => {
            console.log("编译成功", res.data);
            // 这里可以添加一个提示框来显示编译成功的消息
            // 例如使用 Element UI 或其他 UI 框架的提示组件
            this.$message({
              message: '提交编译成功',
              type: 'success'
            });
            let jobid = res.data["id"]
            let compileIdText = jobid +"\n"+ "以上为此代码的编译ID(最上面为最新编译),可在编译页面查看";
            // 更新或添加 CompileId 节点
            if (compileIdNode) {
              compileIdText = jobid+"\n" + compileIdNode.text;
              compileIdNode.text = compileIdText;
            } else {
              rootFolder.children.push({ label: "CompileId.txt", type: "CompileId", text: compileIdText });
            }
            this.assignIdsTree();
            this.savecode();
          })
          .catch(err => {
            console.log("编译失败", err);
            this.$alert("编译失败", "编译失败", {
              confirmButtonText: "确定"
            });
          });
        } else {
          console.log("Root folder not found");
        }
      } else {
        console.log("No node selected");
        this.$alert("请选中代码然后编译", "未选中代码", {
              confirmButtonText: "确定"
        });
      }
    },
  },
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
