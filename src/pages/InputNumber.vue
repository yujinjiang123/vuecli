<template>
    <input-number v-model="value" :max="10" :min="0" v-once></input-number>
</template>

<script>
  import InputNumber from "@/components/InputNumber";
  export default {
    components: {
      inputNumber: InputNumber
    },
    data(){
      return {
        value:5
      }
    }
  }
</script>
