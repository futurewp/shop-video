import { useStore } from 'vuex'
import { computed } from 'vue'
import { get } from 'lodash-es'

export interface DictDataMode {
  key: string
  mapper?: any
}
export default function useDictData (opts: DictDataMode) {
  const { key, mapper }: DictDataMode = opts || {}

  const store = useStore()
  const dictData = computed<any>(() => {
    const sourceData = get(store.getters.dictData, key, [])
    const useData = sourceData.map((o: any) => {
      const item = Object.assign({}, o)
      Object.keys(mapper || {}).map((key: string) => {
        item[mapper[key]] = item[key]
        delete item[key]
      })
      return item
    })
    return useData
  })

  return {
    data: dictData
  }
}
