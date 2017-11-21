  <template>
  	<!--添加属性管理-->
  	<div class="admin-center">
		<div class="attribute-block">
			<div class="attribute-block-top">
				<el-button  @click="selectShow=true" type="primary" plain>选择分区</el-button>
				<span class="attribute-name">衬衣分区</span>
			</div>
			<div class="attribute-block-center">
				<div class="add-attribute">
						<div class="add-newattri-top clearfix">
					 			<el-button class="f-l" type="primary" round>添加属性类别</el-button>
					 	</div>
					 	<div class="add-newattri">
					 		<div class="first-input clearfix">
					 			<div class="input f-l"><el-input  placeholder="请输入内容"></el-input></div>
					 			<a class="add-button f-r">
					 				<i class="iconfont">&#xe600;</i>
					 			</a>
					 		</div>
					 		<div class="second-input clearfix">
					 			<div class="input f-l"><el-input  placeholder="请输入内容"></el-input></div>
					 			<a class="add-button f-r">
					 				<i class="iconfont">&#xe600;</i>
					 			</a>
					 		</div>
					 	</div>
				</div>
			</div>
		</div>	


		<div v-if="selectShow" class="select-division">
			<div class="box-shade"></div>
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
		    addSize3Show:false,
		    selectShow:false
      }
    },
    components: {
    },
    methods:{
		
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
		.add-attribute{
			width: 400px;
			.add-button{
					display: inline-block;	
					height: 36px;
					line-height: 36px;				
					i{
						font-size:30px;
						color: #409EFF;
					}
			}
			.add-newattri-top{
				margin-bottom: 15px;
			}
			.add-newattri{
				.first-input{
					.input{
						width: 360px;
					}
				}
			}
		}
	}
</style>

