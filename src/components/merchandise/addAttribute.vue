  <template>
  	<!--添加分区属性管理-->
  	<div class="admin-center">
		<div class="attribute-block">
			<div class="attribute-block-top">
				<span style="font-size:18px;">分区：</span><el-select v-model="catId" placeholder="请选择">
					<el-option
					v-for="(item,index) in itemList"
					:key="index"
					:label="item.title"
					:value="item.catId">
					</el-option>
				</el-select>
			</div>
			<div v-if="catId" class="attribute-block-center">
				<div class="add-attribute">
						<div class="add-newattri-top clearfix">
					 		<el-button @click="addNewTriShow=true" class="f-l" type="primary" round>添加属性类别</el-button>
					 	</div>
					 	<div class="add-newattri" v-for="(item,index) in propertyList">
					 		<div class="first-input clearfix">
					 			<div class="input f-l"><el-input v-model="item.property.title"  :disabled="true"></el-input></div>
								<a @click="delectNewTri(1,item.property.propertyId)" href="javascript:;" class="delect-button f-r">
					 				<i class="iconfont">&#xe606;</i>
					 			</a> 
					 			<a @click="addNewTriSecond(item.property.propertyId)" href="javascript:;" class="add-button f-r">
					 				<i class="iconfont">&#xe600;</i>
					 			</a>
					 		</div>
					 		<div v-for="(item1,index1) in item.values" class="second-input clearfix">
					 			<div class="input f-l"><el-input v-model="item1.valueTitle" :disabled="true"></el-input></div>
								<div class="input f-l"><el-input v-model="item1.remark" :disabled="true"></el-input></div>
								<a @click="delectNewTri(2,item1.propertyValueId)" href="javascript:;" class="delect-button f-r">
					 				<i class="iconfont">&#xe606;</i>
					 			</a> 								
					 		</div>
					 	</div>
				</div>
			</div>
		</div>	
		<div v-if="addNewTriShow">
			<div class="v-modal" style="z-index: 2001;"></div>
			<div  class="el-message-box__wrapper" style="z-index: 2009;">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">Prompt</div>
					<button @click="addNewTriClose()" type="button" class="el-message-box__headerbtn">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="el-message-box__status"></div>
					<div class="el-message-box__message" style="margin-left: 0px;">
						<p>请输入属性名</p>
					</div>
					<div class="el-message-box__input">
						<div class="el-input">
							<input v-model="addFirstObj.title" autocomplete="off" placeholder="" type="text" rows="2" class="el-input__inner">
						</div>
					</div>
					<div class="el-message-box__message" style="margin-left: 0px;">
						<p>属性类型</p>
					</div>



					<div class="el-message-box__input">
						<el-checkbox v-model="addFirstObj.isSearch">是否是检索</el-checkbox>
					</div>
					<div class="el-message-box__input">
						<el-checkbox v-model="addFirstObj.isColor">是否是颜色</el-checkbox>
					</div>	
					<div class="el-message-box__input">
						<el-checkbox v-model="addFirstObj.isSize">是否是尺寸</el-checkbox>
					</div>
					<!-- <div class="el-message-box__input">
						<el-checkbox v-model="addFirstObj.isSale">是否是销售</el-checkbox>
					</div>	 -->
					<div class="el-message-box__btns">
						<button @click="addNewTriClose()" type="button" class="el-button el-button--default">
							<span>
								Cancel
							</span>
						</button>
						<button @click="addNewTri()" type="button" class="el-button el-button--default el-button--primary ">
							<span>
								Confirm
							</span>
						</button>
					</div>
				</div>
			</div>	
		</div>
		</div>	
		<div v-if="addNewTriSecondShow">
			<div  class="v-modal" style="z-index: 2001;"></div>
			<div  class="el-message-box__wrapper" style="z-index: 2009;">
			<div class="el-message-box">
				<div class="el-message-box__header">
					<div class="el-message-box__title">Prompt</div>
					<button @click="addNewTriSecondClose()" type="button" class="el-message-box__headerbtn">
						<i class="el-message-box__close el-icon-close"></i>
					</button>
				</div>
				<div class="el-message-box__content">
					<div class="el-message-box__status"></div>
					<div class="el-message-box__message" style="margin-left: 0px;">
						<p>请输入属性名</p>
					</div>
					<div class="el-message-box__input">
						<div class="el-input">
							<input v-model="addSecondObj.valueTitle" autocomplete="off" placeholder="" type="text" rows="2" class="el-input__inner">
						</div>
					</div>
					<div class="el-message-box__message" style="margin-left: 0px;">
						<p>请输入备注</p>
					</div>
					<div class="el-message-box__input">
						<div class="el-input">
							<input v-model="addSecondObj.remark" autocomplete="off" placeholder="" type="text" rows="2" class="el-input__inner">
						</div>
					</div>
					<div class="el-message-box__btns">
						<button @click="addNewTriSecondClose()" type="button" class="el-button el-button--default">
							<span>
								Cancel
							</span>
						</button>
						<button @click="subNewTriSecond()" type="button" class="el-button el-button--default el-button--primary ">
							<span>
								Confirm
							</span>
						</button>
					</div>
				</div>
			</div>	
		</div>
		</div>	
	</div>
</template>
<script>
export default {
   	data(){
      	return{
			itemList:[],
			catId: '',
			addNewTriShow:false,
			addFirstObj:{
				isSearch:false,
				isColor:false,
				isSize:false,
			},
			addNewTriSecondShow:false,
			addSecondObj:{},
			propertyId:'',
		    selectShow:false,
		    propertyList:[],
		    // checkList:[]
      	}
    },
	watch:{
		catId(val){
			if(val){
				this.getPropertyAll();
			}
		}
	},
    components: {
    },
    methods:{
		alert:function(){
			console.log(this.checkList)
		},
		bodyReady:function(){
			var url='http://manager.luxtonusa.com/item/cat/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				this.itemList=response.data.data;
			}, response => {
			});
		},
		addNewTri:function(){
			this.addFirstObj.catId=this.catId;
			if(this.addFirstObj.valueTitle==''){
				this.$message({
					type: 'error',
					message: 'Must not be empty'
				}); 
			}else{
				var url='http://manager.luxtonusa.com/property/insert';
				var vm=this;
				this.$http.post(url,vm.addFirstObj).then(response => {   
					if(response.data.status==432){
						this.$message.error("登录过期，请重新登录！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.$message({
							type: 'success',
							message: 'Submit Success'
						});
						this.addNewTriShow=false;
						this.addFirstObj={};
						this.getPropertyAll()
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
		addNewTriClose:function(){
			this.$message({
				type: 'info',
				message: 'Cancel the input'
			}); 
			this.addNewTriShow=false;
			this.addFirstObj={};
		},
		addNewTriSecond:function(e){
			this.propertyId=e;
			this.addNewTriSecondShow=true;
		},
		addNewTriSecondClose:function(){
			this.$message({
				type: 'info',
				message: 'Cancel the input'
			});  
			this.propertyId='';
			this.addNewTriSecondShow=false;
			this.addSecondObj={};
		},
		subNewTriSecond:function(){
			if(this.addSecondObj.valueTitle==''){
				this.$message({
					type: 'error',
					message: 'Must not be empty'
				}); 
			}else{
				this.addSecondObj.propertyId=this.propertyId;
				this.addSecondObj.catId=this.catId;
				var url='http://manager.luxtonusa.com/property/value/insert';
				var vm=this;
				this.$http.post(url,vm.addSecondObj).then(response => {  
					if(response.data.status==432){
						this.$message.error("登录过期，请重新登录！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.$message({
							type: 'success',
							message: 'Submit Success'
						}); 
						this.getPropertyAll();
						this.addSecondObj={};
						this.addNewTriSecondShow=false;
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
		delectNewTri:function(e,f){
			this.$confirm('This will permanently delete this file, Continue?', 'Prompt', {
				confirmButtonText: 'Confirm',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				var url="";
				if(e=='1'){
					url='http://manager.luxtonusa.com/property/delete/'+f;
				}else{
					url='http://manager.luxtonusa.com/property/value/delete/'+f;
				}
				var vm=this;
				this.$http.post(url).then(response => {
					if(response.data.status==432){
						this.$message.error("登录过期，请重新登录！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){
						this.$message({
							type: 'success',
							message: 'Delect Success!'
						});
						this.getPropertyAll();
					}else{
						this.$message({
							message: response.data.status,
							type: 'error'
						});
					}   
				}, response => {
				});
				
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Deleted'
				});          
			});
			
		},	
		getPropertyAll:function(){
			var url='http://manager.luxtonusa.com/property/get/info/'+this.catId;
			var vm=this;
			this.$http.post(url).then(response => {   		
				if(response.data.status==432){
					this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
					this.$router.replace("/Login")
				}else if(response.data.status==200){
					this.propertyList=response.data.data;
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
    created(){
    	this.bodyReady()
    }
}
</script>
<style lang="scss" scoped>
	.el-select-dropdown__item{
		display: block;
	}
	.attribute-block{
		min-height: 400px;
		
		.attribute-block-top{
			.attribute-name{
				color: #409eff;
				padding-left: 30px;
				font-size: 16px;
			}
		}
	}
	.select-division{
		.usa-up-box{
			width: 350px;
			padding: 20px 30px;
			padding-right: 0;
			border-radius: 0;
			height: 400px;
			overflow-x: hidden;
			overflow-y: scroll;
		}
		.first-division{
			&>.title{
				margin-bottom: 5px;
				font-size: 18px;
				line-height: 36px;
				background: #f2f2f2;
				padding: 0 10px;
			}
			.second-division{
				width:300px;				
				font-size: 16px;				
				margin-left: 20px;
				.second-title{
					padding: 0 10px;
					background: #f1f1f1;
					line-height: 30px;
					margin-bottom: 5px;
				}
			}
		}
		
		
	}
	.attribute-block-center{
			margin-top: 30px;
		.add-attribute{
			width: 400px;
			margin-bottom: 40px;
			.add-button{
					display: inline-block;	
					height: 36px;
					line-height: 36px;				
					i{
						font-size:30px;
						color: #409EFF;
					}
			}
			.delect-button{
				display: inline-block;	
				padding-left: 10px;
				height: 36px;
				line-height: 36px;				
				i{
					font-size:29px;
					color: #fe4343;
				}
			}
			.add-newattri-top{
				margin-bottom: 15px;
				.add-fg{
					font-size: 18px
				}
			}
			.add-newattri{
				margin-bottom: 30px;
				.first-input{
					.input{
						width: 320px;
					}
				}
				.second-input{
					margin-top: 10px;
					width: 360px;
					margin-left: 40px;
					.input{
						width: 110px;
						&:first-child{
							width: 160px;
							margin-right: 10px;
						}
					}
				}

			}
		}
	}
</style>

