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
                            <el-input class="width300"  placeholder="请输入商品名称"></el-input>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">风格版式</td>
                        <td width="750">
							<el-select v-model="value" class="width300" placeholder="请选择">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">品牌</td>
                        <td width="750">
							<el-select v-model="value" class="width300" placeholder="请选择">
								<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
                        </td>
                    </tr>
					
					<tr>
                        <td align="right" valign="top" width="120">商品图片</td>
                        <td width="750">
                           <div class="pic-list">
							    <el-upload
									class="upload-demo"
									action="https://jsonplaceholder.typicode.com/posts/"
									:on-preview="handlePreview"
									:on-remove="handleRemove"
									:file-list="fileList"
									list-type="picture">
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
								</el-upload>
						   </div>
                        </td>
                    </tr>
					
					<tr>
                        <td align="right" valign="top">商品规格</td>
                        <td>
                            <div class="product-speci">
								<div class="item-block">
									<p class="title">颜色：</p>	
									<div class="attribute-list">
										<el-checkbox-group v-model="checkList">
											<el-checkbox v-for="(item,index) in colorList" :label="item"></el-checkbox>
										</el-checkbox-group>
									</div>
								</div>
								<div class="item-block">
									<p class="title">标尺：</p>	
									<div class="attribute-list">
										<el-checkbox-group v-model="checkList2">
											<el-checkbox v-for="(item,index) in List" :label="item"></el-checkbox>
										</el-checkbox-group>    
									</div>
								</div>
								<div class="item-block">
									<p class="title">商品销售规格：</p>
									<p class="prompting">注意：颜色、标尺，两个属性必须勾选，如果不勾选将会导致无法保存库存；库存为0的商品将在前段不予展示</p>	
									<div class="batch-fill">
										批量填充：<el-input class="width150"  placeholder="请输入商品价格"></el-input>
										<el-input class="width150"  placeholder="请输入商品库存"></el-input>
										<el-button plain>确认</el-button>
									</div>
									<div class="attribute-list">
										<el-checkbox-group v-model="checkList2">
											<el-checkbox v-for="(item,index) in List" :label="item"></el-checkbox>
										</el-checkbox-group>    
									</div>
								</div>
							</div>
                        </td>
                    </tr>
					<tr>
                        <td align="right"  width="120">商品描述</td>
                        <td width="750">
							<el-input
							class="width300"
							type="textarea"
							autosize
							placeholder="请输入描述"
							>
							</el-input>
                        </td>
                    </tr>
                </table>
                <p class="align-center">
                        <el-button class="sub-allinfo" @click="checkArreyFunction()" type="primary">提交</el-button>
                </p>
				<div class="clearfix"  v-for="(item,index) in AllArrey">
					<div style="width:60px;float:left">
						{{item.name}}
					</div>
					<div class="clearfix" v-for="(item2,index2) in item.sizeArray" style="width:400px;float:left;">
						<div style="height:20px;width:100px;float:left">
							{{item2.sizeName}}
						</div>
						<div style="height:20px;width:100px;float:left">
							{{item2.inventory}}
						</div>
						<div style="height:20px;width:100px;float:left">
							{{item2.price}}
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
		fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      	colorObj:{},
      	colorList:['red','blue'],
      	sizeTypeList:[],
      	shoesSizeObj:{},
//    	sizeType1ListInput:[],
      	sizeRadio:'type1',
      	addSubShow:false,
      	addColorShow:false,
        addSize3Show:false,
		checkList: [],
		List:['S','M','L'],
		checkList2: [],
		List2:['32','33','34'],
		AllArrey:[],
		options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    components: {
    },
    methods:{
		checkArreyFunction:function(){
			var Array1=[];
			var i,j,m;
			for(i in this.checkList){
				var newArray={};
				newArray.name=this.checkList[i];
				newArray.sizeArray=[];
				for(j in this.checkList2){
					var pro={};
					pro.sizeName=this.checkList2[j];
					console.log(this.checkList2[j])
					pro.inventory=100;
					pro.price=100;
					newArray.sizeArray.push(pro);
				}
				Array1.push(newArray);
				
			}
			this.AllArrey=	Array1
			console.log(Array1)
			
		},

//  	conslogFun:function(){
//  		console.log(sizeType1ListInput)
//  	},
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
		handlePreview:function(){},
		handleRemove:function(){},
    },
    created(){
    	
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
</style>
