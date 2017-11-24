  <template>
  	<!--添加分区属性管理-->
  	<div class="admin-center">
		<div class="attribute-block">
			<div class="attribute-block-top">
				<span style="font-size:18px;">分区：</span><el-select v-model="value" placeholder="请选择">
					<el-option
					v-for="item in options"
					:key="item.value1"
					:label="item.label1"
					:value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="attribute-block-center">
				<div class="add-attribute">
						<div class="add-newattri-top clearfix">
					 		<p class="add-fg">风格版式</p>
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
								<a class="delect-button f-r">
					 				<i class="iconfont">&#xe606;</i>
					 			</a> 								
					 		</div>
					 	</div>
				</div>
				<div class="add-attribute">
						<div class="add-newattri-top clearfix">
					 		<el-button class="f-l" type="primary" round>添加属性类别</el-button>
					 	</div>
					 	<div class="add-newattri">
					 		<div class="first-input clearfix">
					 			<div class="input f-l"><el-input  placeholder="请输入内容"></el-input></div>
								<a class="delect-button f-r">
					 				<i class="iconfont">&#xe606;</i>
					 			</a> 
					 			<a class="add-button f-r">
					 				<i class="iconfont">&#xe600;</i>
					 			</a>
					 		</div>
					 		<div class="second-input clearfix">
					 			<div class="input f-l"><el-input  placeholder="请输入内容"></el-input></div>
								<a class="delect-button f-r">
					 				<i class="iconfont">&#xe606;</i>
					 			</a> 								
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
		 	options: [{
				id:1,
				value1: '选项1',
				label1: '衬衣'
				}, {
				id:2,
				value1: '选项2',
				label1: '鞋子'
				}, {
					id:3,
				value1: '选项3',
				label1: '西装'
				}, {
					id:4,
				value1: '选项4',
				label1: '毛衣'
				}, {
					id:5,
				value1: '选项5',
				label1: '北京烤鸭'
			}],
			value: '',
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
						width: 280px;
					}
				}

			}
		}
	}
</style>

