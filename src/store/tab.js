import Mock from 'mockjs'
import Cookie from "js-cookie"
export default{
    state:{
        isCollapse:false,//控住菜单的展开还是开启
        // 面包屑
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
    }
    ],//面包屑数据
        menu:[]
        },
    mutations:{ 
        //修改菜单的展开还是收起
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //修改跟新面包屑数据
        selectMenu(state,val){
            //判断添加的数据是否为首页
            if(val.name !== 'home' ) {
                //查看tabsList里的数据 和当前鼠标的数据是一致 不存在就放进tabslist里
               const index = state.tabsList.findIndex (item => item.name === val.name)
                //如果不存在 为-1
                if(index === -1){
                state.tabsList.push(val)
            }
        }
        },
        //删除指定的tag数据 state是固定的 item为获取的数据
        closeTag(state,item){
            //判断val.name 与传递进来的handleClose的item是否一致 是就
           const index = state.tabsList.findIndex(val => val.name === item.name)
           //splice(要刪除的位置 刪除的個數）
            state.tabsList.splice(index,1)
        },
        //设置menu的数据
        setMenu(state,val){
            state.menu = val
            //Cookie的数据是字符串 用JSON的string解构
            Cookie.set('menu',JSON.stringify(val))
        },
        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!Cookie.get('menu')) return 
                const menu =JSON.parse(Cookie.get('menu'))
                //更新state的menu数据
                state.menu = menu
            //处理动态路由的数据
                const menuArray = []
                menu.forEach(item => {
                    if(item.children){
                        item.children = item.children.map(item =>{
                            item.component = () => import(`../views/${item.url}`)
                            return  item 
                    })
                    menuArray.push(...item.children)
                } else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
             console.log(menuArray,'menuArray')
             //路由的动态添加 
             menuArray.forEach(item => {
                router.addRoute('Main',item)
                })
        }
      
    }
}