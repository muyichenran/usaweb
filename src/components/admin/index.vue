<template>
  <div class="admin-center">
  		<div class="admin-center-top clearfix">
            <el-button @click="addSubShow=true" class="f-r" type="primary">添加管理员</el-button>
    	</div>
    	<div class="admin-list">
          <table class="admin-table">
              <thead>
                <tr>
                	  <td width="150">姓名</td>
                    <td width="250">密码</td>
                    <td align="center">
                    	<span style="padding-right: 25px;">操作</span>
                    </td>
                </tr>
              </thead>
              <tbody>
              	<tr>
                	  <td width="150">姓名</td>
                    <td width="250">密码</td>
                    <td valign="middle" align="center">
                    	<p class="align-center">
												<el-button type="primary">编辑</el-button>
												<el-button v-on:click="delect()" type="warning">删除</el-button>
											</p>
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
								<td width="120" align="right">姓名</td>
								<td width="220">
									<el-input v-model="addSubShow"></el-input>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">密码</td>
								<td width="220">
									<el-input v-model="addSubShow"></el-input>
								</td>
							</tr>
							<tr>
								<td width="120" align="right">确认密码</td>
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
      	supplier:[]
      }
    },
    components: {
    },
    methods:{
	    	delect:function(){},
	    	bodyReady:function(){
	    			var url='http://manager.luxtonusa.com/supplier/get/list';
		        var vm=this;
		        this.$http.post(url).then(response => {   
		            this.supplier=response.data.data;
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
.admin-list{  
	font-size: 16px;
	.height36{
		display: inline-block;
		line-height: 36px;
	}
	.el-button--primary{
		padding:10px 15px;
	}
	.admin-table {
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
