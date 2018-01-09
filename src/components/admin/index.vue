<template>
  <div class="admin-center">
  		<div class="admin-center-top clearfix">
            <el-button @click="addSubShow=true" class="f-r" type="primary">添加管理员</el-button>
    	</div>
    	<div class="admin-list">
          <table class="admin-table">
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
        	</table>    
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
					if(response.data.status==432){
						this.$message.error("登录过期，请重新登录！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
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
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){
					this.$message.success('添加成功');
					this.addSubShow=false;
					this.adminUser={};
					this.password="";
					this.bodyReady();
				}else{
					this.$message.error(response.data.msg);
				}
			}, response => {
			});
		},
		bodyReady:function(){
			var url='http://luxma.helpyoulove.com/back/admin/get/list';
			var vm=this;
			this.$http.post(url).then(response => {
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){   
					this.adminList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
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
.admin-list{  
	font-size: 16px;
	.height36{
		display: inline-block;
		line-height: 36px;
	}
	.el-button--primary{
		padding:10px 15px;
	}
	.admin-table {
			width: 100%;
			&>thead {
				width: 100%;
				margin-bottom: 10px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				background: #f2f2f2;
				border-bottom: 1px solid #e5e5e5;
				font-size: 18px;
				td {
						padding: 0 10px
					}
			}
			&>tbody{
				&>tr{
					&>td{
						padding: 10px;
						text-align: center;
					}
				}  
			}
		}
}
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
