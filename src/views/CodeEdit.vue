<template>
  <div >
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
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">代码编辑</h3>
                </div>
              </div>
            </template>
            <div class="row">
               <div class="col-2">   
                    <el-tree :data="data" :props="defaultProps" :current-node-key="101" highlight-current=true node-key="id" ref="DeviceGroupTree" @node-click="handleNodeClick" >
                      <template  v-slot="{ node, data }">
                      <span class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <span>
                          <el-button
                            v-if="(data.id)%100==0"
                            type="text"
                            size="mini"
                            @click="() => append(data)">
                            Append
                          </el-button>
                          <el-button
                            v-if="(data.id)%100!=0"
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)">
                            Delete
                          </el-button>
                        </span>
                      </span>
                      </template>
                    </el-tree>
                </div>
                <div class="col-10">   
                    <ace v-model="content" ref="MyAce" @mychange="savetext"></ace>
                </div>
                <div class="col-2 mt-2">  
                     <base-button size="md" type="info" @click="savecode"
                                  > 保存 </base-button>
                </div>
                <div class="col-2 mt-2">  
                     <base-button size="md" type="info" @click="compile"
                                  > 编译 </base-button>
                </div>
                <div class="col-2 mt-2">  
                     {{save_message}}
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
let params = new URLSearchParams();
import axios from 'axios';
export default {
  components: {
    ace
  },
  data() {
    return {
      change:[],
      change_key:{},
      change_addr:{},
      change_num: 0,
      save_message: "no submit",
        content:'module top(\n\
    input [7:0] sw,\n\
    output [7:0] led\n\
    );\n\
\n\
assign led = sw;\n\
\n\
endmodule\n\
\n\
',
data: [{
          label: 'top.v',
          text:"",
          children: [{
            label: 'alu.v',
            text:"",
          },{
              label:'decode.v',
              text:"",
          },
          {label:"imm.v",
           text:"",},
          {label:"Regfile.v",
           text:"",}
          ]
        }, {
          label: 'fpgaol.xdc',
          text:"",
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
        
              };
  },
  mounted(){
    axios
    .get('http://202.38.79.96:9001/code')
    .then(response => (
    this.data = (response.data['data']),
    this.content=this.data[0].children[0].text,
    this.$refs.MyAce.setValue(this.content)
    )
    )
    
    },
  methods: {
      handleNodeClick(data) {
          if(data.id % 100==0) this.$refs.DeviceGroupTree.setCurrentKey(data.children[0].id)
          var k=this.$refs.DeviceGroupTree.getCurrentNode().text;
          this.$refs.MyAce.setValue(k);
          console.log(k);
          console.log(data);
      },
      savetext(){
          console.log("content: "+this.content)
          this.$refs.DeviceGroupTree.getCurrentNode().text=this.content;
          var current_node = this.$refs.DeviceGroupTree.getCurrentNode();
          var key=this.$refs.DeviceGroupTree.getCurrentKey()
          var mykey=100;
          var temp ={};
          if(key in this.change_key){
            if (this.change_key[key]==false) {
              this.change_key[key]=true;
              mykey = key-key%100;
              console.log(mykey)
              console.log(this.$refs.DeviceGroupTree.getNode(mykey))
              temp['path']=this.$refs.DeviceGroupTree.getNode(mykey).label + '/' + current_node.label;
              temp['text']=current_node.text;
              console.log(temp)
              this.change.push(temp)
              this.change_addr[key]=this.change_num;
              this.change_num+=1;
              console.log(this.change_key)
              console.log(this.change_addr)
              console.log(this.change)
            }
            else{
              this.change[this.change_addr[key]].text=this.content;
            }
          }
          else{
              this.change_key[key]=true;
              mykey = key-key%100;
              console.log(mykey)
              console.log(this.$refs.DeviceGroupTree.getNode(mykey))
              temp['path']=this.$refs.DeviceGroupTree.getNode(mykey).label + '/' + current_node.label;
              temp['text']=current_node.text;
              console.log(temp)
              this.change.push(temp)
              this.change_addr[key]=this.change_num;
              this.change_num+=1;
              console.log(this.change_key)
              console.log(this.change_addr)
              console.log(this.change)

          }
      },
      update(){
        axios
          .get('http://202.38.79.96:9001/code')
          .then(response => (
          this.data = (response.data['data']),
          this.content=this.data[0].children[0].text,
          this.$refs.MyAce.setValue(this.content)
          )
          )
      },
      savecode(){
        params = new URLSearchParams();
        params.append('data', JSON.stringify(this.change)),
        axios
          .post('http://202.38.79.96:9001/savecode',params)
          .then(response => (
            this.save_message= (response.data)['msg'],
            this.change = [],
            this.change_key = {},
            this.change_num = 0
          )
          )
      },
      appendfile(path){
        params = new URLSearchParams();
        params.append('path', path),
        axios
          .post('http://202.38.79.96:9001/appendfile',params)
          .then(response => (
            this.save_message= (response.data)['msg']
          )
          )
      },
      deletefile(path){
        params = new URLSearchParams();
        params.append('path', path),
        axios
          .post('http://202.38.79.96:9001/deletefile',params)
          .then(response => (
            this.save_message= (response.data)['msg']
          )
          )
      },
      append(data) {
        this.$prompt('请输入文件名', '文件名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.savecode();
          var path=data.label + '/' + value;
          this.appendfile(path);
          this.update();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },

      remove(node, data) {
        this.savecode();
        var key=data.id;
        var mykey=key-key%100;
        var path = this.$refs.DeviceGroupTree.getNode(mykey).label + '/' + data.label;
        this.deletefile(path);
        this.update();
      },
      compile(){
        this.savecode();
        params = new URLSearchParams();
        var key=this.$refs.DeviceGroupTree.getCurrentKey();
        var mykey=key-key%100;
        var path = this.$refs.DeviceGroupTree.getNode(mykey).label
        params.append('path', path),
        axios
          .post('http://202.38.79.96:18888/webcode',params)
          .then(response => (
            this.save_message= (response.data)['msg']
          )
          );
        this.$router.push('/compile');
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
