  <template>
  	<!--添加分区属性管理-->
  	<div class="admin-center">
			<div class="attribute-block">
				<div class="attribute-block-top">
					<el-button  @click="selectShow=true" type="primary" plain>选择分区</el-button>
					<span class="attribute-name">衬衣分区</span>
				</div>
				<div class="attribute-block-center">
					<p class="title">
						请添加你需要的属性：
					</p>
					<el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in attributeList" :label="item">{{item.name}}</el-checkbox>
        	</el-checkbox-group>
        	
        	<el-button  @click="alert()" class="sub" type="primary" >提交</el-button>
				</div>
			</div>	


			<div v-if="selectShow" class="select-division">
				<div @click="selectShow=false"  class="box-shade"></div>
				<div class="usa-up-box">
					<div class="division-list">
						<div class="first-division">
							<p class="title">
								衬衣
							</p>
							<div class="second-division">
								<p class="second-title">
									长袖
								</p>
								<p class="second-title">
									短袖
								</p>
							</div>
						</div><div class="first-division">
							<p class="title">
								衬衣
							</p>
							<div class="second-division">
								<p class="second-title">
									长袖
								</p>
								<p class="second-title">
									短袖
								</p>
							</div>
						</div>
						<div class="first-division">
							<p class="title">
								衬衣
							</p>
							<div class="second-division">
								<p class="second-title">
									长袖
								</p>
								<p class="second-title">
									短袖
								</p>
							</div>
						</div>
						<div class="first-division">
							<p class="title">
								衬衣
							</p>
							<div class="second-division">
								<p class="second-title">
									长袖
								</p>
								<p class="second-title">
									短袖
								</p>
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
		    selectShow:false,
		    attributeList:[
		    	{
		    		id:1,
		    		name:'color'
		    	},
		    	{
		    		id:2,
		    		name:'size'
		    	}
		    ],
		    checkList:[]
      }
    },
    components: {
    },
    methods:{
			alert:function(){
				console.log(this.checkList)
			}
    },
    created(){
    	
    }
}
</script>

<style lang="scss" scoped>
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
		&>.title{
			font-size: 20px;
			margin-bottom: 20px;
		}
		.el-checkbox-group{
			label{
				display: block;
				margin:0 auto 10px !important ;
			}
		}	
	}
	.sub{
		margin-top: 20px;
	}
</style>

