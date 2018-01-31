<template>
  <div class="admin-center">
  		<div class="admin-center-top clearfix">
			<div class="search-top">
				<el-input placeholder="Please enter user name" v-model="searchName" class="input-with-select">
					<el-button @click="goSearch()" slot="append" icon="search"></el-button>
				</el-input>
			</div>
			
            <el-button @click="addSubShow=true" style="margin-top: -40px;" class="f-r" type="primary">Add User</el-button>
    	</div>
    	<div class="admin-list">
            <el-table
                :data="userList"
                stripe
                style="width: 100%">
                <el-table-column
                prop="username"
                label="userName"
                width="160">
                </el-table-column>
				<el-table-column
                prop="name"
                label="Name"
                width="120">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="Phone"
                width="140">
                </el-table-column>
				<el-table-column
                prop="email"
                label="Email"
                width="120">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="Remark"
                width="220">
                </el-table-column>
                <el-table-column
                label="Operating"
                >
                <template slot-scope="scope">
                    <el-button  @click="Edit(scope.$index)" type="primary">Edit</el-button>
                </template>
                </el-table-column>
            </el-table>    
			<div v-if="pageShow" class="page-list">
				<el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
			</div>
  		</div>
  		<div v-if="addSubShow">
        	<div class="box-shade"></div>
        	<div class="add-sub-box">
        			<a @click="closeTk" class="close" href="javascript:;">
        				<i class="iconfont">&#xe605;</i>
	        		</a>	
        			<table>
						<tr>
							<td width="150" align="right">userName</td>
							<td width="220">
								<el-input v-model="User.username"></el-input>
							</td>
						</tr>
						<tr>
							<td  align="right">Name</td>
							<td width="220">
								<el-input v-model="User.name"></el-input>
							</td>
						</tr>
						<tr>
							<td  align="right">Password</td>
							<td width="220">
								<el-input v-model="User.password"></el-input>
							</td>
						</tr>
						<tr>
							<td align="right">Confirm Password</td>
							<td width="220">
								<el-input v-model="User.password2"></el-input>
							</td>
						</tr>
						<tr>
							<td align="right">Phone</td>
							<td width="220">
								<el-input v-model="User.phone"></el-input>
							</td>
						</tr>
						<tr>
							<td align="right">Email</td>
							<td width="220">
								<el-input v-model="User.email"></el-input>
							</td>
						</tr>
						<tr>
							<td  align="right">Remark</td>
							<td width="220">
								<el-input placeholder="Address" v-model="User.remark"></el-input>
							</td>
						</tr>
					</table>
					<p class="align-center">
						<el-button @click="addUser()" type="primary"  class="submit-btn">Submit</el-button>
					</p>
        	</div>
    	</div>	
  </div>
</template>

<script>
export default {
    data(){
		return{
			userList:[],
			searchName:'',
			addSubShow:false,
			User:{},
	
			currentPage:1,
			pageSize:10,
			total:0,
			pageShow:false,
		}
    },
    components: {
    },
    methods:{
		handleSizeChange(val) {
			this.pageSize=val;
			this.bodyReady()
		},
		handleCurrentChange(val) {
			this.currentPage=val;
			this.bodyReady()
		},

		closeTk:function(){
			this.addSubShow=false;
			this.User={};
		},
		Edit(e){
			this.User=this.userList[e];
			this.User.password2=this.User.password;
			this.addSubShow=true;				
		},
		addUser:function(){
			if(this.User.username==''||this.User.password==''||this.User.username==null||this.User.password==null){
				this.$message.error('User name and password must be entered！');
				return false;
			}
			if(this.User.password!==this.User.password2){
				this.$message.error('Re-enter password doesn’t match original password！');
				return false;
			}
			var url='http://manager.luxtonusa.com/back/user/insert';
			var vm=this;
			this.$http.post(url,vm.User).then(response => { 
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.$message.success('Add Success');
					this.addSubShow=false;
					this.User={};
					this.bodyReady();
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}        
			}, response => {
			});
		},
		bodyReady:function(){
			var url='http://manager.luxtonusa.com/back/user/get/list/'+this.currentPage+'?stage='+this.pageSize;
			var vm=this;
			this.$http.post(url).then(response => { 
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.userList=response.data.data.rows;
					this.total=response.data.data.total;
					if(this.total<10){
						this.pageShow=false
					}
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}          
				
			}, response => {
			});
		},
		goSearch:function(){
			if(this.searchName.replace(/(^\s+)|(\s+$)/g, "")){
				var url='http://manager.luxtonusa.com/back/user/get/'+this.searchName;
				var vm=this;
				this.$http.post(url).then(response => { 
					if(response.data.status==432){
						this.$message.error("Your login has been expired, please re-login！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.userList=response.data.data;
						this.pageShow=false
					}else{
						this.$message({
							message: response.data.status,
							type: 'error'
						});
					}      
						
				}, response => {
				});
			}else{
				this.currentPage=1;
				this.pageSize=10;
				this.bodyReady()
			}
			
		},
    },
    created(){
		this.bodyReady();
    }
}
</script>

<style lang="scss" scoped>
.page-list{
	margin: 40px auto;
	text-align: center;
}
.search-top{
	width: 400px;
	margin: 0 auto;
}
.add-sub-box{
	z-index: 100;
	padding: 30px;
	position: fixed;
	width: 440px;
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
