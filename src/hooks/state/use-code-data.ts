import { jCodeData } from '@/api'
import { FieldItem } from 'typings/items'
import { set, get } from 'lodash-es'
import { ref } from 'vue'
import { convertValue } from '@/utils'

export interface codeDataOptions {
  items: FieldItem[]
  params: any
}

export function insetData (items: any[], data: any) {
  items.map((item: any) => {
    const value = convertValue(get(data, item.key, '-'), item.type, item)
    set(item, 'value', value)
  })
  return items
}

export default function useCodeData (opts: codeDataOptions) {
  const { items, params }: codeDataOptions = opts || {}
  const dataRef = ref({})
  const itemsRef = ref<FieldItem[]>([])
  asyncData()
  async function asyncData () {
    try {
      const { data } = await jCodeData(params)
      dataRef.value = data
      itemsRef.value = insetData(items, data)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data: dataRef,
    items: itemsRef
  }
}
