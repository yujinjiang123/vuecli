<template>
    <question-naire @submit="submitQuestion" :questionList="questionList"></question-naire>
</template>

<script>
  import QuestionNaire from "@/components/QuestionNaire";
  import Button from "@/components/BaseButton";
  export default {
    components: {
      questionNaire:QuestionNaire,
      baseButton:Button,
    },
    data() {
      return {
        questionList: [ {
          title: '你喜欢什么运动',
          list:[{content:'篮球'},{content:'足球'},{content:'羽毛球'},{content:'排球'},{content:'跑步'},{content:'其他'}],
          type: 'checkbox'
        },{
          title: '你有什么感想',
          maxLength: 30,
          type: 'text'
        },{
          title: '你喜欢什么颜色',
          list: [{content:'blue'}, {content:'yello'}, {content:'red'}],
          type: 'radio'
        }]
      }
    },
    methods:{
      submitQuestion(data){
        console.log(data);
      }
    }
  }
</script>

<style>

</style>


