<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">{{ title }}</h1>
      <Channelbox class="col-4" v-for="(channel, key, index) in channels" :key="index" :channel="channel"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Channelbox from '@/components/Channelbox.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    Channelbox,
  },
  computed: {
    ...mapGetters({
      channels: "channels/channels",
      channel: "channels/channel",
    }),
    title () {
      if (this.$route.query.mood === "all") {
        return "Todos canais"
      } else if (this.$route.query.mood !== "all") {
        return "Top " + this.$route.query.mood
      }
    }
  },
  methods: {
    ...mapActions({
      loadChannels: "channels/loadChannels",
      loadChannelsbyMood: "channels/loadChannelsbyMood",
      loadChannelbyName: "channels/loadChannelbyName",
    })
  },
  beforeMount: async function () {
    if (this.$route.query.mood === "all") {
      await this.loadChannels()
    } else if (this.$route.query.mood !== "all") {
      await this.loadChannelsbyMood(this.$route.query.mood)
    } else {
      await this.loadChannels()
    }
  },
};
</script>
