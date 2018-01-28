<template>
  <div class="admin-center">
  		<div class="admin-center-top clearfix">
			<div class="search-top1">
				<el-select v-model="status" slot="prepend" placeholder="Please select">
					<el-option label="All Orders" value=""></el-option>
					<el-option label="Completed Orders	" value="2"></el-option>
					<el-option label="Pending Orders" value="1"></el-option>
				</el-select>
				<el-button @click="searchStatus()" slot="append" icon="search"></el-button>
			</div>
			<div class="search-top2">
				<el-input placeholder="Please Enter Order ID" v-model="searchId" class="input-with-select">
					<el-button @click="goSearch()" slot="append" icon="search"></el-button>
				</el-input>
			</div>
    	</div>
    	<div class="admin-list">
            <div v-for="(item,index) in orderList" class="order-item">
				<div class="order-top clearfix">
					<span>Order Id:</span>{{item.orderId}}
					<span>Order Date:</span>{{item.createTime |formatTime}}
					<span>Total Amount：</span><i class="money">{{item.payment}}</i>
					<span>Num：</span>{{item.items.length}}
					<span v-if="item.status==2" class="f-r">Complete</span>

					<a v-else @click="goSuccessStatus(item.orderId)" class="f-r"  href="javascript:;">Confirm to complete</a>
					<a @click="windowHref(item.orderId)" class="f-r" style="margin-right:40px">Export</a>
				</div>
				<table class="order-table">
					<thead>
						<tr>
							<td width="450">GoodsInfo</td>
							<td width="100">Num</td>
							<td width="120">Price</td>
							<td>Price Total</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item1,index) in item.items">
							<td>
								<div class="goods-info">
									<img class="img" :src="item1.picUrl">
									<p class="title">{{item1.itemTitle}}</p>
								</div>
								<div class="goods-size" v-html="item1.itemType">
								</div>
							</td>
							<td>{{item1.num}}</td>
							<td>${{item1.price}}</td>
							<td>${{item1.priceTotal}}</td>
						</tr>
					</tbody>
				</table>
			</div>  
			<div v-if="orderList.length==0" class="no-list">
				No Data
			</div>
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
  </div>
</template>

<script>
export default {
    data(){
		return{
			orderList:[],
			status:'',
			searchName:'',	
			currentPage:1,
			pageSize:10,
			total:0,
			pageShow:false,

			searchId:'',
		}
    },
    components: {
    },
	watch:{
		status(){
			this.bodyReady();
		}
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

		bodyReady:function(){
			var url='http://manager.luxtonusa.com/back/order/get/list/'+this.currentPage+'?status='+this.status+'&stage='+this.pageSize;
			var vm=this;
			this.$http.post(url).then(response => {   
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.orderList=response.data.data.rows;
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
		searchStatus:function(){
			this.bodyReady();
		},
		goSearch:function(){
			var url='http://manager.luxtonusa.com/back/order/get/'+this.searchId;
			var vm=this;
			this.$http.post(url).then(response => { 
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.orderList=response.data.data;
					this.pageShow=false
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}     
				
			}, response => {
			});
		},
		goSuccessStatus:function(e){
			var url='http://manager.luxtonusa.com/back/order/update/'+e+'/2';
			var vm=this;
			this.$http.post(url).then(response => {  
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.$message({
						message: '修改成功',
						type: 'success'
					});
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
		windowHref(e){
			window.location.href='http://manager.luxtonusa.com/back/order/exportOrder?orderId='+e;
		}
		
    },
    created(){
		this.bodyReady();
    }
}
</script>

<style lang="scss" scoped>
.admin-list{
	margin-top: 35px;
}
.no-list{
	height: 50px;
	line-height: 50px;
	color: #95989a;
	text-align: center;
}
.page-list{
	margin: 40px auto;
	text-align: center;
}
.search-top1{
	width: 250px;
	float: left;
	.el-button{
		color: #97a8be;
	}
}
.search-top2{
	width: 300px;
	float: left;
	margin-left: 30px;
}
.order-item{
	border: 1px solid #e5e5e5;
	margin-bottom: 20px;
	
	.order-top{
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #95989a;
		padding: 0 10px;
		span{
			color: #000;
			padding-left: 20px;
			&:first-child{
				padding-left: 0
			}
		}
		a{
			color: #409EFF;
		}
		.money{
			color: #fe4343;
		}
	}
	.order-table{
		width: 100%;
		td{
			padding:10px 10px;
		}
		thead{
			
			background: #eef1f6
		}
		tbody{
			tr{
				background: #FAFAFA;
				&:nth-child(2n+1){
					background: #ffffff;
				}
			}
		}
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
</style>
