<template lang="html">
    <div>
        <h1>todos - new</h1>
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <input type="text" class="form-control" id="title" v-model="title">
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
        </div>
        <button v-on:click="createTask()" class="btn btn-primary">投稿</button>    
    </div>
</template>

<script>
import {Mixin} from '../../mixin'
import axios from 'axios'
//import jQuery from 'jquery'

export default {
    mixins:[Mixin],
    created() {
        this.baseUrl = this.sysConst.API_BASE;
        console.log(this.baseUrl);
//        this.check_userState(this.sysConst.STORAGE_KEY_userData, this)
//        this.user_id = this.get_userId(this.sysConst.STORAGE_KEY_userData )
        /* console.log( 'new.uid ='+ this.user_id )  */
    },
    data() {
        return {
            title:'',
            content:'',
            user_id: '',
            baseUrl : '',
        }
    },
    methods: {
        createTask: function() {
            var task = {
                'title': this.title,
                'content': this.content,
                'complete' : 0
            };
            axios.post('/api_todos_new' , task ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
//                console.log(res.data.content);
            });            

        },
    }
}
</script>
