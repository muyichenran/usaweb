  <template>
  	<!--供应商录入-->
  <div class="admin-center">
	   	<div class="admin-center-top clearfix">
	   	  	  <el-button @click="addSuppShow=true" class="f-r" type="primary">添加商品</el-button>
        </div>
        <div class="goods-list">
            <table class="goods-table">
                <thead>
                    <tr>
						<td width="80">商品Id</td>
                        <td width="160">名称</td>
                        <td width="140">头图</td>
                        <td width="160">价格</td>
                        <td width="160">修改时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for="(item,index) in supplierList">
                    	<td valign="middle">{{item.sortNum}}</td>
                        <td>
                            <img :src="item.picUrl"/>
                        </td>
                        <td>
                        	{{item.name}}
                        </td>
                        <td valign="middle">{{item.createTime |formatTime}}</td>
                        <td valign="middle">{{item.updateTime |formatTime}}</td>
                        <td valign="middle" class="operate-table">
                            <el-button @click="edit(index,item.supplierId)">编辑</el-button>
                    	  	  <el-button @click="delect(item.supplierId)" type="warning">删除</el-button>
                        </td>
                    </tr> -->
                </tbody>                   
            </table>
        </div>

        
  </div>
</template>

<script>
export default {
   data(){
	      return{
		      	addSuppShow:false,
		      	goodsList:[],
		      	supplier:{}
	      }
    },
    components: {
    },
    methods:{
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
