import { setPicture } from '@/utils'
import { useStore } from 'vuex'
import { get } from 'lodash-es'
import { computed } from 'vue'
import { MenuMode } from 'typings/data'

export default function useApplication () {
  const store = useStore()
  const modules = computed<MenuMode[]>(() => get(store.getters.menus, 'jsonMenus[3]', []).find((module: MenuMode) => String(module.id) === '34797').children || [])
  const apps = computed<MenuMode[]>(() => {
    const useItems = modules.value.map((module: MenuMode) => {
      return (module.children || []).map((o: MenuMode) => {
        o.label = o.name
        return o
      })
    })
    return setPicture(useItems.flat())
  })

  return {
    modules,
    apps
  }
}
