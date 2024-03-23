import { computed, ref } from 'vue'
import { get } from 'lodash-es'
import { useStore } from 'vuex'

export default function useDictOptions (useLabels: any[], mapper: any = { name: 'label', id: 'value' }) {


  const store = useStore()
  const dictData = computed<any>(() => store.getters.dictData || {})
  const labels = ref<any[]>([])

  initLables()
  function initLables () {
    useLabels.map((item: any) => {
      if (!!item.optionsPath) {
        const dictOptions = get(dictData.value, item.optionsPath, [])
        const iMapper = Object.assign(mapper || {}, item.mapper || {})
        item.options = [].concat(dictOptions.map((o: any) => {
          const itemData: any = {}
          Object.keys(iMapper).map((key: string) => {
            itemData[iMapper[key]] = o[key]
          })
          return itemData
        }))
      }
    })
    labels.value = useLabels
    return useLabels
  }

  return {
    labels
  }
}
