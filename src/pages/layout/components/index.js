const files=require.context('.',true,/\.vue$/);  //返回匹配到的.vue文件的数组

let components={};

files.keys().forEach(component=>{
  let componentEntity=files(component).default;
  Object.assign(components,{componentEntity});  //将组件添加到components对象中
});

export default components  //抛出一个Vue-Router期待的数据结构的数组
