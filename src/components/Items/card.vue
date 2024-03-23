<template>
  <section class="items-card">
    <section class="left">
      <ItemsImage :url="data.thumb" />
    </section>
    <section class="right">
      <section class="header">
        <slot name="header">
          {{ data.title }}
        </slot>
      </section>
      <section class="content">
        <section class="desc morePoints">
          <slot name="desc">
            {{ data.desc }}
          </slot>
        </section>
      </section>
      <section class="footer">
        <slot name="footer">
          {{ data.footer }}
        </slot>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ItemsImage from './image.vue'

export default defineComponent({
  name: 'ItemsCard',

  components: { ItemsImage },

  props: {
    data: {
      type: Object ,
      default: () => ({})
    }
  },

  setup () {
    return {}
  }
})
</script>
<style lang="scss" scoped>
.items-card {
  display: flex;
  padding: $-padding-size-content;
  .left {
    width: 80px;
    height: 80px;
    margin-right: 8px;
    img {
      border-radius: 4px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      height: 20px;
      font-size: 14px;
      color: $-primary-color-title;
    }
    .content {
      flex: 1;
      color: $-primary-color-info;
      .desc {
        max-height: 40px;
      }
    }
    .footer {
      height: 16px;
      color: $-primary-color-info;
    }
  }
}
</style>
