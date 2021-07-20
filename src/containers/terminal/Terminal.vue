<template>
  <div class="terminal">
    <div class="terminal-content">
      <slot>
        <Past/>
        <Present ref="present"/>
      </slot>
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

<style scoped lang="css">
  .terminal {
    --default-font-family: "JetBrains Mono", monospace;
    --default-font-size: 14px;
    --default-line-height: 1.4;

    --default-height: 100%;

    --default-padding: 2ex 1ch;

    background: var(--color-normal-bg);
    color: var(--color-normal-fg);

    font-family: var(--font-family, var(--default-font-family));
    font-size: var(--font-size, var(--default-font-size));
    line-height: var(--line-height, var(--default-line-height));

    height: var(--height, var(--default-height));

    padding: var(--padding, var(--default-padding));
  }

  ::v-deep(.terminal-content) {
    --default-content-max-width: 80ch;
    max-width: var(--content-max-width, var(--default-content-max-width));

    border-right: 1px solid var(--color-highlight-bg);
  }

  ::v-deep(.terminal-content) p {
    margin: 0;
  }

  ::v-deep(.terminal-content) ul {
    list-style: none;

    padding-left: 0;
    margin: 0;
  }

  ::v-deep(.terminal-content) a {
    color: inherit;
  }

  ::v-deep(.terminal-content) .error {
    color: var(--color-normal-red);
  }
</style>
