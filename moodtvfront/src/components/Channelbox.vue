<template>
  <div class="box">
      <p class="title"> Stream do {{channel.name.replace('#','')}} </p>
      <p> Link: <a :href=link> {{link}} </a></p>
      <p class="ranking">Ranking: </p>
      <p class="mood" v-for="(mood, key, index) in moods" :key="index"> <span>{{ key }}:</span> {{ mood }}</p>
  </div>
</template>

<script>

export default {
  name: 'channelBox',
  data () {
    return {
        moods: {funny: 0, impressive: 0, sad: 0, bad: 0, hype: 0, spam: 0, disbelieve: 0}
    }
  },
  props: ["channel"],
  computed: {
    link () {
      var nameWithoutHashTag = this.channel.name.replace('#','')
      return "https://twitch.tv/" + nameWithoutHashTag
    }
  },
  beforeMount () {
    var noNameArray = {};
    for (const key in this.channel) {
      if (key !== "name" && key !== "_id") {
        noNameArray[key] = this.channel[key];
      }
    }
    this.moods = noNameArray
  }
};
</script>

<style lang="stylus">

.box
    background-color white
    border 1px solid black
    width 100%
    flex-basis 30% !important
    text-align center
    margin 1rem
    padding 1rem
    color: black

.title
  font-weight bold
  font-size 30px

.ranking
  font-weight bold
  font-size 26px

.mood span
  font-weight bold

</style>
