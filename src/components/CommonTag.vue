<template>
    <!-- :closable给除home的标签添加删除按钮 -->
    <!-- :effect 判断当前路由的name和所点击的是否一样  选择是否激活 -->
  <div class="tabs">
        <el-tag
        v-for="(item ,index) in tags"
        :key="item.path"
    
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ?  'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        size="small"
        >
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
    name:'CommonTag',
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabsList
        })
    },
    methods:{
        // 将store tabjs 里的mutation的closstag添加到了当前页面
        ...mapMutations(['closeTag']),
        //点击tag跳转的效果
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        //点击tag删除的功能
        handleClose(item,index){
            //调用store中的mutation
            this.closeTag(item)
            // 获得tablist的数组长度
            const length =this.tags.length 
            //删除之后的跳转逻辑
            if(item.name !==this.$route.name){
                return
            }
            //表示是删除最后一项
            if(index ===length){
                this.$router.push({ 
                    name:this.tags[index-1].name
                })
            } else{
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }

}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>