<template>
  <BaseCotent>
    <div class="row" >
      <div class="col-3" >
        
        <UserInfo @follow="follow" @unfollow="unfollow" :user="user"/>
        <UserWrite v-if="is_me" @commit="commit"/>
      </div>
      <div class="col-9">
        <UserPost :user="user" :posts="posts" @delete_a_post="delete_a_post"/>
      </div>
    </div>
  </BaseCotent>
</template>
  
  <script>
  // @ is an alias to /src
  
import BaseCotent from '../components/base';
import UserInfo from '../components/UserInform';
import UserPost from '../components/UserPost';
import UserWrite from '../components/UserWrite';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from "vuex";
import { computed } from 'vue';
export default {
  name: "UserActive",
  components: {
    BaseCotent,
    UserInfo,
    UserPost,
    UserWrite
},
  setup(){
    const route =useRoute();
    const userId=parseInt(route.params.userId);//从网页获取的用户ID
    
    const store=useStore();

    const user=reactive({});

    const posts=reactive({});

    $.ajax({
      url:"https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type:"GET",
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization':"Bearer " + store.state.user.access,
      },
      success(resp){
        
        user.id=resp.id;
        user.username=resp.username;
        user.photo=resp.photo;
        user.followNumber=resp.followerCount;
        user.is_followed=resp.is_followed;
      }
    });

    $.ajax({
      url:"https://app165.acapp.acwing.com.cn/myspace/post/",
      type:"GET",
      data:{
        user_id:userId,
      },
      headers:{
        'Authorization':"Bearer " + store.state.user.access,
      },
      success(resp){
        posts.count=resp.length;
        posts.posts=resp;
        
      }
    });

    const follow=()=>{
      if(user.is_followed) return;
      user.is_followed=true;
      
      user.followNumber++;
      
    };

    const unfollow=()=>{
      if(!user.is_followed) return;
      user.is_followed=false;
      user.followNumber--;
      
    };
    const commit = (content)=>{
      posts.count++;
      posts.posts.unshift({
        id:posts.count,
        userId:store.state.user.id,
        content:content,
      });
    };

    const delete_a_post =(post_id)=>{
      posts.posts=posts.posts.filter(post=>post.id!=post_id);
      posts.count=posts.posts.length;
    };

    const is_me=computed(()=>userId === store.state.user.id);

    return{
      user,
      follow,
      unfollow,
      posts,
      commit,
      is_me,
      delete_a_post,
    }

  }
};
  </script>

  <style scoped>
  
  </style>
  