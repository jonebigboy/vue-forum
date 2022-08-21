<template>
    <BaseCotent>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">username</label>
          <input v-model="username" type="text" class="form-control" id="username">
          
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div class="error-message">{{error_message}}</div>
        <button type="submit" class="btn btn-primary">login</button>
      </form>
    </BaseCotent>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import BaseCotent from '../components/base';
  import { ref } from 'vue';
  import { useStore } from "vuex";
  import router from '@/router/index';

  export default {
    name: "UserLogin",
    components: {
      BaseCotent,
    },
    setup(){
      const store =useStore();
      let username=ref("");
      let password=ref("");
      let error_message=ref("");

      const login=()=>{
        error_message.value="";
        store.dispatch("login",{
          username:username.value,
          password:password.value,
          success(){
            router.push({name: 'userlist'});
          },
          error(){
            error_message.value="用户名或密码错误";
          }
        });
      }

      return {
        username,
        password,
        error_message,
        login,
        store,
      }
    }
  };
  </script>
  