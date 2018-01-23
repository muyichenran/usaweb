  <template>
  	<!--供应商录入-->
  <div class="admin-center">
	   	  <div class="admin-center-top clearfix">
	   	  	  <el-button @click="addSuppShow=true" class="f-r" type="primary">Vendor Entry	</el-button>
        </div>
        <div class="adver-list">
            <table class="adver-table">
                <thead>
                    <tr>
						<td width="100">Number</td>
                        <td width="160">LOGO</td>
                        <td width="160">Vendor Names</td>
                        <td width="160">Issue Date</td>
                        <td width="160">Modify Date	</td>
                        <td>Operating</td>
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
                            <el-button @click="edit(index,item.supplierId)">Edit</el-button>
                    	  	<el-button @click="delect(item.supplierId)" type="warning">Delect</el-button>
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
        					<td align="right"  width="100">Number</td>
        					<td width="195">
        						<el-input v-model="supplier.sortNum" placeholder="Please Enter Number"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right">Name</td>
        					<td>
        						<el-input  v-model="supplier.name" placeholder="Please Enter Name"></el-input>
        					</td>
        				</tr>
        				<tr>
        					<td align="right">Logo</td>
        					<td>
        						<el-upload
										  class="avatar-uploader"
										  name="uploadFile"
										  action="http://manager.luxtonusa.com/picture/upload"
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
        				<el-button @click="subSupplier()" type="primary">Submit</el-button>
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
	    		this.$confirm('This will permanently delete this file, Continue?', 'Prompt', {
		          confirmButtonText: 'Confirm',
		          cancelButtonText: 'Cancel',
		          type: 'warning'
	        }).then(() => {
		          this.$message({
		            type: 'success',
		            message: 'Delect Success!'
		          });
	        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: 'Deleted'
		          });          
	        });
    	},
    	subSupplier:function(){
    			var url='http://manager.luxtonusa.com/supplier/insert';
	        var vm=this;
	        this.$http.post(url,vm.supplier).then(response => {   
	            this.$message({
		            type: 'success',
		            message: 'Submit Success!'
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
			var url='http://manager.luxtonusa.com/supplier/get/list';
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
