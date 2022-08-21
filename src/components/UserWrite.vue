<template>
    <div class="card write">
        <div class="card-body">
            
            <div class="mb-3">
                <label for="example" class="form-label">编辑区</label>
                <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <button @click="commit" type="button" class="btn btn-primary">发送</button>
            </div>
            
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from "vuex";
export default {
  name: "UserWrite",
  components: {
  },
  setup(props,context){
    let content=ref('');
    const store=useStore();

    const commit=()=>{
        $.ajax({
            url:"https://app165.acapp.acwing.com.cn/myspace/post/",
            type:"POST",
            data:{
                content:content.value,
            },
            headers:{
                'Authorization':"Bearer " + store.state.user.access,
            },
            success(resp){
                console.log(resp);
            }
        });

        context.emit("commit",content.value);
        content.value="";
    }

    return {
        content,
        commit,
    }
  }
 


};
</script>

<style scoped>
.write{
    margin-top: 10px;
}
button{
    margin-top: 10px;
}
</style>