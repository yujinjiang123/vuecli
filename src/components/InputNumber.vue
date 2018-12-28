<template>
    <div>
      <input type="text" :value="currentValue" @change="handleChange">
      <button @click="handleDown" :disabled="this.currentValue<=this.min">-</button>
      <button @click="handleUp" :disabled="this.currentValue>=this.max">+</button>
    </div>
</template>

<script>
    export default {
      name: "InputNumber",
      data(){
        return {
          currentValue:this.value
        }
      },
      props:{
        max:{
          type:Number,
          default:Infinity
        },
        min:{
          type: Number,
          default: -Infinity
        },
        value:{
          type:Number,
          default:0
        }
      },
      watch:{
        currentValue(val){
          this.$emit('input',val);
          this.$emit('on-change',val)
        },
        value(val){
          this.updateValue(val);
        }
      },
      methods:{
        handleDown(){
          if(this.currentValue<=this.min){
            return;
          }
          this.currentValue--;
        },
        handleUp(){
          if(this.currentValue>=this.max){
            return ;
          }
          this.currentValue++;
        },
        updateValue(val){
          if(val>this.max){
            val=this.max;
          }
          if(val<=this.min){
            val=this.min;
          }
          this.currentValue=val;
        },
        handleChange(event){
          let val=event.target.value.trim();
          const max=this.max;
          const min=this.min;
          if(Number.isInteger(val)){
            val=Number.parseInt(val);
            if(val>=max){
              val=max;
            }
            if(val<=min){
              val=this.min;
            }
            console.log(val);
            this.currentValue=val;
          }else{
            event.target.value=this.currentValue;
          }
        }
      },
      mounted(){
        this.updateValue(this.value);
      }
    }
</script>

<style scoped>

</style>
