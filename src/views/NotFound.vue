<template>
  <div class="not-found">
    <h2>The page you are looking for does not exist, redirecting in {{ timerCount }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerCount: 5,
    };
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else {
          this.$router.push("/");
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.not-found h2 {
  text-align: center;
}
</style>
