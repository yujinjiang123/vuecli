<template>
  <div >
    <aside/>
    <div class="content">
      <navbar/>
      <appmain/>
    </div>
  </div>
</template>


<script>
  import {AppMain, Aside, Navbar} from "./components";

  export default { 
    name :"Layout",
    components: {
      AppMain,
      Aside,
      Navbar
    }
  };
</script>


<style scoped>

</style>
