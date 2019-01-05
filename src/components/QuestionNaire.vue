<template>
  <div class="question">
    <div class="content" v-model="currentQuestion">
      <div class="title">
        <p>{{index+1+". "}}{{currentQuestion.title}}</p>
      </div>
      <div v-if="currentQuestion.type==='text'">
        <textarea ref="input" @input="validResult" cols="30" rows="10" :value="currentQuestion.result.value"
                  maxlength="currentQuestion.maxLength"></textarea>
      </div>
      <div v-else-if="currentQuestion.type==='radio'" class="list" v-for="(item,index) in currentQuestion.list">
        <label><input ref="input" @click="validResult" type="radio" :checked="item.checked" :value="item.content"/>{{item.content}}</label>
      </div>
      <div v-else v-for="item in currentQuestion.list" class="list">
        <label><input ref="input"  @click="validResult" type="checkbox" :checked="item.checked"
                      :value="item.content"/>{{item.content}}</label>
      </div>
    </div>
    <div class="handle">
      <base-button @click="handleNext" :value="index==questionList.length-1?'提交':'下一步'" :disabled="valid"></base-button>
      <base-button @click="handlePervious" v-if="index>=1" :disabled="index===0" :value='上一步'></base-button>
      <base-button @click="handleReset" :value='重置'></base-button>
    </div>
  </div>
</template>

<script>
  import BaseButton from '@/components/BaseButton'
  export default {
    name: "QuestionNaire",
    components:{
      baseButton:BaseButton
    },
    props: {
      questionList: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        index: 0,
        currentQuestion: this.questionList[0],
        valid: false
      }
    },
    methods: {
      validResult() {
        const result = this.$refs.input;
        if (result instanceof Array) {
          const selectNumber = result.filter(item => item.checked === true).length;
          this.valid = selectNumber >= 2;
        } else if (result.type === 'textarea') {
          this.valid = result.value.length >= this.currentQuestion.max;
        } else {
          this.valid = true;
        }
      },
      handleNext() {
        this.handleResult(this.$refs.input);
        if (this.index === this.questionList.length - 1) {
          this.$emit('submit', this.questionList);
          return;
        }
        this.index++;
        this.currentQuestion = this.questionList[this.index];
        this.valid = true;
      },
      handlePervious() {
        if (this.index == 0) {
          return;
        }
        this.index--;
        this.currentQuestion = this.questionList[this.index];
      },
      handleReset() {
        this.questionList.forEach(item => {
          item.result.value = null;
          if (item.list) {
            item.list.forEach(item2 => {
              item2.checked = false;
            })
          }
        })
      },
      handleResult(result) {
        //如果结果是一个数组
        if (result instanceof Array) {
          this.questionList[this.index].result = [];
          const resultMap = result.filter(item => item.checked)
            .map(item => item.value)
            .forEach(item => {
              const index = this.questionList[this.index].list.findIndex(item2 => item2.content === item);
              this.questionList[this.index].result.push({value: item});
              this.questionList[this.index].list[index].checked = true;
            })
        } else {
          this.questionList[this.index].result.value = result.value;
          if (this.questionList[this.index].type === 'radio') {
            const index = this.questionList.list.findIndex(item => item.content === result.value);
            this.questionList[this.index].list[index].checked = true;
          }
        }
      }
    },
    created() {
      this.questionList.forEach(item => {
        this.$set(item, "result", {value: null});
        if (item.list) {
          item.list.forEach(item2 => {
            this.$set(item2, "checked", false);
          })
        }
      })
    }
  }
</script>

<style scoped>
  .question {
    width: 300px;
    height: 500px;
    background: white;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .list {
    width: 40%;
    position: relative;
    left: 30%;
  }

  .list label {
    float: left;
  }

  .handle {
    display: flex;
    justify-content: center;
    align-content: space-around;
  }

  .handle button {
    width: 80px;
  }
</style>
