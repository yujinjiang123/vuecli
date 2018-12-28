<template>
  <div v-block>
    <tebs v-model="activeKey">
      <pane label="标签一" name="1">
        标签一的内容
      </pane>
      <pane label="标签二" name="2">
        标签二的内容
      </pane>
      <pane label="标签三" name="3">
        标签三的内容
      </pane>
    </tebs>
  </div>
</template>

<script>
  import Tabs from "@/components/Tabs";
  import Pane from "@/components/Pane";

  export default {
    name: "Tabs",
    components:{
      tabs:Tabs,
      pane:Pane
    },
    data(){
     return{
       activeKey:1
     }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
