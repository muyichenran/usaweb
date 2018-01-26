  <template>
  <div class="admin-center">
	   	<div class="admin-center-top clearfix">
	   	  	  <el-button @click="goAddGoods()" class="f-r" type="primary">Add Merchandise</el-button>
        </div>
        <div class="goods-list">
			<div class="top-search">
				<el-select v-model="select"  placeholder="Please Select">
					<el-option label="All" value=""></el-option>
					<el-option label="上架" value="true"></el-option>
					<el-option label="下架" value="false"></el-option>
				</el-select>
				<el-button @click="goSearch()" type="primary" icon="search">Search</el-button>
			</div>
			<div class="top-bar">
				<el-button  @click="modifyState(false)"  type="info">All added</el-button>
				<el-button  @click="modifyState(true)" type="success">Sold out</el-button>
			</div>
			<el-table
				ref="multipleTable"
				:data="goodsList"
				tooltip-effect="dark"
				style="width: 100%"
				class="goods-table"
				@selection-change="handleSelectionChange">
				<el-table-column
				type="selection"
				width="55">
				</el-table-column>
				<el-table-column
				label="Id"
				prop="itemId"
				width="80">
				</el-table-column>
				<el-table-column
				prop="title"
				label="Title"
				width="160">
				</el-table-column>
				<el-table-column
				label="Picture"
				width="160">
				<template slot-scope="scope">
					<img :src="scope.row.picUrl">
				</template>
				</el-table-column>
				<el-table-column
				prop="price"
				label="Price"
				width="80">
				</el-table-column>
				<el-table-column
				label="Operating"
				>
					<template slot-scope="scope">
						<el-button v-if="scope.row.status" @click="modifyStateSingle(scope.row.itemId,false)" type="info">下架</el-button>
						<el-button v-else @click="modifyStateSingle(scope.row.itemId,true)" type="success">上架</el-button>
						<el-button @click="edit(scope.row.itemId,scope.row)">Edit inventory</el-button>
						<el-button type="danger" @click="delect(scope.row.itemId)">Delect</el-button>
					</template>
				</el-table-column>
			</el-table>
            
        </div>

        
  </div>
</template>

<script>
export default {
   	data(){
		return{
			select:'',
			addSuppShow:false,
			goodsList:[],
			supplier:{},
			multipleSelection: [],
			editSku:[]
		}
    },
    components: {
    },
    methods:{
		goAddGoods:function(){
			this.$router.push({path:'/addGoods'})
		},
		modifyState:function(e){
			if(this.multipleSelection.length>0){
				var url='http://manager.luxtonusa.com/item/update/status/'+e;
				var vm=this;
				this.$http.post(url,vm.multipleSelection).then(response => {   
					if(response.data.status==432){
						this.$message.error("Your login has been expired, please re-login	！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.$message({
							message: 'Edit Success',
							type: 'success'
						});
						this.multipleSelecti=[];
						this.$refs.multipleTable.clearSelection();
						this.bodyReady();
					}else{
						this.$message({
							message: response.data.status,
							type: 'error'
						});
					} 
								
				}, response => {
				});
			}
			
		},
		modifyStateSingle:function(e,f){
			var url='http://manager.luxtonusa.com/item/update/status/'+f;
			var vm=this;
			this.multipleSelection.push(e);
			this.$http.post(url,vm.multipleSelection).then(response => {   
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
						this.$message({
							message: 'Edit Success',
							type: 'success'
						});
						this.multipleSelecti=[];
						this.$refs.multipleTable.clearSelection();
						this.bodyReady();
				}else{
					this.$message({
						message: response.data.status,
						type: 'error'
					});
				}
			})	 
		},
		// toggleSelection(rows) {
		// 	if (rows) {
		// 		rows.forEach(row => {
		// 			this.$refs.multipleTable.toggleRowSelection(row);
		// 		});
		// 	} else {
		// 		this.$refs.multipleTable.clearSelection();
		// 	}
		// },
		handleSelectionChange(rows) {
			if (rows) {
				this.multipleSelection=[];
				rows.forEach(row => {
					this.multipleSelection.push(row.itemId);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
			// this.multipleSelection = val;
		},
        edit:function(e,f){
			this.$router.push({ path: '/editSku', query: { Id: e }})
			localStorage.setItem("goodsDetail",JSON.stringify(f))
        },
		delect(e){
			var url='http://manager.luxtonusa.com/item/deleteItemInfo/'+e;
			var vm=this;
			this.$http.post(url).then(response => {   				
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.$message({
						message: 'Delect',
						type: 'success'
					});
					this.bodyReady()
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
			var url='http://manager.luxtonusa.com/item/get/list?status='+this.select;
			var vm=this;
			this.$http.post(url).then(response => {   				
				if(response.data.status==432){
					this.$message.error("Your login has been expired, please re-login	！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.goodsList=response.data.data;
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
			this.bodyReady()
		}
    },
    created(){
    	this.bodyReady();
    }
}
</script>

<style lang="scss" scoped>
	.admin-center{
		width: 100%;
		.goods-list {
			font-size: 18px;
			.top-search{
				margin-bottom: 20px;
			}
			.top-bar{
				margin-bottom: 20px;
			}
            .goods-table {
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
					font-size: 14px;
			    padding: 10px;
			    text-align: center;
			    img{
			    	max-width: 100%;
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
	
</style>
