  <template>
  	<!--添加商品管理-->
  	<div class="admin-center">
        <div class="goods-table">
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
                            <a class="select-fq">选择分区<i class="iconfont"></i></a>
                        </td>
                    </tr>
                    <tr >
                        <td align="right" valign="top">颜色</td>
                        <td>
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox v-for="(item,index) in colorList" :label="item"></el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                    <tr >
                        <td align="right" valign="top">尺码</td>                            
                        <td>   
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox v-for="(item,index) in List" :label="item"></el-checkbox>
                            </el-checkbox-group>               
                        </td>
                    </tr>
                    <tr >
                        <td align="right" valign="top">袖长</td>                            
                        <td>   
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox v-for="(item,index) in List2" :label="item"></el-checkbox>
                            </el-checkbox-group>               
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
			
  	</div>
</template>

<script>
export default {
   data(){
      return{
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

<style lang="scss" scoped>
	.width300{
		width: 300px;
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
