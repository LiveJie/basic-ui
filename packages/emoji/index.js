import Emoji from './src/main'

Emoji.install = function (Vue) {
  Vue.component(Emoji.name, Emoji)
}

export default Emoji
