import Vue from 'vue';
let files=require.context('.',true,/\.vue$/);   //返回匹配到的.vue文件的数组

files.keys().forEach(component=>{
  let componentEntity=files(component).default;    //获取该文件的vue对象
  Vue.component(componentEntity.name,componentEntity);  //注册全局组件
});
