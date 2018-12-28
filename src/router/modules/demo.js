export default [
  {
    path:'/',
    name:"home",
    component:()=>import("@/components/HelloWorld")
  },
  {
    path:'/InputNumber',
    name:'InputNumber',
    component:()=>import("@/pages/InputNumber")
  }
]
