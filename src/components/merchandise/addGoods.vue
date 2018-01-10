  <template>
  	<!--添加商品管理-->
  	<div class="admin-center">
        <div class="goods-table">
                <table>
                    <!-- <tr>
                        <td align="right"  width="120">序号</td>
                        <td width="750">
                            <el-input class="width300"  placeholder="请输入序号"></el-input>
                        </td>
                    </tr> -->
					<tr>
                        <td align="right"  width="120">商品名称</td>
                        <td width="750">
                            <el-input v-model="GoodsInfo.title" class="width300"  placeholder="请输入商品名称"></el-input>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">品牌</td>
                        <td width="750">
							<el-select v-model="GoodsInfo.supplierId" class="width300" placeholder="请选择">
								<el-option
								v-for="(item,index) in supplierList"
								:key="index"
								:label="item.name"
								:value="item.supplierId">
								</el-option>
							</el-select>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">所属分区</td>
                        <td width="750">
							<el-select v-model="catId" class="width300" placeholder="请选择">
								<el-option
								v-for="(item, index) in itemList"
								:key="index"
								:label="item.title"
								:value="item.catId">
								</el-option>
							</el-select>
                        </td>
                    </tr>
					<tr v-if="isSearchObj.property">
                        <td align="right"  width="120">{{isSearchObj.property.title}}</td>
                        <td width="750">
							<el-select v-model="searchObjIndex" class="width300" placeholder="请选择">
								<el-option
								v-for="(item,index) in isSearchObj.values"
								:key="index"
								:value="index"
								:label="item.valueTitle"
								>
								</el-option>
							</el-select>
						</td>
                    </tr>
					<tr>
                        <td align="right" valign="top" width="120">商品头图</td>
                        <td width="750">
							<el-upload
								class="avatar-uploader"
								name="uploadFile"
								action="http://luxma.helpyoulove.com/picture/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
								
								<img v-if="headerPicUrl" :src="headerPicUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
                        </td>
                    </tr>
					
					<tr>
                        <td align="right" valign="top" width="120">商品图片</td>
                        <td class="uploadpic-list" width="750">
							<el-upload
								class="avatar-uploader"
								name="uploadFile"
								action="http://luxma.helpyoulove.com/picture/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess1"
								:before-upload="beforeAvatarUpload">
								
								<img v-if="picList1" :src="picList1" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-upload
								class="avatar-uploader"
								name="uploadFile"
								action="http://luxma.helpyoulove.com/picture/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess2"
								:before-upload="beforeAvatarUpload">
								
								<img v-if="picList2" :src="picList2" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-upload
								class="avatar-uploader"
								name="uploadFile"
								action="http://luxma.helpyoulove.com/picture/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess3"
								:before-upload="beforeAvatarUpload">
								
								<img v-if="picList3" :src="picList3" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<el-upload
								class="avatar-uploader"
								name="uploadFile"
								action="http://luxma.helpyoulove.com/picture/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess4"
								:before-upload="beforeAvatarUpload">
								
								<img v-if="picList4" :src="picList4" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
                        </td>
                    </tr>
					
					<tr v-if="catId">
                        <td align="right" valign="top">商品规格</td>
                        <td>
                            <div class="product-speci">
								<div class="item-block color-block">
									<p class="title">颜色：</p>	
									<div class="attribute-list">
										{{colorList}}
										<el-checkbox-group v-model="colorList">
											<el-checkbox  v-for="(item,index) in isColorObj.values" v-bind:style="{background:item.valueTitle}" :key="item.propertyValueId" :label="item" border>
												{{item.remark}}
											</el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="item-block">
									<p class="title">标尺：</p>	
									<div class="attribute-list">
										{{sizeList}}
										<el-checkbox-group v-model="sizeList">
											<el-checkbox v-for="(item,index) in isSizeObj.values" :label="item" border>
												{{item.valueTitle}}
											</el-checkbox>
										</el-checkbox-group>    
									</div>
								</div>
								<div class="item-block">
									<p class="title">商品销售规格：</p>
									<p class="prompting">注意：颜色、标尺，两个属性必须勾选，如果不勾选将会导致无法保存库存；库存为0的商品将在前段不予展示</p>	
									<div class="batch-fill">
										批量填充：<el-input class="width150"  v-model="price" placeholder="请输入商品价格"></el-input>
										<el-input class="width150" v-model="quantity" placeholder="请输入商品库存"></el-input>
										<el-button  @click="subPrice()" plain>确认</el-button>
									</div>
									<div class="attribute-list">
										<table class="goods-list">
											<thead>
												<tr>
													<td>color</td>
													<td>size</td>
													<td>quantity</td>
													<td>price</td>
												</tr>
											</thead>
											<tbody>
												 <tr v-for="(item,index) in skuList">
													<td>{{item.colorName}}</td>
													<td>{{item.sizeName}}</td>
													<td><el-input style="width:150px" v-model="item.quantity"></el-input></td>
													<td><el-input style="width:150px"  v-model="item.price"></el-input></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">商品描述</td>
                        <td width="750">
							<el-input
							v-model="GoodsInfo.sellPoint"
							class="width300"
							type="textarea"
							autosize
							placeholder="请输入描述"
							>
							</el-input>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">是否上架</td>
                        <td width="750">
							<el-radio v-model="GoodsInfo.status" label="true">上架</el-radio>
							<el-radio v-model="GoodsInfo.status" label="false">下架</el-radio>
                        </td>
                    </tr>
                </table>
                <p class="align-center">
					<el-button class="sub-allinfo" @click="subGoods()" type="primary">提交</el-button>
                </p>
			</div>
        </div>	
  	</div>
</template>

<script>
export default {
   	data(){
		return{
			fileList:[],
			catId:'',
			GoodsInfo:{
				status:'true'
			},
			itemList:[],	
			supplierList:[],
			propertyList:[],
			isSearchObj:[],
			searchObjIndex:0,
			isColorObj:[],
			colorList:[],
			isSizeObj:[],
			sizeList:[],
			headerPicUrl:'',
			picList1:'',
			picList2:'',
			picList3:'',
			picList4:'',
			picList:[],



			skuList:[],
			quantity:'',
			price:'',



	//    	sizeType1ListInput:[],
			sizeRadio:'type1',
			addSubShow:false,
			addColorShow:false,
			addSize3Show:false,
			
		}
    },
	watch:{
		catId(val){
			if(val){
				this.GoodsInfo.catId=val;
				this.getPropertyAll();
			}
		},
		colorList(val){
			if(val.length>0){
				if(this.sizeList.length>0){
					this.skuList=[]; 
					var i=0,j=0,m;
					for(i in this.colorList){
						
						for(j in this.sizeList){
							var newArray={};
							newArray.colorName=this.colorList[i].valueTitle;
							newArray.sizeName=this.sizeList[j].valueTitle;
							newArray.properties=this.colorList[i].propertyValueId+','+this.sizeList[j].propertyValueId;
							newArray.title='COLOR:'+this.colorList[i].remark+'<br/>SIZE:'+this.sizeList[j].remark
							newArray.quantity='';
							newArray.price='';
							this.skuList.push(newArray);
						}
						
					}
					console.log(this.skuList)
				}
			}
		},
		sizeList(val){
			if(val.length>0){
				
				if(this.colorList.length>0){
					this.skuList=[]; 
					var i=0,j=0,m;
					for(i in this.colorList){
						
						for(j in this.sizeList){
							var newArray={};
							newArray.colorName=this.colorList[i].valueTitle;
							newArray.sizeName=this.sizeList[j].valueTitle;
							newArray.properties=this.colorList[i].propertyValueId+','+this.sizeList[j].propertyValueId;
							newArray.title='COLOR:'+this.colorList[i].remark+'<br/>SIZE:'+this.sizeList[j].remark
							newArray.quantity='';
							newArray.price='';
							this.skuList.push(newArray);
						}
						
					}
					console.log(this.skuList)
				}
			}
		},
	},
    components: {
    },
    methods:{
    	delectSubdivision:function(){
    		
    	},
    	subColorFun:function(){
    		if(this.colorObj.colorName==''||this.colorObj.colorName==null||this.colorObj.colorName==undefined){
    			this.$message.error("Can't Be Null!");
    			return false;
    		}
    		if(this.colorObj.colorValue==''||this.colorObj.colorValue==null||this.colorObj.colorValue==undefined){
    			this.$message.error("Can't Be Null!");
    			return false;
    		}
    		this.colorList.push(this.colorObj);
    		this.addColorShow=false;
    		this.colorObj={};
    		
    	},
    	delectColorObj:function(e){
    		this.colorList.splice(e,1);
    	},
    	addSizeType1:function(){
    		this.$prompt('请输入尺码', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			inputPattern: /\S/,
			inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
        	
          	this.sizeTypeList.push(value);
          
        }).catch(() => {
			this.$message({
				type: 'info',
				message: '取消输入'
			});       
        });
    	},
    	delectSizeType1:function(e){
    		this.sizeTypeList.splice(e,1);
    	},
    	
    	subSize3Fun:function(){
    		if(this.shoesSizeObj.Name==""||this.shoesSizeObj.Name==null){
    			this.$message.error("Can't Be Null!");
    			return false;
    		}
    		if(this.shoesSizeObj.Number==""||this.shoesSizeObj.Number==null){
    			this.$message.error("Can't Be Null!");
    			return false;
    		}
    		this.sizeTypeList.push(this.shoesSizeObj);
    		this.addSize3Show=false;
    		this.shoesSizeObj={};
    	},
		



		fqItemListReady:function(){
			var url='http://luxma.helpyoulove.com/item/cat/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){   
					this.itemList=response.data.data;
				}else{
					this.$message.error(response.data.msg);
				}
				
			}, response => {
			});
		},
		supplierListReady:function(){
			var url='http://luxma.helpyoulove.com/supplier/get/list';
			var vm=this;
			this.$http.post(url).then(response => {   
				this.supplierList=response.data.data;
				
			}, response => {
			});
		},
		getPropertyAll:function(){
			var url='http://luxma.helpyoulove.com/property/get/info/'+this.GoodsInfo.catId;
			var vm=this;
			this.$http.post(url).then(response => {   
				this.propertyList=response.data.data;
				for(var i in this.propertyList){
					if(this.propertyList[i].property.isSearch){
						this.isSearchObj=this.propertyList[i];
					}
					if(this.propertyList[i].property.isColor){
						this.isColorObj=this.propertyList[i];
					}
					if(this.propertyList[i].property.isSize){
						this.isSizeObj=this.propertyList[i];
					}
				}
				console.log(this.isColorObj)
			}, response => {
			});
		},
		handleAvatarSuccess(res, file) {
			this.headerPicUrl=res.data
			this.GoodsInfo.picUrl = res.data;	
			this.picList[0]=res.data;
		},
		handleAvatarSuccess1(res, file) {
			this.picList1=res.data;
			this.picList[1]=res.data;
		},
		handleAvatarSuccess2(res, file) {
			this.picList2=res.data;	
			this.picList[2]=res.data;	
		},
		handleAvatarSuccess3(res, file) {
			this.picList3=res.data;
			this.picList[3]=res.data;
		},
		handleAvatarSuccess4(res, file) {
			this.picList4=res.data;
			this.picList[4]=res.data;
		},
		
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},
		subGoods:function(){
			this.GoodsInfo.picList=this.picList;
			this.GoodsInfo.price=this.price;
			var url='http://luxma.helpyoulove.com/item/insert';
			var vm=this;
			this.$http.post(url,vm.GoodsInfo).then(response => {   
				if(response.data){
					this.subPropertyNewList(response.data)
				}
				
			}, response => {
			});
		}, 
		subPropertyNewList:function(e){
			var newObj=this.isSearchObj.values[this.searchObjIndex]
			this.isSearchObj.values=[];
			this.isSearchObj.values.push(newObj);
			this.isColorObj.values=this.colorList;
			this.isSizeObj.values=this.sizeList;
			var propertyNewList=[];
			propertyNewList.push(this.isSearchObj)
			propertyNewList.push(this.isColorObj)
			propertyNewList.push(this.isSizeObj);
			var url2='http://luxma.helpyoulove.com/item/insert/property/'+e.data;
			this.$http.post(url2,propertyNewList).then(response => {  
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }
			}, response => {

			});


			for(var i in this.skuList){
				this.skuList[i].itemId=e.data;
			}
			var vm=this;
			var url3='http://luxma.helpyoulove.com/item/sku/insert';
			this.$http.post(url3,vm.skuList).then(response => { 
				if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){   
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					setTimeout(() => {
						vm.$router.push('/GoodsList')
					}, 1000);
				}else{
					this.$message.error(response.data.msg);
				}
				
			}, response => {

			});

		},
		subPrice:function(){
			for(var i in this.skuList){
				this.skuList[i].price=this.price;
				this.skuList[i].quantity=this.quantity;
			}
		},
    },
    created(){
    	this.fqItemListReady();
		this.supplierListReady();
    }
}
</script>

<style lang="scss" scoped>
	.width300{
		width: 300px;
	}
	.width150{
		width: 150px;
	}
	.admin-center{
		width: 100%;
		.goods-table{
			width: 100%;
			table{
				width: 100%;
				tr{
					td{
						padding:5px 10px;
					}
				}
            }
			.pic-list{
				width: 400px;
			}
            .select-fq{
                display: inline-block;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #fff;
                border: 1px solid #c4c4c4;
                color: #1f2d3d;
                margin: 0;
                padding: 10px 15px;
                border-radius: 4px;
                background: #fff;
                border: 1px solid #bfcbd9;
                color: #1f2d3d;
            }
		}
		.product-speci{
			background: #f2f2f2;
			
			.item-block{
				padding: 20px 10px;
				border-bottom: 1px solid #e5e5e5;
				&:last-child{
					border-bottom: none;
				}
				.title{
					// margin-bottom: 15px;
				}
				.prompting{
					color: #95989a;
					font-size: 14px;
					margin-top:10px; 
				}
				.attribute-list{
					margin-top: 15px;
				}
				.batch-fill{
					margin-top: 10px;
				}
			}
		}
	}
	
	

	
	
	
	.sub-allinfo{
		margin-top: 40px;
		padding:15px 50px;
	}
	.goods-list{
		width: 100%;
		background: #ffffff;
		
		td{
			padding: 10px;
			height: 50px;
			border:1px solid #e5e5e5;
		}
		thead{
			background: #e5e5e5;
			font-size: 16px;
		}
	}
</style>
