<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            >
            <!-- 用户的表单信息 -->
            <!-- 引入 -->
            <el-form ref="form"  :rules="rules" :inline="true" :model="form" label-width="80px">
                 <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                 </el-form-item>

                 <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输年龄" v-model="form.age"></el-input>
                 </el-form-item>

                 <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyy-mm-dd">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                 </el-form-item>

                 </el-form>

                
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
         <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <!-- form搜索区 -->
            <el-form  :inline="true" :model="userForm">
                <el-form-item>
                  <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
         </div>
         <div class="common-tabel">
            <el-table
                stripe
                 height="90%"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span >{{scope.row.sex ==1? '男' : '女' }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="age"
                    label="年龄">
                    <el-table-column
                    prop="birth"
                    label="出生日期"
                   >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址"
                   >
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                    <!-- 作用域插槽：在父组件中获得子组件数据 -->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
      </el-table-column>
            </el-table>  
         <div class="pager"> 
         <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePage">
        </el-pagination>
        </div>
         </div>
    </div>
</template>

<script>

import {getUser,addUser,editUser,delUser} from '../api'
export default {
        data(){
            return{
                dialogVisible:false,
                form:{
                    name:'',
                    age:'',
                    sex: '',
                    birth:'',
                    addr:''
                },
                rules:{
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                    age:[
                            { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    sex:[
                            { required: true, message: '请输入性别', trigger: 'blur' },
                    ],
                    birth:[
                            { required: true, message: '请选择日期', trigger: 'blur' },
                    ],
                    addr:[
                            { required: true, message: '请输入地址', trigger: 'blur' },
                    ],
                 
                },
                tableData:[],
                modalType:0, //0表示新增弹窗 1表示编辑弹窗
                total:0 ,//当前tableData的总条数
                //分页
                pageData:{
                    page:1,
                    limit: 10
                },
                userForm:{
                    name:''
                }
 
            }
        },
        methods:{
            // 	validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
            //这个方法是获取form的
            submit(){
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        //后续对表单数据的处理
                        if(this.modalType === 0){
                            addUser(this.form).then(()=>{
                                // addUser新增数据后获取接口 重新获取数据
                                this.getList()
                            })
                        }else{
                            editUser(this.form).then(()=>{
                                this.getList()
                            })
                        }
                        console.log(this.form,'form')
                        //清空表单数据
                        this.$refs.form.resetFields()
                        //关闭弹窗
                        this.dialogVisible = false
                    }
                    
                })
            },
            //弹窗关闭 触发函数 清空表单数据
            handleClose(){
                this.$refs.form.resetFields()
                this.dialogVisible = false
            },
            cancel(){
                this.handleClose()
            },
            handleEdit(row){
               this.modalType=1
               this.dialogVisible =true
               //需对当前数据深拷贝 不然会出错
               this.form = JSON.parse(JSON.stringify(row))
            },
            handleDelete(row){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        delUser({id:row.id}).then(() =>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                        });
                        //重新获取列表的接口
                        this.getList()
                    })
                       
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                 });
            },
            handleAdd(){
                //为新增按钮
                this.modalType = 0,
                //打开弹窗
                this.dialogVisible = true
            },
            //选择页码的回调函数
            handlePage(val){
                console.log(val)
                this.pageData.page = val
                this.getList()
            },
            //列表的查询
            onSubmit(){
                this.getList()
            },
            //将getUser封装为一个公共样式  getUser获取列表数据
            getList(){
                getUser({params :{...this.userForm,...this.pageData}}).then(({ data }) => {
                    //list 为mock传入的数据 
                this.tableData = data.list
                //判断数据是否存在
                this.total = data.count || 0
            })
            },
           
        },
        mounted(){
            //页面一挂载就获得列表数据
             this.getList()
        }
}
</script>

<style lang="less" scoped>

  .manage{
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
    .common-tabel{
        position: relative;
        height: calc(100% - 62px);
        .pager{
            position:absolute;
            bottom: 0;
            right: 20px;

        }
    }
  }
</style>