import { useWindowScroll } from '@vueuse/core'
import { watch, nextTick } from 'vue'

export function useScrollEvent () {
  const { y } = useWindowScroll()
  let bottomCallback: FunctionConstructor

  watch(y, async (value: number) => {
    await nextTick()
    if (document.documentElement.scrollHeight === window.outerHeight + value) {
      bottomCallback && bottomCallback()
    }
  })

  return {
    onBottom: (fn: any) => (bottomCallback = fn)
  }
}
