<template>
  <div class="hello">
  <!-- eslint-disable max-len --><pre class="ascii red">
<span class="grey">    __ </span>             <span class="grey">   </span>       _  <span class="grey">   </span>                      <span class="grey">__ </span>
<span class="grey">   / /</span>__  ___  ___  <span class="grey">   </span>   ___| | <span class="grey">   </span>   __ _ _   _  ___   <span class="grey">/ /</span>
<span class="grey">  / /</span> __|/ _ \/ _ \ <span class="grey"> _ </span>  / _ \ | <span class="grey"> _ </span>  / _` | | | |/ _ \ <span class="grey">/ /</span>
<span class="grey"> / /</span>\__ \  __/  __/ <span class="grey">(_)</span> |  __/ | <span class="grey">(_)</span> | (_| | |_| |  __/<span class="grey">/ /</span>
<span class="grey">/_/</span> |___/\___|\___| <span class="grey">   </span>  \___|_| <span class="grey">   </span>  \__,_|\__, |\___<span class="grey">/_/</span>
<span class="grey">  </span>                  <span class="grey">   </span>          <span class="grey">   </span>        |___/</pre><!-- eslint-enable max-len -->
    <ul>
      <li
        v-for="(link, index) in links"
        :key="index">
        <a
          :href="link.href"
          target="_blank">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Binary } from '@/models/bin'

  import { defineComponent } from 'vue'

  import { binComposition } from '@/compositions/bin'

  export const binary = new Binary<[], []>(
    'Hello',
    'hello',
    'Display ASCII art for see·el·aye along with relevant links.',
    [],
    [],
  )

  /**
   * Displays ASCII art for see·el·aye along with relevant links.
   *
   * The links include the following:
   *
   * - the [GitHub repo](https://github.com/dhruvkb/seeelaye)
   * - the [docs in Storybook](https://seeelaye.vercel.app)
   * - the [`npm` package](https://www.npmjs.com/package/seeelaye)
   */
  export default defineComponent({
    name: 'Hello',
    command: 'hello',
    description: 'Display ASCII art for see·el·aye along with relevant links.',
    setup() {
      binComposition(binary)

      const links = [
        {
          text: '💻 GitHub',
          href: 'https://github.com/dhruvkb/seeelaye',
        },
        {
          text: '📕 Docs',
          href: 'https://seeelaye.vercel.app',
        },
        {
          text: '📦 npm',
          href: 'https://www.npmjs.com/package/seeelaye',
        },
      ]
      return {
        links,
      }
    },
  })
</script>

<style scoped lang="css">
  .red {
    color: #dc322f;
    font-weight: 600;
  }

  .grey {
    color: #7f7f7f;
    font-weight: 400;
  }

  pre {
    margin: 0;
  }

  ul {
    display: inline-flex;
    gap: 1ch;
  }

  li:not(:first-of-type)::before {
    content: '/ ';
    color: var(--color-secondary-fg);
  }
</style>
