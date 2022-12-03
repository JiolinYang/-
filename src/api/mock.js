//mock 前端用来模拟后端接口的一个工具，通过拦截前端发起的请求 自己定义数据 配合axios拦截器使用
import Mock from "mockjs";
import homeApi from './mockServeData/hoem'
import user from  './mockServeData/user'
import permission from './mockServeData/permission'


//定义mock请求拦截  虚拟接口   mock里面的路径是APi里面的index.js 里面方法里的路径
//Mock.mock( rurl?, rtype?, template|function(options) ) 范例 
 Mock.mock('/api/home/getData',homeApi.getStatisticalData)
    //拦截到请求后的处理逻辑
   // 对于需要传递数据并对数据库产生影响的数据 数据类型一把是post
    //用户列表的数据
    Mock.mock('/api/user/add', 'post', user.createUser)
    Mock.mock('/api/user/edit','post',  user.updateUser)
    Mock.mock('/api/user/del', 'post', user.deleteUser)
    Mock.mock(/api\/user\/getUser/, user.getUserList)

    Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)