import Emoji from './src/emoji'

Emoji.install = function (Vue) {
  Vue.component(Emoji.name, Emoji)
}

export default Emoji
