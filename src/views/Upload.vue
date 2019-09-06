<template>
  <div>
    <div
      class="vue-filedrop-box"
      :class="classes"
      v-on="dropEvents"
      v-bind="attrs"
      @click="openInput"
      @keyup.enter="openInput"
    >
      <input type="file" ref="inputRef" hidden />
      <ul v-if="files.length">
        <li v-for="file in files" :key="file.name">
          {{ file.name }}
        </li>
      </ul>
      <p v-else>Click or drop files here</p>
    </div>
  </div>
</template>

<script>
import { createComponent, computed, ref } from '@vue/composition-api'
import useFileDnD from '../composables/use-file-dnd'
import useGlobalDnD from '../composables/use-global-dnd'
export default createComponent({
  name: 'Upload',
  setup() {
    const inputRef = ref(null)

    const {
      attrs,
      cancel,
      events: dropEvents,
      files,
      hovering,
      open,
    } = useFileDnD(inputRef)

    const dragging = useGlobalDnD()

    const classes = computed(() => {
      return {
        'vue-filedrop-hovering': hovering.value,
        'vue-filedrop-no-files': !files.length,
        'vue-filedrop-dragging': dragging.value,
      }
    })

    return {
      attrs,
      cancel,
      classes,
      dropEvents,
      files,
      inputRef,
      openInput: open,
    }
  },
})
</script>

<style lang="scss" scoped>
$padding: 15px;

.vue-filedrop-box {
  display: flex;
  height: 200px;
  width: 600px;
  margin: 1rem auto;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  border-radius: 3px;

  padding: $padding;

  &:hover {
    cursor: inherit;

    &.vue-filedrop-no-files {
      cursor: pointer;
    }
  }

  &.vue-filedrop-dragging {
    border-style: dashed;
    border-width: 2px;
  }

  &.vue-filedrop-hovering {
    border-color: #aaa;
    // background-color: #fdfdfd;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.22);
  }
}
</style>
