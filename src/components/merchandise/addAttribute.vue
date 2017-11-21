  <template>
  	<!--添加属性管理-->
  	<div class="admin-center">
		<div class="attribute-block">
			<div class="attribute-block-top">
				<el-button type="primary" plain>选择分区</el-button>
				<span class="attribute-name">衬衣分区</span>
			</div>
		</div>	


		<div class="select-division">
			<div class="box-shade"></div>
			<div class="usa-up-box">
				<div class="division-list"></div>
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
			width: 400px;
			padding: 20px;
			height: 400px;
			overflow: hidden;
		}
	}
</style>

