<template>
  <section class="items-component">
    <section class="left">
      <van-image :src="picture" />
    </section>
    <section class="center">
      <section class="title">
        <slot name="title">
          <span>{{ title }}</span>
          <span class="title-extra">
            <slot name="title-extra"></slot>
          </span>
        </slot>
      </section>
      <section class="description">
        <slot name="description">
          <span>{{ description }}</span>
        </slot>
      </section>
      <section class="bottom">
        <slot name="bottom"></slot>
      </section>
    </section>
    <section class="right">
      <slot name="right"></slot>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

const props = {
  title: { type: String, default: '' },
  picture: { type: String, default: 'static/images/app/no-picture.png' },
  description: { type: String, default: '' }
}
export default defineComponent({
  name: 'ItemsCell',

  props,

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-component {
  display: flex;
  padding: 8px;
  .left {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep {
      .van-image {
        height: 65px;
        img {
          height: 100%;
        }
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 5px 0 10px;
    align-items: flex-start;
    .title {
      font-size: 15px;
      color: $-primary-color-title;
      @include ellipsisMultiline(1);
    }
    .description {
      color: $-primary-color-title;
      @include ellipsisMultiline(2);
    }
    .title-extra {
      margin-left: 10px;
    }
  }
  .right {
    max-width: 15%;
  }
}
</style>
