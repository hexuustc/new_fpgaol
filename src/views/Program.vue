<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7">

      <!--Tables-->
     
          <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            PROGRAM
          </h3>
        </div>
        
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>label</th>
          <th>device type</th>
          <th>vacant/total</th>
          <th>manual</th>
          <th>xdc</th>
          <th>use</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
              {{ row.item.label }}
          </th>
          <td class="budget">
            {{ row.item.device_type }}
          </td>
          <td>
            {{ row.item.vacant }}/{{row.item.total}}
          </td>
          <td>
            <a href="https://git.ustc.edu.cn/hexuustc/fpgaol-examples" target="_blank">FPGAOL v1.1 manual</a>
          </td>
          <td>
           <a href="https://fpgaol.ustc.edu.cn/download/fpgaol1.xdc" target="_blank">fpgaol1.xdc</a>
           </td>
          <td>
            <div class="d-flex">
                <base-button size="sm" type="info" class="mr-4" @click="acquire(row.index+1)"
                  >acquire</base-button
                >
                <base-button size="sm" type="default" class="float-right" @click="release(row.index+1)"
                  >release</base-button
                >
              </div>
          </td>
        </template>
      </base-table>

      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="table2Data"
      >
        <template v-slot:columns>
          
        </template>

        <template v-slot:default="row">
          <th scope="row">
              {{ row.item.tablehead }}
          </th>
          <td>
            <div v-if = "row.index == 3">
                <a v-bind:href="row.item.type1" target="_blank">enter fpgaol1</a>
            </div>
            <div v-else>
                {{ row.item.type1 }}
            </div>
          </td>
          <td>
            <div v-if = "row.index == 3">
                <a v-bind:href="row.item.type2" target="_blank">enter fpgaol2</a>
            </div>
            <div v-else>
                {{ row.item.type2 }}
            </div>
          </td>
          <td>
            <div v-if = "row.index == 3">
                <a v-bind:href="row.item.type3" target="_blank">enter zybo</a>
            </div>
            <div v-else>
                {{ row.item.type3 }}
            </div>
          </td>
          
        </template>
      </base-table>
    </div>

  </div>
        </div>
        <div class="col-xl-8 mb-5 mb-xl-0">
        
      <!--End tables-->
    </div>
  </div>
</template>
<script>

import axios from 'axios'
let params = new URLSearchParams()
export default {
  components: {
  },
  data() {
    return {
        tableData: [
        {
          label: 1,
          device_type: "FPGAOL 1.0",
          vacant: 0,
          total: 0,
        },
        {
          label: 2,
          device_type: "FPGAOL 2.0",
          vacant: 0,
          total: 0,
        },
        {
          label: 3,
          device_type: "ZYBO Linaro",
          vacant: 0,
          total: 0,
        },
      ],
      table2Data: [
        {
          tablehead: "device id",
          type1: "None",
          type2: "None",
          type3: "None",
        },
        {
          tablehead: "acquire time",
          type1: "None",
          type2: "None",
          type3: "None",
        },
        {
          tablehead: "expiration time",
          type1: "None",
          type2: "None",
          type3: "None",
        },
        {
          tablehead: "link",
          type1: "no",
          type2: "no",
          type3: "no",
        },
      ],
      count:0,
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
      },
    };
  },
  mounted () {
    axios
    .get('https://fpgaol.ustc.edu.cn/fpga/api/api_usage')
    .then(response => (
    this.tableData[0].vacant = (response.data)['pi_num_vacant'],
    this.tableData[0].total = (response.data)['pi_num_total'],
    this.tableData[1].vacant = (response.data)['pi2_num_vacant'],
    this.tableData[1].total = (response.data)['pi2_num_total'],
    this.tableData[2].vacant = (response.data)['zybo_num_vacant'],
    this.tableData[2].total = (response.data)['zybo_num_total'],

    this.table2Data[0].type1 = (response.data)['pi_name'],
    this.table2Data[1].type1 = (response.data)['pi_acquire_time'],
    this.table2Data[2].type1 = (response.data)['pi_expiration_time'],
    this.table2Data[3].type1 = (response.data)['pi_url'],

    this.table2Data[0].type2 = (response.data)['pi2_name'],
    this.table2Data[1].type2 = (response.data)['pi2_acquire_time'],
    this.table2Data[2].type2 = (response.data)['pi2_expiration_time'],
    this.table2Data[3].type2 = (response.data)['pi2_url'],

    this.table2Data[0].type3 = (response.data)['zybo_name'],
    this.table2Data[1].type3 = (response.data)['zybo_acquire_time'],
    this.table2Data[2].type3 = (response.data)['zybo_expiration_time'],
    this.table2Data[3].type3 = (response.data)['zybo_url']
    ))
    },
methods:{
        acquire: function(message){
            console.log("hhhhhh"),
            params.append('device_type', message),
            axios
    .post('https://fpgaol.ustc.edu.cn/fpga/api/api_acquire', params)
    .then(response => (
    this.tableData[0].vacant = (response.data)['pi_num_vacant'],
    this.tableData[0].total = (response.data)['pi_num_total'],
    this.tableData[1].vacant = (response.data)['pi2_num_vacant'],
    this.tableData[1].total = (response.data)['pi2_num_total'],
    this.tableData[2].vacant = (response.data)['zybo_num_vacant'],
    this.tableData[2].total = (response.data)['zybo_num_total'],

    this.table2Data[0].type1 = (response.data)['pi_name'],
    this.table2Data[1].type1 = (response.data)['pi_acquire_time'],
    this.table2Data[2].type1 = (response.data)['pi_expiration_time'],
    this.table2Data[3].type1 = (response.data)['pi_url'],

    this.table2Data[0].type2 = (response.data)['pi2_name'],
    this.table2Data[1].type2 = (response.data)['pi2_acquire_time'],
    this.table2Data[2].type2 = (response.data)['pi2_expiration_time'],
    this.table2Data[3].type2 = (response.data)['pi2_url'],

    this.table2Data[0].type3 = (response.data)['zybo_name'],
    this.table2Data[1].type3 = (response.data)['zybo_acquire_time'],
    this.table2Data[2].type3 = (response.data)['zybo_expiration_time'],
    this.table2Data[3].type3 = (response.data)['zybo_url']
    ))
        },
    release: function(message){
            params.append('device_type', message),
            axios
    .post('https://fpgaol.ustc.edu.cn/fpga/api/api_release', params)
    .then(response => (
    this.tableData[0].vacant = (response.data)['pi_num_vacant'],
    this.tableData[0].total = (response.data)['pi_num_total'],
    this.tableData[1].vacant = (response.data)['pi2_num_vacant'],
    this.tableData[1].total = (response.data)['pi2_num_total'],
    this.tableData[2].vacant = (response.data)['zybo_num_vacant'],
    this.tableData[2].total = (response.data)['zybo_num_total'],

    this.table2Data[0].type1 = (response.data)['pi_name'],
    this.table2Data[1].type1 = (response.data)['pi_acquire_time'],
    this.table2Data[2].type1 = (response.data)['pi_expiration_time'],
    this.table2Data[3].type1 = (response.data)['pi_url'],

    this.table2Data[0].type2 = (response.data)['pi2_name'],
    this.table2Data[1].type2 = (response.data)['pi2_acquire_time'],
    this.table2Data[2].type2 = (response.data)['pi2_expiration_time'],
    this.table2Data[3].type2 = (response.data)['pi2_url'],

    this.table2Data[0].type3 = (response.data)['zybo_name'],
    this.table2Data[1].type3 = (response.data)['zybo_acquire_time'],
    this.table2Data[2].type3 = (response.data)['zybo_expiration_time'],
    this.table2Data[3].type3 = (response.data)['zybo_url']
    ))
        }
      }
};
</script>
<style></style>
