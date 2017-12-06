  <template>
  	<!--供应商录入-->
  <div class="admin-center">
	   	<div class="admin-center-top clearfix">
	   	  	  <el-button @click="addSuppShow=true" class="f-r" type="primary">添加商品</el-button>
        </div>
        <div class="goods-list">
			<div class="top-search">
				<el-select v-model="select"  placeholder="请选择">
					<el-option label="上架" value="1"></el-option>
					<el-option label="下架" value="2"></el-option>
				</el-select>
				<el-button type="primary" icon="search">搜索</el-button>
			</div>
			<div class="top-bar">
				<el-button  type="info">全部下架</el-button>
				<el-button  type="success">全部上架</el-button>
				<el-button  type="warning">全部删除</el-button>
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
				width="120">
				</el-table-column>
				<el-table-column
				prop="title"
				label="名称"
				width="160">
				</el-table-column>
				<el-table-column
				label="头图"
				width="160">
				<template slot-scope="scope">
					<img :src="scope.row.picUrl">
				</template>
				</el-table-column>
				<el-table-column
				prop="price"
				label="价格"
				width="100">
				</el-table-column>
				<el-table-column
				label="操作"
				>
					<template slot-scope="scope">
						<el-button v-if="scope.row.status" @click="edit(index,item.supplierId)" type="info">下架</el-button>
						<el-button v-else @click="edit(index,item.supplierId)" type="success">上架</el-button>
						<el-button @click="edit(index,item.supplierId)">编辑</el-button>
						<el-button @click="delect(item.supplierId)" type="warning">删除</el-button>
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
			multipleSelection: []
		}
    },
    components: {
    },
    methods:{
		// toggleSelection(rows) {
		// 	if (rows) {
		// 		rows.forEach(row => {
		// 			this.$refs.multipleTable.toggleRowSelection(row);
		// 		});
		// 	} else {
		// 		this.$refs.multipleTable.clearSelection();
		// 	}
		// },
		handleSelectionChange(val) {
			this.multipleSelection = val;
			console.log(this.multipleSelection)
		},
        edit:function(e,f){
        },
    	delect:function(){
	    		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
	        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
	        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
	        });
    	},

    	bodyReady:function(){
			var url='http://luxma.helpyoulove.com/item/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				this.goodsList=response.data.data;
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
