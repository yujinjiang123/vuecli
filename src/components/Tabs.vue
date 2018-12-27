<template>
  <div class="tabs">
    <div class="tab-bar">
      <div  v-for="(item,index) in navList" @click="handleChange(index)"></div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Tabs",
      data(){
        return{
          currentValue:this.value,
          navList:[]
        }
      },
      props:{
        value:{
          type:[String,Number]
        }
      },
      watch:{
        value(val){
          this.currentValue=val;
        },
        currentValue(){
          this.updateStatus();
        }
      },
      methods:{
        handChange(index){
          let nav=this.navList[index];
          let name=nav.name;
          this.currentValue=name;
          this.$emit('input',name);
          this.$emit('on-click',name);
        },
        getTabs(){
          return this.$children.filter(function (item) {
            return item.$options.name==='pane'
          })
        },
        updateNav(){
          this.navList=[];
          this.getTabs().forEach((pane,index)=>{
            this.navList.push({
              label:pane.label,
              name:pane.name||index
            })
            if(!pane.name){
              pane.name=index;
            }
            if(index===0){
              if(!this.currentValue){
                this.currentValue=pane.name||index;
              }
            }
          });
          this.updateStatus();
        },
        updateStatus(){
          let tabs=this.getTabs();
          tabs.forEach(tab=>{
            return tab.show=tab.name===this.currentValue;
          })
        }

      }
    }
</script>

<style scoped>

  .tabs{
    font-size: 14px;
    color:#657180;
  }

  .tabs-bar:after{
    content:'';
    display: block;
    width:100%;
    height:1px;
    background:#d7dde4;
    margin-top:-1px;
  }

  .tabs-tab{
    display:inline-block;
    padding: 4px 16px;
    margin-right: 6px;
    background: #fff;
    border:1px solid #d7dde4;
    cursor: pointer;
    position:relative;
  }

  .tabs-tab-active{
    color:#3399ff;
    border-top:1px solid #3399ff;
    border-bottom: 1px solid #fff;
  }

  .tabs-tab-active:before{
    content: '';
    display: block;
    height: 1px;
    background:#3399ff;
    position:absolute;
    top:0;
    left:0;
    right:0;
  }

  .tabs-contnet{
    padding:8px 0;
  }

</style>
