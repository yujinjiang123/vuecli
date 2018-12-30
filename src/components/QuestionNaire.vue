<template>
  <div class="question">
      <div class="content" v-model="currentQuestion">
          <div class="title">
            <p>{{index+1+"."}}{{currentQuestion.title}}</p>
          </div>
          <div v-if="currentQuestion.type==='text'">
            <textarea ref="input"  cols="30" rows="10" :value="currentQuestion.result.value" maxlength="currentQuestion.maxLength"></textarea>
          </div>
          <div v-else-if="currentQuestion.type==='radio'" class="list" v-for="(item,index) in currentQuestion.list">
            <label><input  ref="input" name="radio" type="radio" :checked="item.checked" :value="item.content" />{{item.content}}</label>
          </div>
          <div v-else v-for="item in currentQuestion.list" class="list" >
            <label ><input ref="input" name="checked" type="checkbox" :checked="item.checked" :value="item.content" />{{item.content}}</label>
          </div>
      </div>
      <div class="handle">
        <button @click="handleNext">{{index===questionList.length-1?"提交":"下一步"}}</button>
        <button @click="handlePervious" :disabled="index===0" >上一步</button>
        <button @click="handleReset">重置</button>
      </div>
  </div>
</template>

<script>
    export default {
      name: "QuestionNaire",
      props:{
        questionList:{
          type:Array,
          required:true
        }
      },
      computed:{

      },
      data(){
        return {
          info:'下一步',
          index:0,
          currentQuestion:this.questionList[0],
        }
      },
      methods:{
        handleNext(){
          this.handleResult(this.$refs.input);
          if(this.index===this.questionList.length-1){
            this.$emit('submit',this.questionList);
            return ;
          }
          this.index++;
          this.currentQuestion=this.questionList[this.index];
        },
        handlePervious(){
          console.log(this.questionList);
          if(this.index==0){
            return;
          }
          this.index--;
          this.currentQuestion=this.questionList[this.index];
        },
        handleReset(){
          this.questionList.forEach(item=>{
            item.result.value=null;
            if(item.list){
              item.list.forEach(item2=>{
                item2.checked=false;
              })
            }
          })
        },
        handleResult(result){
          if(result instanceof Array){
            this.questionList[this.index].result=[];
             const resultMap=result.filter(item=>item.checked)
                                   .map(item=>item.value);
             resultMap.forEach(item=>{
               const index=this.questionList[this.index].list.findIndex(item2=>item2.content===item);
               this.questionList[this.index].result.push({value:item});
               this.questionList[this.index].list[index].checked=true;
             })
          }else{
            this.questionList[this.index].result.value=result.value;
            if(this.questionList[this.index].type==='radio'){
              const index=this.questionList.list.findIndex(item=>item.content==result.value);
              this.questionList[this.index].list[index].checked=true;
            }
          }
        }
      },
      created(){
        this.questionList.forEach(item=>{
          this.$set(item,"result",{value:null});
          if(item.list){
            item.list.forEach(item2=>{
              this.$set(item2,"checked",false);
            })
          }
        });
      }
    }
</script>

<style scoped>
  .question{
    width:300px;
    height:500px;
    background: white;
  }
  .content{
    display: flex;
    flex-direction: column;
  }
  .list{
    width: 40%;
    position: relative;
    left: 30%;
  }
  .list label{
    float: left;
  }
  .handle{
    display:flex;
    justify-content: center;
    align-content:space-around;
  }
  .handle button{
    width:80px;
  }
</style>
