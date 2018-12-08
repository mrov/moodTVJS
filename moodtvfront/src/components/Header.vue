<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #6441a5">
        <a class="navbar-brand" href="#">MoodTV</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" :href="link('all')" onclick="location.reload()">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('funny')" onclick="location.reload()">Funny</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('impressive')" onclick="location.reload()">Impressive</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('sad')" onclick="location.reload()">Sad</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('bad')" onclick="location.reload()">Bad</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('hype')" onclick="location.reload()">Hype</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('spam')" onclick="location.reload()">Spam</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" :href="link('disbelieve')" onclick="location.reload()">Disbelieve</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  data () {
      return {
          baseUrl: "localhost:8080"
      }
  },
  computed: {
  },
  methods: {
    ...mapActions({
      loadChannels: "channels/loadChannels",
      loadChannelsbyMood: "channels/loadChannelsbyMood",
      loadChannelbyName: "channels/loadChannelbyName",
    }),
    redirectMood: async function(mood) {
        this.$router.push({name: 'home', query: {mood: mood}})
        if (this.$route.query.mood === "all") {
            await this.loadChannels()
        } else if (this.$route.query.mood !== "all") {
            await this.loadChannelsbyMood(this.$route.query.mood)
        } else {
            await this.loadChannels()
        }
    },
    link (mood) {
        return "http://" + this.baseUrl + "/#/?mood=" + mood
    }
  }
};
</script>

<style lang="stylus">

a
    cursor pointer

</style>