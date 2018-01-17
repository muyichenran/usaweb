  <template>
  	<!--分区管理-->
   <div class="admin-center">
		<div class="admin-center-top clearfix">
            <el-button @click="submitItem()" class="f-r" type="primary">Submit</el-button>
        </div>
        <div class="subdivision-list">
            <table class="subdivision-table">
                <thead>
                    <tr>
                    	<td width="350">Product Info</td>
                        <td width="200">Color&Size</td>
                        <td width="150">
                        	Price
                        </td>
						<td>
                        	Inventory
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
						<td>
							<div class="goods-info">
								<img class="img" :src="goodsDetail.picUrl">
								<p class="title">{{goodsDetail.title}}</p>
							</div>
						</td>
                        <td colspan="3">
							<table class="sku-table">
								<tr v-for="(item,index) in editSku">
									<td width="200" align="left">
										<span v-html="item.title"></span>
									</td>
									<td width="150" >
										<el-input v-model="item.price"></el-input>
									</td>
									<td>
										<el-input v-model="item.quantity"></el-input>
									</td>
								</tr>	
							</table>
						</td>
                    </tr>
                </tbody>                   
            </table>

			<p style="text-align:center;margin-top:40px;">
				<el-button type="primary" @click="submitItem()">Submit</el-button>
			</p>
        </div>
  </div>
</template>

<script>
export default {
    data(){
      	return{
			  goodsDetail:{},
			  editSku:[],
			  Id:this.$route.query.Id,
      	}
    },
    components: {
    },
    methods:{
		bodyReady:function(){
			
			var url='http://manager.luxtonusa.com/item/sku/get/list/'+this.Id;
			var vm=this;
			this.$http.post(url).then(response => {   				
				if(response.data.status==432){
					this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.editSku=response.data.data;
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
			var url='http://manager.luxtonusa.com/item/sku/update';
			var vm=this;
			this.$http.post(url,vm.editSku).then(response => { 
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
					this.$router.go(-1)
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}   
				
			}, response => {
			});
		},
    	
    },
    created(){
		if(localStorage.getItem('goodsDetail')){
			this.goodsDetail=JSON.parse(localStorage.getItem('goodsDetail'));
		}else{
			this.$message({
				type: 'error',
				message: '请从商品列表进入当前页面'
			});
			this.$router.push({ path: '/GoodsList'})
		}
		
		
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
	.goods-info{
		width: 300px;
		float: left;
		cursor: pointer;
		margin-right: 15px;
		.img{
			width: 100px;
			height: 100px;
			float: left;
			margin-right: 8px;
		}
		.title{
			font-size:14px
		}
	}
	.goods-size{
		p{
			line-height: 24px
		}
	}
	.sku-table{
		td{
			padding: 10px;
		}
	}	
</style>
  
  
  
  
  
 