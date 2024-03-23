<template>
  <div class="application">
    <img :src="'static/images/industryService/icon-'+data.icon+'.png'">
    <div>
      <p class="name">{{ data.name }}</p>
      <p class="des">{{ data.des }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Application',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.application {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: $-padding-size-content 0;
  font-size: 12px;
  width: 50%;

  img {
    width: 36px;
    height: 36px;
    min-width: 36px;
    margin-right: 8px;
  }

  .name {
    font-size: 12px;
    color: $-color-3;
    line-height: 20px;
    @include ellipsisMultiline(1);
  }

  .des {
    font-size: 12px;
    color: $-color-9;
    transform: scale(0.8);
    margin-left: -10%;
    @include ellipsisMultiline(1);
  }
}
</style>
