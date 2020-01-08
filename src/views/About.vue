<template>
  <div class="about">
    <ul>
      <li v-for="book in books"
          :key="book.id">
        <slot :book="book"
              :index="book.id">
          <!-- 默认内容 -->
          {{ book.name }}
        </slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    books: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
