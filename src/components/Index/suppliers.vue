  <template>
  	<!--供应商录入-->
  <div class="admin-center">
	   	  <div class="admin-center-top clearfix">
	   	  	  <el-button @click="addSuppShow=true" class="f-r" type="primary">添加供应商</el-button>
        </div>
        <div class="adver-list">
            <table class="adver-table">
                <thead>
                    <tr>
						<td width="60">序号</td>
                        <td width="160">LOGO</td>
                        <td width="140">供应商名称</td>
                        <td width="160">发布时间</td>
                        <td width="160">修改时间</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in supplierList">
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
                    </tr>
                </tbody>                   
            </table>
        </div>
        <div v-if="addSuppShow">
        	<div class="box-shade"></div>
        	<div class="add-tkbox">
        		<a @click="closeTk()" class="close" href="javascript:;">
        			<i class="iconfont">&#xe605;</i>
        		</a>
        			<table>
        				<tr>
        					<td align="right"  width="90">序号</td>
        					<td width="195">
        						<el-input v-model="supplier.sortNum" placeholder="请输入序号"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right" width="90">名称</td>
        					<td>
        						<el-input  v-model="supplier.name" placeholder="请输入名称"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right" width="90">Logo</td>
        					<td>
        						<el-upload
										  class="avatar-uploader"
										  name="uploadFile"
										  action="http://luxma.helpyoulove.com/picture/upload"
										  :show-file-list="false"
										  :on-success="handleAvatarSuccess"
										  :before-upload="beforeAvatarUpload">
										  <img v-if="supplier.picUrl" :src="supplier.picUrl" class="avatar">
										  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
        					</td>
        				</tr>
        			</table>
        			<p class="sub-adver" >
        				<el-button @click="subSupplier()" type="primary">提交</el-button>
        			</p>
        			
        	</div>
        </div>
        
  </div>
</template>

<script>
export default {
   data(){
	      return{
		      	addSuppShow:false,
		      	supplierList:[],
		      	supplier:{}
	      }
    },
    components: {
    },
    methods:{
    	handleAvatarSuccess(res, file) {
			console.log(res)
        	this.supplier.picUrl = res.data;
        },
		beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isLt2M;
		},
      edit:function(e,f){
	      	this.supplier=this.supplierList[e];
	      	this.addSuppShow=true;
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
    	subSupplier:function(){
    			var url='http://luxma.helpyoulove.com/supplier/insert';
	        var vm=this;
	        this.$http.post(url,vm.supplier).then(response => {   
	            this.$message({
		            type: 'success',
		            message: '提交成功!'
				});
				this.bodyReady();
				this.supplier={};
				this.addSuppShow=false;
	        }, response => {
	        });	
    	},
    	closeTk:function(){
    			this.supplier={};
          this.addSuppShow=false;
    	},
    	bodyReady:function(){
			var url='http://luxma.helpyoulove.com/supplier/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				this.supplierList=response.data.data;
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
