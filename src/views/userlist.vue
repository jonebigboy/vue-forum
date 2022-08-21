<template>
    <BaseCotent>
      <div class="card single-post" @click="open_user_active(user.id)" v-for="user in users" :key="user.id">
        <div class="card-body">
          <div class="row">
            <div class="col-1">
              <img class="img-fluid" :src="user.photo" alt="头像">
            </div>
            <div class="col-11">
              <div class="username">{{ user.username}}</div>
              <div class="follow">粉丝数：{{ user.followerCount}}</div>
            </div>
          </div>
        </div>
      </div>
    </BaseCotent>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import BaseCotent from '../components/base';
  import $ from 'jquery';
  import {ref} from 'vue';
  import router from '@/router/index';
  import { useStore } from "vuex";
  export default {
    name: "UserList",
    components: {
      BaseCotent,
    },
    setup(){
      let users=ref([]);
      const store=useStore();

      $.ajax({
        url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
        type:"get",
        success(resp){
          users.value=resp;
        },
      });

      const open_user_active = (userId)=>{
        if(store.state.user.is_login){
          router.push({
            name: 'useractive',
            params:{userId},
          });
        }else{
          router.push({
            name: 'login',
          });
        }
        
      };

      return {
        users,
        open_user_active,
      };
    }
    
  };
  </script>

<style scoped>

.single-post{
  margin-bottom: 10px;
  cursor: pointer;
}
img{
  border-radius: 50%;
}
.username{
  text-align: left;
  font-weight: bold;
  height:50%;
}

.follow{
  text-align: left;
  font-size: 12px;
  color:gray;
  height:50%;
  
}
.single-post:hover{
  box-shadow: 2px 2px 10px lightgray;
  transition: 500ms;
}


</style>
  