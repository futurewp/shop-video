<template>
  <section class="items-component">
    <img src="static/images/app/no-picture.png" />
  </section>
</template>
<script>
export default {
  name: 'ItemsNoData'
}
</script>
<style lang="scss" scoped>
.items-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba($color: $-color-9, $alpha: 0.3);
  img {
    width: 70%;
  }
}
</style>
