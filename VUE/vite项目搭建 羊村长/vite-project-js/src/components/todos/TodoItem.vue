<!--
 * @Description:
 * @Date: 2021-03-26 00:27:30
 * @LastEditTime: 2021-03-26 15:42:43
 * @FilePath: \vite-project-js\src\components\todos\TodoItem.vue
-->
<template>
  <li :class='{ completed: todo.completed , editing: todo === editedTodo }'>
    <div class="view">
      <input type="checkbox" v-model='todo.completed'>
      <label @dblclick='editTodo(todo)'> {{todo.title}}</label>
      <button @click='removeTodo(todo)'>X</button>
    </div>
    <!-- 编辑代办 -->
    <edit-todo class="edit" v-model:todo-title="todo.title" v-todo-focus='todo===editedTodo' @blur='doneEdit(todo)' @keyup.enter='doneEdit(todo)' @keyup.esc='cancelEdit(todo)'></edit-todo>
  </li>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: '3',
  props: {
    todo: {
      type: Object,
      required: true
    },
    editedTodo: Object,
  },
  emit: ['remove-todo', 'update:edited-todo'],
  setup (props, { emit }) {
    const state = reactive({
      beforeEditCache: '',
    });


    const removeTodo = (todo) => {
      emit('remove-todo', todo);
    };

    const editTodo = (todo) => {
      state.beforeEditCache = todo.title;
      emit('update:edited-todo', todo);
    };

    const cancelEdit = (todo) => {
      todo.title = state.beforeEditCache;
      emit('update:edited-todo', null);

    };

    const doneEdit = (todo) => {
      emit('update:edited-todo', null);
    };
    return {
      ...toRefs(state),
      cancelEdit,
      doneEdit,
      removeTodo,
      editTodo,
    };
  },
  // 自定义指令
  directives: {
    'todo-focus': (el, { value }) => {
      if (value) {
        el.focus();
      }
    }
  }
});
</script>

<style lang='scss'>
.completed {
  label {
    text-decoration: line-through;
  }
}

.view {
  display: block;
}
.edit {
  display: none;
}

.editing {
  .view {
    display: none;
  }
  .edit {
    display: block;
  }
}
</style>
