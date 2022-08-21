<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-4" >
                    <img class="img-fluid"  :src="user.photo" alt="heart">
                </div> 
                <div class="col-8" >
                    <div class="username" >{{user.username}}</div>
                    <div class="fans">粉丝数:{{user.followNumber}}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button"  class="btn btn-secondary btn-sm">关注+</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button"  class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import $ from 'jquery';
import { useStore } from "vuex";

 export default {
    name: "UserInfo",
    components: {
    },
    props:{
        user:{
            type:Object,
            required:true,
        },
    },
    setup(props,context){
        const store=useStore();
        const follow=()=>{
            $.ajax({
                url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':"Bearer " + store.state.user.access,
                },
                success(resp){
                    if(resp.result==='success'){
                        context.emit("follow");
                    }
                },
            });
            
        }

        const unfollow=()=>{
            $.ajax({
                url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type:"POST",
                data:{
                    target_id:props.user.id,
                },
                headers:{
                    'Authorization':"Bearer " + store.state.user.access,
                },
                success(resp){
                    if(resp.result==='success'){
                        context.emit("unfollow");
                    }
                },
            });
            
        }
        return {
            
            follow,
            unfollow,
        }
    }
  };

</script>


<style scoped>
.username{
    font-weight: bold;
    text-align: left;
}
.fans{
    text-align: left;
    font-size: 12px;
    color:gray;
    
}
button{
    float: left;
    padding: 2px 4px;
    font-size: 4px;
}
</style>