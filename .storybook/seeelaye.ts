import { Seeelaye } from '../src'
import store from './store'

const seeelaye = new Seeelaye(
  store,
  'terminal',
  {},
)

export default seeelaye
