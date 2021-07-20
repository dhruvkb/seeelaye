<template>
  <div class="terminal">
    <div class="terminal-content">
      <Past/>
      <Present ref="present"/>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'

  import { useSeeelaye } from '@/base/injection'

  import Past from '@/sections/past/Past.vue'
  import Present from '@/sections/present/Present.vue'

  /**
   * This is the top-level component of see·el·aye, which renders the CLI. This
   * should be imported by the user and placed into their application component
   * tree.
   */
  export default defineComponent({
    name: 'Terminal',
    components: {
      Present,
      Past,
    },
    setup() {
      const present = ref<{ $el: HTMLElement } | null>(null)

      const seeelaye = useSeeelaye()
      let unsubscribe: () => void
      onMounted(() => {
        unsubscribe = seeelaye.store.subscribe((mutation) => {
          if (mutation.type.includes('/setIsReady') && mutation.payload.isReady) {
            present.value?.$el.scrollIntoView()
          }
        })
      })
      onBeforeUnmount(() => {
        if (unsubscribe) {
          unsubscribe()
        }
      })

      return {
        present,
      }
    },
  })
</script>

<style scoped lang="css" src="../../styles/terminal.css"/>
