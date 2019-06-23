<template lang="html">
    <div>
        <div id="flash_message" v-if="message">
            <span class="badge badge-success">
                <h3 id="h3_msg" style="margin : 15px;">{{ message }}</h3>
            </span>
        </div>
        <!-- -->        
        <h1>Blogs - edit</h1>
        <!--
        <div class="form-group" style="text-align: right;">
            <router-link :to="'/blogs/show/' + page_id " target="_blank"
             class="btn btn-outline-primary">preview</router-link>
        </div>
        -->
        <div class="form-group">
            <label for="TopicTitle">タイトル</label>
            <input type="text" class="form-control" id="title" v-model="title" >
        </div>
        <div class="form-group">
            <label for="TopicContent">content</label>
            <textarea class="form-control" id="content" rows="10" v-model="content"></textarea>
        </div>
        <button v-on:click="updateTask" class="btn btn-primary">更新</button>
        <hr />
        <div v-if="complete==0">
            <button v-on:click="set_complete(1);" class="btn btn-outline-success" >完了登録</button>
        </div>
        <div v-else>
            <button v-on:click="set_complete(0);" class="btn btn-outline-success" >未完に戻す</button>            
        </div>        
        <hr />
        <button v-on:click="deleteTask" class="btn btn-danger">削除</button>
    </div>
</template>

<script>
import axios from 'axios'
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    created() {
        this.baseUrl = this.sysConst.API_BASE;
        this.page_id = this.$route.params.id
    },
    data() {
        return {
            item : [],
            title:'',
            content:'',
            complete : 0,
            baseUrl : '',
            page_id: 0,
            message : '',
            complete_name : '',            
        }
    },
    mounted: function() {
        this.getItem();
    },
    methods: {
        getItem: function() {
            axios.get("/api_todos_show/" +this.$route.params.id )
            .then(res =>  {
                var dat = res.data.docs
                this.item = dat[0];
                this.title = this.item.title
                this.content = this.item.content
                this.complete = this.item.complete
                console.log( dat )
            })            
        },
        updateTask: function () {
            var task = {
                'id' : this.$route.params.id,
                'title': this.title,
                'content': this.content,
                "complete" : this.complete
            };
            console.log(task  );
            axios.post('/api_todos_update/', task ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
            });            

        },
        set_complete: function (value) {
            var dat = this.get_sendItem(this.$route.params.id, this.item );
            dat.complete = value
//            console.log( dat  )
            axios.post('/api_todos_update/', dat ).then(res => {
                console.log(res.data );
                this.$router.push('/todos')
            });   

        },
        get_sendItem: function (id, item) {
            var ret = {
                'id' :  id,
                'title': item.title,
                'content': item.content,
                "complete" : item.complete
            };
            return ret;
        },
        deleteTask: function () {
            axios.get("/api_todos_delete/" +this.$route.params.id )
            .then(res =>  {
                console.log( res.data )
                this.$router.push('/todos')
            })            
        }
    }
}
</script>
