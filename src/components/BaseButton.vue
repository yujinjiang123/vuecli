<template>
  <button :background-color="backgroundColor" :disabled="disabled" @click="handle"></button>
</template>

<script>
  export default {
    name: "BaseButton",
    data(){
      return{

      }
    },
    props:{
      bacgroundColor:{
        type:String,
        default:'white'
      },
      disabled:{
        type: Boolean,
        default:false
      }
    },
    methods:{
      handle(){
        this.$emit('handle');
      }
    }

  }
</script>

<style scoped>

</style>
