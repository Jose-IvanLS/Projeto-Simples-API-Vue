<template>
  <div>

  </div>
</template>

<script>
export default {
name: "CamposFigurinhas",
  data(){
  return{
    rules: [
      value => !!value || "Required.",
      value => (value && value.length >= 3) || "Min 3 characters"
    ]
  }
  }
}
</script>

<style scoped>

</style>