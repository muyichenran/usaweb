<template>
  <div class="admin-center">
  		<div class="admin-center-top clearfix">
            <el-button @click="addSubShow=true" class="f-r" type="primary">添加用户</el-button>
    	</div>
    	<div class="admin-list">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="userId"
                label="UserId"
                width="80">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="userName"
                width="180">
                </el-table-column>
                <el-table-column
                prop="Tel"
                label="Tel"
                width="140">
                </el-table-column>
                <el-table-column
                prop="address"
                label="address"
                width="260">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button  type="primary">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>    



            <!-- <table class="admin-table">
              <thead>
                <tr>
					<td width="150">名称</td>
                    <td width="250">管理员级别</td>
                    <td width="150" align="center">
                    	<span>操作</span>
                    </td>
					<td></td>
                </tr>
              </thead>
              <tbody>
              	<tr v-for="(item,index) in adminList">
					<td  width="150">{{item.username}}</td>
                    <td width="250">
						<span v-if="item.identity=='admin'">高级</span>
						<span v-else>普通</span>
					</td>
                    <td valign="middle" align="center">
						<el-button v-on:click="delect(item.id,item.identity)" type="warning">删除</el-button>
                    </td>
					<td></td>
                </tr>
              </tbody>
        	</table>     -->
  		</div>
  		<div v-if="addSubShow">
        	<div class="box-shade"></div>
        	<div class="add-sub-box">
        			<a @click="closeTk" class="close" href="javascript:;">
        				<i class="iconfont">&#xe605;</i>
	        		</a>	
        			<table>
						<tr>
							<td width="120" align="right">Name</td>
							<td width="220">
								<el-input v-model="adminUser.username"></el-input>
							</td>
						</tr>
						<tr>
							<td width="120" align="right">密码</td>
							<td width="220">
								<el-input v-model="adminUser.password"></el-input>
							</td>
						</tr>
						<tr>
							<td width="120" align="right">确认密码</td>
							<td width="220">
								<el-input v-model="password"></el-input>
							</td>
						</tr>
					</table>
					<p class="align-center">
						<el-button @click="addAdmin()" type="primary"  class="submit-btn">Submit</el-button>
					</p>
        	</div>
    	</div>	
  </div>
</template>

<script>
export default {
    data(){
		return{
            tableData: [{
                userId:1,
                userName: '王小虎',
                Tel:18720982521,
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                UserId:1,
                userName: '王小虎',
                Tel:18720982521,
                address: '上海市普陀区金沙江路 1517 弄'
            }],
			addSubShow:false,
			adminList:[],
			adminUser:{},
			password:''
		}
    },
    components: {
    },
    methods:{
		closeTk:function(){
			this.addSubShow=false;
			this.adminUser={};
			this.password="";
		},
		delect:function(e,f){
			if(f=='admin'){
				this.$message.error('高级管理员不能删除');
				return false;
			}
			this.$confirm('管理员删除后无法恢复, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				var url='http://luxma.helpyoulove.com/back/admin/delete/'+e;
				var vm=this;
				this.$http.post(url).then(response => {   
					if(response.data.status==200){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.bodyReady();
					}
				}, response => {
				});
				
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});

		},
		addAdmin:function(){
			if(this.adminUser.username==''||this.adminUser.password==''||this.adminUser.username==null||this.adminUser.password==null){
				this.$message.error('姓名、密码不得为空');
				return false;
			}
			if(this.adminUser.password!==this.password){
				this.$message.error('两次密码不一致');
				return false;
			}
			var url='http://luxma.helpyoulove.com/back/admin/add/adminUser';
			var vm=this;
			this.$http.post(url,vm.adminUser).then(response => {   
				if(response.data.status==200){
					this.$message.success('添加成功');
					this.addSubShow=false;
					this.adminUser={};
					this.password="";
					this.bodyReady();
				}
			}, response => {
			});
		},
		bodyReady:function(){
			var url='http://luxma.helpyoulove.com/back/admin/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				this.adminList=response.data.data;
			}, response => {
			});
		}
    },
    created(){
		this.bodyReady();
    }
}
</script>

<style lang="scss" scoped>

.add-sub-box{
	z-index: 100;
	padding: 30px;
	position: fixed;
	width: 400px;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 2px 3px rgba(0,0,0,.4);
.close{
	position: absolute;
	top: 5px;
	right: 8px;
	i{
		color: #95989a;
	}
}
table{
	td{
		padding: 10px;
	}
}
.submit-btn{
	margin-top: 30px;
}
}
</style>
