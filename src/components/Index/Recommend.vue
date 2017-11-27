  <template>
  	<!--首页商品推荐-->
  <div class="admin-center">
  			<div class="add-column">
  					<div class="admin-center-top clearfix">
  						<el-button @click="addColumnShow=true" class="f-r" type="primary">添加栏目</el-button>
  					</div>
  					<div class="column-list">
  						<span class="item">
  							<label>新品发布</label>
  							<a @click="delectClumn()" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
  						</span>
  					</div>
  			</div>
  			<div>
		   	  <div class="alladver-top clearfix">
		   	  	<div class="select-search f-l">
		   	  			<el-select v-model="value2" placeholder="请选择">
							    <el-option
							      v-for="item in options2"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value"
							      :disabled="item.disabled">
							    </el-option>
							  </el-select>
		   	  	</div>
		   	  	<el-button @click="alertFun()" class="f-l" style="margin-left: 15px;" type="primary" icon="search">搜索</el-button>
	          <el-button @click="addAdverShow=true" class="f-r" plain>添加商品推荐</el-button>
	        </div>
	        <div class="adver-list">
            <table class="adver-table">
                <thead>
                    <tr>
                    		<td width="60">序号</td>
                    		<td width="120">分类</td>
                        <td width="160">图片</td>				
                        <td width="80">商品ID</td>
												<td width="100">商品推荐</td>
                        <td width="160">修改时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    		<td valign="middle">1</td>
                    		<td>分类</td>
                        <td>
                            <img src="../../assets/logo.png"/>
                        </td>
                        <td valign="middle">商品ID</td>
                        <td width="100">新品</td>
                        <td valign="middle">修改时间</td>
                        <td valign="middle" class="operate-table">
                            <el-button>编辑</el-button>
                    	  	  <el-button v-on:click="delect()" type="warning">删除</el-button>
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
        				<tr>
        					<td align="right"  width="100">类型</td>
        					<td>
        						<el-input  placeholder="请输入类型"></el-input>
        					</td>
        				</tr>
        				<tr >
        					<td align="right">类型名称</td>
        					<td>
        						<el-input  placeholder="请输入名称"></el-input>
        					</td>
        				</tr>
								
        			</table>
        			<p class="sub-adver" >
        				<el-button type="primary">提交</el-button>
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
        						选择类型
        					</td>
        					<td>
											<el-select v-model="value2" placeholder="请选择">
										    <el-option
										      v-for="item in options2"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value"
										      :disabled="item.disabled">
										    </el-option>
										  </el-select>
        					</td>
        				</tr>
        				<tr>
        					<td align="right"  width="100">序号</td>
        					<td>
        						<el-input  placeholder="请输入序号"></el-input>
        					</td>
        				</tr>
        				<tr >
        					<td align="right" width="100">商品ID</td>
        					<td>
        						<el-input  placeholder="请输入ID"></el-input>
        					</td>
        				</tr>
								<tr>
        					<td align="right" width="100">商品推荐</td>
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
      	addColumnShow:false,
      	addAdverShow:false,
      	options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: ''
      }
    },
    components: {
    },
    methods:{
    	alertFun:function(){
    		console.log(this.value2)
    	},
    	delectClumn:function(){
    		
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
    	}
    },
    created(){
    	
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
