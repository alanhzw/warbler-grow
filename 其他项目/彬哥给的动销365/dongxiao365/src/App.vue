<template>
	<div id="app">
		<router-view name="header"/>
		<div class="l-body">
			<router-view name="sidebar" v-if="isRouterAlive"/>
			<div class="main-page">
				<router-view class="page" v-if="isRouterAlive"/>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "app",

    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

