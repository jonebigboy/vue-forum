<template>
    <BaseCotent>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="username" class="form-label">username</label>
          <input v-model="username" type="text" class="form-control" id="username">
          
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password">
        </div>
        <div class="mb-3">
          <label for="password_confirm" class="form-label">Password confirm</label>
          <input v-model="password_confirm" type="password_comfirm" class="form-control" id="password_confirm">
        </div>
        <div class="error-message">{{error_message}}</div>
        <button type="submit" class="btn btn-primary">register</button>
      </form>
    </BaseCotent>
  </template>
  
  <script>
  // @ is an alias to /src
  
import BaseCotent from '../components/base';
import { ref } from 'vue';
import { useStore } from "vuex";
import $ from 'jquery';
import router from '@/router/index';


  
  export default {
    name: "UserRegister",
    components: {
      BaseCotent,
    },

    setup(){
      const store =useStore();
      let username=ref("");
      let password=ref("");
      let password_confirm=ref("");
      let error_message=ref("");

      const register=()=>{
        error_message.value="";
        $.ajax({
          url:"https://app165.acapp.acwing.com.cn/myspace/user/",
          type:"POST",
          data:{
              username:username.value,
              password:password.value,
              password_confirm:password_confirm.value,
          },
          success(resp){
            if(resp.result==="success"){
                store.dispatch("login",{
                username:username.value,
                password:password.value,
                success(){
                  router.push({name: 'userlist'});
                },
                error(){
                  error_message.value="系统异常";
                }
              });
            }else{
              error_message.value=resp.result;
            }
              
          }
        });
      }

      return {
        username,
        password,
        password_confirm,
        error_message,
        register,
        store,
      }
    }
  };
  </script>
  