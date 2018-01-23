  <template>
  	<!--首页商品推荐-->
  <div class="admin-center">
  			<div class="add-column">
  					<div class="admin-center-top clearfix">
						<el-button @click="addColumnShow=true" class="f-r" type="primary">Add category</el-button>
  					</div>
  					<div class="column-list">
						<span v-for="(item,index) in typeList" class="item">
							<label>{{item.typeTitle}}</label>
							<a @click="delectClumn(item.typeId)" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
						</span>
  					</div>
  			</div>
  			<div>
			<div class="alladver-top clearfix">
					<div class="select-search f-l">
						<el-select v-model="typeId" placeholder="Please Select">
							<el-option
								label="All"
								value="">
							</el-option>
							<el-option
								v-for="(item,index) in typeList"
								:key="index"
								:label="item.typeTitle"
								:value="item.typeId">
							</el-option>
						</el-select>
					</div>
					<el-button @click="goSearch()" class="f-l" style="margin-left: 15px;" type="primary" icon="search">Search</el-button>
					<el-button @click="addAdverShow=true" class="f-r" plain>Add product recommendation</el-button>
	        </div>
	        <div class="adver-list">
							<table class="adver-table">
									<thead>
											<tr>
													<td width="65">Num</td>
													<td width="120">category</td>
													<td width="160">Primary picture </td>				
													<td width="160">Merchandise ID</td>
													<td width="130">recommend</td>
													<td width="160">Modify Time</td>
													<td>Operating</td>
											</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in adverList">
											<td valign="middle">{{item.sortNum}}</td>
											<td>{{item.typeTitle}}</td>
											<td>
													<img :src="item.picUrl"/>
											</td>
											<td valign="middle">{{item.itemId}}</td>
											<td valign="middle">{{item.itemRecommend}}</td>
											<td >{{item.createTime | formatTime}}</td>
											
											<td valign="middle" class="operate-table">
													<el-button @click="edit(index)">Edit</el-button>
													<el-button @click="delect(item.advertId)" type="warning">Delect</el-button>
											</td>
										</tr>
									</tbody>                   
							</table>
        </div>
        </div>
       <div v-if="addColumnShow">
						<div class="box-shade"></div>
						<div class="add-tkbox">
							<a @click="addColumnShow=false" class="close" href="javascript:;">
								<i class="iconfont">&#xe605;</i>
							</a>
								<table>
									<tr >
										<td align="right">Category Name</td>
										<td>
											<el-input v-model="typeObj.typeTitle"  placeholder="Please enter name"></el-input>
										</td>
									</tr>
									
								</table>
								<p class="sub-adver" >
									<el-button @click="subColumnName()" type="primary">Submit</el-button>
								</p>
								
						</div>
        </div>
        
       <div v-if="addAdverShow">
						<div class="box-shade"></div>
						<div class="add-tkbox">
								<a @click="addAdverShow=false" class="close" href="javascript:;">
									<i class="iconfont">&#xe605;</i>
								</a>
								<table>
									<tr>
										<td align="right" width="100">
											Select Category
										</td>
										<td>
												<el-select v-model="newAdver.typeId" placeholder="Please Select">
													<el-option
														v-for="(item,index) in typeList"
														:key="index"
														:label="item.typeTitle"
														:value="item.typeId">
													</el-option>
											</el-select>
										</td>
									</tr>
									<tr>
										<td align="right"  width="100">Num</td>
										<td>
											<el-input v-model="newAdver.sortNum"  placeholder="Please enter num"></el-input>
										</td>
									</tr>
									<tr >
										<td align="right" width="100">ID</td>
										<td>
											<el-input v-model="newAdver.itemId"  placeholder="Please enter id"></el-input>
										</td>
									</tr>
									<tr>
										<td align="right" width="100">recommendation</td>
										<td>
											<el-input v-model="newAdver.itemRecommend"  placeholder="Please enter recommendation"></el-input>
										</td>
									</tr>
								</table>
								<p class="sub-adver" >
										<el-button @click="subAdver()" type="primary">Submit</el-button>
								</p>
								
						</div>
        </div>
        
  </div>
</template>

<script>
export default {
   	data(){
				return{
						searchId:'',
						adverList:[],
						addColumnShow:false,
						typeObj:{

						},
						typeList:[],
						typeId:'',
						
						addAdverShow:false,
						newAdver:{},
					}
			},
			components: {
			},
			methods:{
				bodyReady:function(){
					var url='http://manager.luxtonusa.com/back/advert/get/list?typeId='+this.searchId;
					this.$http.post(url).then(response => {
						if(response.data.status==432){
							this.$message.error("登录过期，请重新登录！");
							this.$cookie.delete('adminLogin');
							this.$store.state.adminLogin='';
							this.$router.replace("/Login")
						}else if(response.data.status==200){
							this.adverList=response.data.data;
						}else{
							this.$message({
									message:response.data.msg ,
									type: 'error'
							});
						} 	 
					})	
				},
					subColumnName:function(){
						var vm=this;
						var url='http://manager.luxtonusa.com/back/advert/type/insert';
						this.$http.post(url,vm.typeObj).then(response => { 
							if(response.data.status==432){
								this.$message.error("登录过期，请重新登录！");
								this.$cookie.delete('adminLogin');
								this.$store.state.adminLogin='';
								this.$router.replace("/Login")
							}else if(response.data.status==200){
								this.$message({
										message: 'Add Success！',
										type: 'success'
								});
								this.addColumnShow=false;
								this.typeObj={};
								this.getAdverTypeList();
							}else{
								this.$message({
									message:response.data.msg ,
									type: 'error'
								});
							} 	  
							
						}, response => {

						});
					},
					getAdverTypeList:function(){
						var url='http://manager.luxtonusa.com/back/advert/type/get/list';
						this.$http.post(url).then(response => { 
							if(response.data.status==432){
								this.$message.error("登录过期，请重新登录！");
								this.$cookie.delete('adminLogin');
								this.$store.state.adminLogin='';
								this.$router.replace("/Login")
							}else if(response.data.status==200){
								this.typeList=response.data.data;
							}else{
								this.$message({
										message:response.data.msg ,
										type: 'error'
								});
							} 	  	 
						})	
					},
					subAdver:function(){
						var vm=this;
						var url='http://manager.luxtonusa.com/back/advert/insert';
						this.$http.post(url,vm.newAdver).then(response => { 
							if(response.data.status==432){
								this.$message.error("登录过期，请重新登录！");
								this.$cookie.delete('adminLogin');
								this.$store.state.adminLogin='';
								this.$router.replace("/Login")
							}else if(response.data.status==200){
								this.$message({
										message: 'Add Success！',
										type: 'success'
								});
								this.addAdverShow=false;
								this.newAdver={};
								this.bodyReady();
							}else{
								this.$message({
										message:response.data.msg ,
										type: 'error'
								});
							} 	   
							
						}, response => {

						});
					},
					delectClumn:function(e){
							this.$confirm('This will permanently delete this file, Continue?', 'Prompt', {
								confirmButtonText: 'Confirm',
								cancelButtonText: 'Cancel',
								type: 'warning'
							}).then(() => {
									var vm=this;
									var url='http://manager.luxtonusa.com/back/advert/type/delete/'+e;
									this.$http.post(url).then(response => { 
										if(response.data.status==432){
											this.$message.error("登录过期，请重新登录！");
											this.$cookie.delete('adminLogin');
											this.$store.state.adminLogin='';
											this.$router.replace("/Login")
										}else if(response.data.status==200){
												this.$message({
														type: 'success',
														message: 'Delect Success!'
												});
												this.bodyReady();
										}else{
											this.$message({
													message:response.data.msg ,
													type: 'error'
											});
										} 	    
										
									}, response => {

									});	
									
							}).catch(() => {
									this.$message({
											type: 'info',
											message: 'Deleted'
									});          
							});
					},
					goSearch:function(){
								this.searchId=this.typeId;
								this.bodyReady();
					},
					edit:function(e){
							this.newAdver=this.adverList[e];
							this.addAdverShow=true;
					},
					delect:function(e){
						this.$confirm('This will permanently delete this file, Continue?', 'Prompt', {
							confirmButtonText: 'Confirm',
							cancelButtonText: 'Cancel',
							type: 'warning'
						}).then(() => {
							var vm=this;
							var url='http://manager.luxtonusa.com/back/advert/delete/'+e;
							this.$http.post(url).then(response => { 
								if(response.data.status==432){
									this.$message.error("登录过期，请重新登录！");
									this.$cookie.delete('adminLogin');
									this.$store.state.adminLogin='';
									this.$router.replace("/Login")
								}else if(response.data.status==200){
										this.$message({
												type: 'success',
												message: 'Delect Success!'
										});
										this.bodyReady();
								}else{
									this.$message({
											message:response.data.msg ,
											type: 'error'
									});
								} 	   
							}, response => {

							});	
								
						}).catch(() => {
							this.$message({
									type: 'info',
									message: 'Deleted'
							});          
						});
					}
			},
			created(){
				this.bodyReady();
				this.getAdverTypeList();
				
			}
}
</script>

<style lang="scss" scoped>
	.el-select-dropdown__item{
		width: 100%;
		display: block;
	}
	.admin-center{
		width: 100%;
		.add-column{
				margin-bottom: 20px;
				.column-list{
						.item{
								padding: 3px 10px;
								background: #f2f2f2;
								border: 1px solid #e5e5e5;
								border-radius: 3px;
								margin-right: 10px;
								margin-bottom: 10px;
								cursor: pointer;
								display: inline-block;
								position: relative;
								.delect{
										display: inline-block;
										box-sizing: border-box;
										border: 1px solid #52a8f9;
										background: #FFFFFF;
										position: absolute;
										top: -8px;
										right: -8px;
										width: 16px;
										height: 16px;
										text-align: center;
										line-height: 14px;
										border-radius: 8px;
									
									i{
											font-size: 12px;
											vertical-align: bottom;
											color: #95989a;
									}
							}
					}
				}
		}
		.adver-list {
				margin-top: 15px;
				font-size: 18px;
				.adver-table {
						width: 100%;
				}
				thead {
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
			tbody td {
			    padding: 10px;
			    text-align: center;
			    img{
			    		max-height:100px ;
			    }
			}
			.operate-table  {
					a:first-child{
							color: #52a8f9;
							padding-right: 15px
					}
					a:last-child {
							color: #95989a
					} 
			}
		}
	}
	.add-tkbox{
		/*display: none;*/
    z-index: 100;
    padding: 30px;
    position: fixed;
    width: 360px;
    left: 50%;
    top: 50%;
    font-size: 18px;
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
    tr{
				display: inline-block;
				padding-bottom: 10px;
				td{
						padding: 0 10px;
				}
    }
    .sub-adver{
				margin-top: 15px;
				text-align: center;
    }
	}
</style>
