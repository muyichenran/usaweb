  <template>
  	<!--首页广告管理-->
  <div class="admin-center">
	   	  <div class="admin-center-top clearfix">
            <el-button class="f-r" type="primary">添加广告</el-button>
        </div>
        <div class="adver-list">
            <table class="adver-table">
                <thead>
                    <tr>
                    	<td width="60">序号</td>
                        <td width="180">商品图片</td>
                        <td width="80">商品ID</td>
						<td width="100">商品推荐</td>
                        <td width="120">发布时间</td>
                        <td width="120">修改时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    		<td valign="middle">1</td>
                        <td>
                            <img src="../../assets/logo.png"/>
                        </td>
                        <td valign="middle">商品ID</td>
						<td valign="middle">新品</td>
                        <td valign="middle">发布时间</td>
                        <td valign="middle">修改时间</td>
                        <td valign="middle" class="operate-table">
                            <el-button>编辑</el-button>
                    	  	  <el-button v-on:click="delect()" type="warning">删除</el-button>
                        </td>
                    </tr>
                </tbody>                   
            </table>
        </div>
       
       <div v-if="addAdverShow">
        	<div class="box-shade"></div>
        	<div class="add-tkbox">
        		<a @click="addAdverShow=false" class="close" href="javascript:;">
        			<i class="iconfont">&#xe605;</i>
        		</a>
        			<table>
        				<tr>
        					<td align="right"  width="90">序号</td>
        					<td>
        						<el-input  placeholder="请输入序号"></el-input>
        					</td>
        				</tr>
        				<tr >
        					<td align="right" width="90">商品ID</td>
        					<td>
        						<el-input  placeholder="请输入ID"></el-input>
        					</td>
        				</tr>
						<tr >
        					<td align="right" width="90">商品推荐</td>
        					<td>
        						<el-input  placeholder="请输入推荐"></el-input>
        					</td>
        				</tr>
        			</table>
        			<p class="sub-adver" >
        				<el-button type="primary">主要按钮</el-button>
        			</p>
        			
        	</div>
        </div>
        
  </div>
</template>

<script>
export default {
   data(){
      return{
      	addAdverShow:false,
      }
    },
    components: {
    },
    methods:{
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
    	}
    },
    created(){
    	
    }
}
</script>

<style lang="scss" scoped>
	.admin-center{
		width: 100%;
		.adver-list {
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