  <template>
  	<!--分区管理-->
   <div class="admin-center">
		<div class="admin-center-top clearfix">
            <el-button @click="addSubShow=true" class="f-r" type="primary">Add Category</el-button>
        </div>
        <div class="subdivision-list">
            <table class="subdivision-table">
                <thead>
                    <tr>
                    	<td width="100">Number</td>
                        <td width="200">Category Name</td>
                        <td align="right">
                        	<span style="padding-right: 25px;">Operating</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in itemList">
						<td valign="middle">
							<span class="height36">{{item.sortOrder}}</span>
						</td>
                        <td valign="middle">
                      	 	<span class="height36">{{item.title}}</span>
                        </td>
                        <td valign="middle">
							<p class="align-right">
								<el-button  @click="edit(index)" type="primary">Edit</el-button>
								<el-button v-on:click="delect()" type="warning">Delect</el-button>
							</p>
                        </td>
                    </tr>
                </tbody>                   
            </table>
        </div>
        <div v-if="addSubShow">
        	<div class="box-shade"></div>
        	<div class="add-sub-box">
        			<a  class="close" @click="addSubShow=false;item={}" href="javascript:;">
        				<i class="iconfont">&#xe605;</i>
	        		</a>	
        			<table>
						<tr>
							<td width="120" align="right">Number</td>
							<td width="220">
								<el-input v-model="item.sortOrder"></el-input>
							</td>
						</tr>
						<tr>
							<td width="120" align="right">Name</td>
							<td width="220">
								<el-input v-model="item.title"></el-input>
							</td>
						</tr>
					</table>
					<p class="align-center">
						<el-button @click="submitItem()"  type="primary"  class="submit-btn">Submit</el-button>
					</p>
        	</div>
        </div>
  </div>
</template>

<script>
export default {
    data(){
      	return{
		  	itemList:[],
			item:{},
      		addSubShow:false,
      	}
    },
    components: {
    },
    methods:{
    	delect:function(){
    		this.$confirm('This will permanently delete this file, Continue?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delect Success!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Deleted'
          });          
        });
    	},
		bodyReady:function(){
			var url='http://manager.luxtonusa.com/item/cat/get/list';
			var vm=this;
			this.$http.post(url).then(response => {  
				if(response.data.status==432){
					this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.itemList=response.data.data;
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				} 
				
			}, response => {
			});
		},
		submitItem:function(){
			var url='http://manager.luxtonusa.com/item/cat/insert';
			var vm=this;
			this.$http.post(url,vm.item).then(response => { 
				if(response.data.status==432){
					this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.$message({
						type: 'success',
						message: 'Submit Success!'
					});
					this.bodyReady();
					this.item={};
					this.addSubShow=false;
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}   
				
			}, response => {
			});
		},
		edit:function(e){
			this.item=this.itemList[e];
			this.addSubShow=true;
		}
    	
    },
    created(){
		this.bodyReady()
    	
    }
}
</script>

<style lang="scss" scoped>
		.subdivision-list {  
			font-size: 16px;
			.height36{
				display: inline-block;
				line-height: 36px;
			}
			.el-button--primary{
				padding:10px 15px;
			}
		    .subdivision-table {
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
				// .retrieve-list{
				// 	text-align: center;
				// 	p{
				// 		line-height: 28px;
				// 	}
				// }
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
  
  
  
  
  
 