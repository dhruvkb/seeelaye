import { App } from 'vue'

export class Seeelaye {
  name: string

  /**
   * Create a new object of class `Seeelaye`.
   *
   * @param name - the name to use in the greeting
   */
  constructor(name = 'World') {
    this.name = name
  }

  /**
   * Return a "Hello, World!"-esque string using the name passed to the instance
   * during instantiation.
   */
  get greeting(): string {
    return `Hello, ${this.name}!`
  }

  /**
   * Install this plugin in Vue app. Do not call this function, it will be
   * invoked automatically when using the `.use()` method on the `App` instance.
   *
   * @see {@link https://v3.vuejs.org/guide/plugins.html#using-a-plugin|Vue docs} for usage instructions
   * @param app - the app in which to install this instance as a plugin
   * @param injectKey - the name to use when injecting this plugin
   */
  install(app: App, injectKey = 'seeelaye'): void {
    app.provide(injectKey, this)
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$seeelaye = this
  }
}
