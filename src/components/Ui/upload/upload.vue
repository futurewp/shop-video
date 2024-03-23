<template>
  <div class="ImageUploader">
    <van-uploader
      v-model="modelList"
      v-bind="props"
      :after-read="afterRead"
      :max-size="props.maxSize * 1024 * 1024"
      @oversize="onOversize"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as Api from '@/api'
import { Toast } from 'vant'
import { get } from 'lodash-es'
const props = defineProps({
  files: {
    type: [Array],
    default: () => {
      return []
    }
  },
  props: {
    type: Object,
    default: () => ({
      // maxCount:5
    })
  }
})
const emits = defineEmits(['update:files'])
const modelList: any = ref([])
const afterRead = async (file: any) => {
  let apiName = get(props, 'props.apiName', 'jFileUpload')
  let fileData: any = {
    domain: '',
    resultList: [{ file }]
  }
  const fileDomain = props.props.domain || fileData.domain || ''

  if (get(Api, apiName)) {
    const formData = new FormData()
    formData.append('fileArray', file.file)
    const { data } = await get(Api, apiName)(formData)
    fileData = data || {}
  }
  const newList: any = []
  modelList.value.forEach((item: any) => {
    if (item.fileUrl && !item.content) {
      newList.push(item)
    }
  })
  console.log('newList', newList)
  modelList.value = [].concat(newList, fileData.resultList.map((item: any) => {
    return {
      url: item?.fileUrl ? (fileDomain + item?.fileUrl || '') : URL.createObjectURL(item?.file || file),
      name: item?.originalFilename,
      fileUrl: item?.fileUrl ? (fileDomain + item?.fileUrl || '') : URL.createObjectURL(item?.file || file),
      originalFilename: item?.originalFilename,
      file: item.file || file
    }
  }))
  console.log('ssss', modelList.value)
}
watch(() => {
  return props.files
}, () => {
  let fList: any = props.files || []
  try {
    fList = JSON.parse(fList)
  } catch (error) { }
  modelList.value = fList
}, { deep: true, immediate: true })
watch(() => {
  return modelList.value
}, () => {
  emits('update:files', modelList.value)
}, { deep: true, immediate: true })
const onOversize = () => {
  Toast(`文件大小不能超过 ${(get(props, 'props.maxSize', 0) / 1024 / 1024).toFixed(2)}MB`)
}
</script>

<style lang="scss" scoped></style>
