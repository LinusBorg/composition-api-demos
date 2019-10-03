export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    /*eslint-disable-next-line no-unused-vars */
    handleScroll(event) {
      /* ... */
    },
  },
}
