<template>
  <section class="page_loading">
    <img class="loading_img" src="static/images/app/loading.gif" alt="">
    <!-- <van-loading type="spinner"></van-loading> -->
    <span class="loading_text">加载中</span>
  </section>
</template>
<style lang="scss" scoped>
.page_loading{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 100;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 40vh;
    :deep(.van-loading){
      color: $-primary-color;
      .van-loading__spinner{
        width: 28px;
        height: 28px;
      }
    }
    .loading_img{
      display: block;
      width: 100px;
      height: auto;
    }
    .loading_text{
      font-size: 14px;
      color:$-primary-color;
      text-align: center;
      line-height: 22px;
      padding: 10px 10px;
      font-weight: normal;
    }
}
</style>
