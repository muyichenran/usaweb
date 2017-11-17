  <template>
  	<!--商品列表-->
  <div class="merchandise">
	   	  <div class="allMerchandise-top clearfix">
            <a href="javascript:;" class="add-merchandise f-r">添加供应商</a>
        </div>
        <div class="merchandise-list">
            <table class="merchandise-table">
                <thead>
                    <tr>
                    		<td width="60">序号</td>
                        <td width="180">LOGO</td>
                        <td width="140">供应商名称</td>
                        <td width="180">发布时间</td>
                        <td width="180">修改时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    		<td valign="middle">1</td>
                        <td>
                            <img src="../../assets/logo.png"/>
                        </td>
                        <td>
                        	nick
                        </td>
                        <td valign="middle">发布时间</td>
                        <td valign="middle">修改时间</td>
                        <td valign="middle" class="operate-table">
                            <a class="compile">编辑</a>
                            <a href="javascript:;"  v-on:click="delect()" class="delect" >删除</a>
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
        					<td width="195">
        						<el-input  placeholder="请输入序号"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right" width="90">名称</td>
        					<td>
        						<el-input  placeholder="请输入名称"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right" width="90">Logo</td>
        					<td>
        						<el-upload
										  class="avatar-uploader"
										  action="https://jsonplaceholder.typicode.com/posts/"
										  :show-file-list="false"
										  :on-success="handleAvatarSuccess"
										  :before-upload="beforeAvatarUpload">
										  <img v-if="imageUrl" :src="imageUrl" class="avatar">
										  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
        					</td>
        				</tr>
        			</table>
        			<p class="sub-adver" >
        				<el-button type="primary">提交</el-button>
        			</p>
        			
        	</div>
        </div>
        
  </div>
</template>

<script>
export default {
   data(){
      return{
      	imageUrl: '',
      	addAdverShow:false,
      }
    },
    components: {
    },
    methods:{
    	handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
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

<style lang="scss">
	.merchandise{
		width: 100%;
		font-size: 14px;
		.allMerchandise-top {
		    height: 50px;
	    	.add-merchandise {
			    display: block;
			    width: 160px;
			    height: 100%;
			    line-height: 50px;
			    text-align: center;
			    font-size: 22px;
			    color: #52a8f9;
			    border: 1px solid #95989a;
			    border-radius: 10px
				}
		}
		.merchandise-list {
	    margin-top: 40px;
	    font-size: 18px;
	    .merchandise-table {
			    width: 100%;
			}
			thead {
			    width: 100%;
			    margin-bottom: 10px;
			    height: 40px;
			    line-height: 40px;
			    text-align: center;
			    border-bottom: 1px solid #e5e5e5;
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

</style>
