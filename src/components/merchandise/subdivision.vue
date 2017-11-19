  <template>
  	<!--分区管理-->
  <div class="admin-center">
	   	  <div class="admin-center-top clearfix">
            <el-button @click="addSubShow=true" class="f-r" type="primary">添加分区</el-button>
        </div>
        <div class="subdivision-list">
            <table class="subdivision-table">
                <thead>
                    <tr>
                    		<td width="60">序号</td>
                        <td width="200">分区名称</td>
                        <td align="right">
                        	<span style="padding-right: 25px;">操作</span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    		<td valign="top">
                    			<span class="height36">1</span>
                    		</td>
                        <td valign="top">
                      	 	<span class="height36"> 衬衫</span>
                        </td>
                        <td valign="middle">
                        	  <p class="align-right">
                        	  	<el-button>编辑</el-button>
                        	  	<el-button v-on:click="delect()" type="warning">删除</el-button>
                            	<el-button type="primary">添加子分区</el-button>
                        	  </p>
                            <table class="second-table">
                            	<thead>
	                            		<tr>
							                    		<td width="60">序号</td>
							                        <td width="150">分区名称</td>
							                        <td align="right">
							                        	<span style="padding-right: 25px;">操作</span>
							                        </td>
							                    </tr>
						   								</thead>	  
						   								<tbody>
							                    <tr>
							                    		<td valign="top">
							                    			<span class="height36">1</span>
							                    		</td>
							                        <td valign="top">
							                      	 	<span class="height36"> 衬衫</span>
							                        </td>
							                        <td valign="middle" style="padding-right: 0;">
							                        	  <p class="align-right">
							                        	  	<el-button>编辑</el-button>
							                        	  	<el-button v-on:click="delect()" type="warning">删除</el-button>
							                         		 </p>
							                        </td>	  
							                    </tr>    
							                 </tbody>   
                            </table>
                        </td>
                    </tr>
                </tbody>                   
            </table>
        </div>
        <div v-if="addSubShow">
        	<div class="box-shade"></div>
        	<div class="add-sub-box">
        			<a  class="close" href="javascript:;">
        				<i class="iconfont">&#xe605;</i>
	        		</a>	
        			<table>
									<tr>
										<td width="120" align="right">序号</td>
										<td width="220">
											<el-input v-model="addSubShow"></el-input>
										</td>
									</tr>
									<tr>
										<td width="120" align="right">名称</td>
										<td width="220">
											<el-input v-model="addSubShow"></el-input>
										</td>
									</tr>
							</table>
							<p class="align-center">
								 <el-button  type="primary"  class="submit-btn">Submit</el-button>
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
    	},
    	delectSubdivision:function(){
    		
    	}
    	
    },
    created(){
    	
    }
}
</script>

<style lang="scss">
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
				}
				.second-table{
					width: 100%;
					margin-top: 10px;
					
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
							    padding: 0 8px
							}
					}
					&>tbody{
						&>tr{
							&>td{
								padding: 8px;
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
