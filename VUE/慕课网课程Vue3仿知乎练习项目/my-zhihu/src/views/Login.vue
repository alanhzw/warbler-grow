<!--
 * @Description:
 * @Date: 2021-04-01 18:30:16
 * @LastEditTime: 2021-04-12 18:18:19
 * @FilePath: \my-zhihu\src\views\Login.vue
-->
<template>
  <div>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules" type="text" v-model="emailVal" placeholder='请输入邮箱'></validate-input>
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">密码</label>
        <validate-input :rules="passwordRules" type="password" v-model="passwordVal" autocomplete='off' placeholder='请输入密码'></validate-input>
        {{passwordVal}}
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { emailRules, passwordRules } from '../data/testData';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { GlobalDataProps } from '../store/index';

export default defineComponent({
  name: '',
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const emailVal = ref('');
    const passwordVal = ref('');
    const inputRef = ref<any>(null);
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
        };
        store
          .dispatch('loginAndFetch', payload)
          .then((data) => {
            console.log('🚀🚀~ data:', data);
            router.push('/');
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    return {
      emailRules,
      emailVal,
      onFormSubmit,
      inputRef,
      passwordVal,
      store,
      passwordRules,
    };
  },
});
</script>

<style>
</style>
