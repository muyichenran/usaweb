  <template>
  	<!--添加属性管理-->
  	<div class="admin-adver">
				<div class="subdivision-table">
						<table>
								<tr>
			    					<td align="right"  width="120">序号</td>
			    					<td width="750">
			    						<el-input class="width300"  placeholder="请输入序号"></el-input>
			    					</td>
		    				</tr>
		    				<tr >  
			    					<td align="right" >分区名称</td>
			    					<td>
			    						<el-input class="width300" placeholder="请输入名称"></el-input>
			    					</td>
		    				</tr>
		    				<tr >
			    					<td align="right" valign="top">子分区</td>
			    					<td>
				    						<div class="son-subdivision">
							  						<span class="item">
							  							<label>新品发布</label>
							  							<a @click="delectSubdivision()" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
							  						</span>
				    								<p><el-button class="add-son" type="primary" plain>添加子分区</el-button></p>
				    						</div>
			    					</td>
		    				</tr>
		    				<tr >
			    					<td align="right" valign="top">颜色</td>
			    					<td>
				    						<div class="color-list">
							  						<span v-for="(item,index) in colorList" class="item" v-bind:style="{ background:item.colorValue }" :title="item.colorName">
							  							<a @click="delectColorObj(index)" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
							  						</span>
				    								<p><el-button @click="addColorShow=true" class="add-son" type="primary" plain>添加颜色</el-button></p>
				    						</div>
			    					</td>
		    				</tr>
		    				<tr >
			    					<td align="right" valign="top">尺码类型</td>
			    					<td>
				    						<div class="type-size">
							  						<el-radio v-model="sizeRadio" label="type1">普通款</el-radio>
  													<el-radio v-model="sizeRadio" label="type2">衬衣西装</el-radio>
  													<el-radio v-model="sizeRadio" label="type3">毛衣</el-radio>
  													<el-radio v-model="sizeRadio" label="type4">鞋子</el-radio>
				    						</div>
			    					</td>
		    				</tr>
		    				<tr >
			    					<td align="right" valign="top">尺码</td>
			    					<td>
				    						<div v-if="sizeRadio=='type1'||sizeRadio=='type4'" class="size-type1-info">
				    							<div>
				    								<span class="item" v-for="(item,index) in sizeTypeList">
							  							{{item}}
							  							<a @click="delectSizeType1(index)" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
							  						</span>
							  						<p><el-button @click="addSizeType1()" class="add-son" type="primary" plain>添加尺码</el-button></p>
				    							</div>
				    						</div>
				    						<div v-if="sizeRadio=='type3'" class="size-type1-info">
				    							<div>
				    								<span class="item" v-for="(item,index) in sizeTypeList">
							  							<p>{{item.Name}}</p>
							  							<p>{{item.Number}}</p>
							  							<a @click="delectSizeType1(index)" class="delect" href="javascript:;"><i class="iconfont">&#xe605;</i></a>
							  						</span>
							  						<p><el-button @click="addSize3Show=true,shoesSizeObj={}" class="add-son" type="primary" plain>添加尺码</el-button></p>
				    							</div>
				    						</div>
			    					</td>
		    				</tr>
						</table>
						<p class="align-center">
							 <el-button class="sub-allinfo" @click="checkArreyFunction()" type="primary">提交</el-button>
						</p>


						
						<el-checkbox-group v-model="checkList">
							<el-checkbox v-for="(item,index) in List" :label="item"></el-checkbox>
						</el-checkbox-group>
						<el-checkbox-group v-model="checkList2">
							<el-checkbox v-for="(item,index) in List2" :label="item"></el-checkbox>
						</el-checkbox-group>
						<div>
							<div class="clearfix fix"  v-for="(item,index) in AllArrey">
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
				<div v-if="addColorShow"> 
						<div class="box-shade"></div>
						<div class="add-color-box">
								<a @click="addColorShow=false" class="close" href="javascript:;">
		        			<i class="iconfont">&#xe605;</i>
		        		</a>
								<table>
									<tr>
										<td width="120" align="right">Color Name</td>
										<td width="220">
											<el-input v-model="colorObj.colorName"></el-input>
										</td>
									</tr>
									<tr>
										<td width="120" align="right">Color Value</td>
										<td width="220">
											<el-input v-model="colorObj.colorValue"></el-input>
										</td>
									</tr>
								</table>
								<p class="align-center">
									 <el-button @click="subColorFun" type="primary"  class="submit-btn">Submit</el-button>
								</p>
						</div>
				</div>
				
				<div v-if="addSize3Show"> 
						<div class="box-shade"></div>
						<div class="add-color-box">
								<a @click="addSize3Show=false" class="close" href="javascript:;">
		        			<i class="iconfont">&#xe605;</i>
		        		</a>
								<table>
									<tr>
										<td width="120" align="right">Size Name</td>
										<td width="220">
											<el-input v-model="shoesSizeObj.Name"></el-input>
										</td>
									</tr>
									<tr>
										<td width="120" align="right">Size Number</td>
										<td width="220">
											<el-input v-model="shoesSizeObj.Number"></el-input>
										</td>
									</tr>
								</table>
								<p class="align-center">
									 <el-button @click="subSize3Fun()" type="primary"  class="submit-btn">Submit</el-button>
								</p>
						</div>
				</div>
  	</div>
</template>

<script>
export default {
   data(){
      return{
      	colorObj:{},
      	colorList:[],
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
		AllArrey:[]
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
    	}
    },
    created(){
    	
    }
}
</script>

<style lang="scss">
	.add-son{
		padding: 8px 10px;
	}
	.width300{
		width: 300px;
	}
	.admin-adver{
		width: 100%;
		.subdivision-table{
			width: 100%;
			table{
				width: 100%;
				tr{
					td{
						padding:5px 10px;
					}
				}
			}
		}
	}
	.son-subdivision{
		.item{		
			padding: 7px 10px;
			font-size: 14px;
	    background: #f2f2f2;
	    border: 1px solid #e5e5e5;
	    border-radius: 3px;
	    margin-top: 5px;
	    margin-right: 10px;
	    margin-bottom: 10px;
	    cursor: pointer;
	    display:inline-block;
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
	
	.color-list{
		.item{
				padding: 7px 10px;
				font-size: 14px;
		    margin-top: 5px;
		    width: 30px;
		    height: 20px;
		    border: 1px solid #e5e5e5;
		    margin-right: 10px;
		    margin-bottom: 10px;
		    cursor: pointer;
		    display:inline-block;
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
	.size-type1-info{
		.item{		
			padding: 7px 10px;
			font-size: 14px;
	    border: 1px solid #e5e5e5;
	    border-radius: 3px;
	    margin-top: 5px;
	    margin-right: 10px;
	    margin-bottom: 10px;
	    cursor: pointer;
	    display:inline-block;
			position: relative;
			p{
				text-align: center;
				&:first-child{
					padding-bottom: 3px;
					border-bottom: 1px solid #e5e5e5;
				}
			}
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
	
	
	
	.add-color-box{
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
	
	.sub-allinfo{
		margin-top: 40px;
		padding:15px 50px;
	}
</style>
