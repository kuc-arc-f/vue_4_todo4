<template>
    <div>
        <h1>{{ item.title }}</h1>
        <p style="margin-bottom: 20px;">Date: {{ item.date_str }}</p>
        <hr />
        <div id="post_item" v-html="item.content"></div>
    </div>
</template>

<script>
import axios from 'axios'
import marked from  'marked'
import {Mixin} from '../../mixin'

export default {
    mixins:[Mixin],
    created() {
//        this.baseUrl = this.sysConst.API_BASE;
//        console.log( this.baseUrl )        
    },
    data: function( ) {
        var itemDat = {title : '', content : ''}
        return {
            item: itemDat,
            editFlg: false,
            updated: false,
            baseUrl : '',
        }
    },
    mounted: function() {
        this.getItem()
    },
    methods: {
        getItem: function() {
            // api_todos_show
            axios.get("/api_todos_show/" +this.$route.params.id )
            .then(res =>  {
                var dat = res.data.docs
                this.item = dat[0];
                var dt = this.item.up_date
                var s = new String(dt)                        
                this.item.date_str =  s.substring(0, 10)
                this.item.content = marked(this.item.content)
                console.log( dat )
            })
        },
    }
}
</script>
<!-- -->
<style>
/* div#post_item > h3{ color :gray; } */
div#post_item > p > img{
    max-width : 100%;
    height : auto;
}
div#post_item > hr {
  height: 1px;
  background-color: #000;
  border: none;
}
</style>


