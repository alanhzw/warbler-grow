<template>
    <div>
        <p>
                {{error}}
        </p>
    </div>
</template>
<script lang="ts">
export default {
  props: {
    error: Error,
  },
};
</script>
