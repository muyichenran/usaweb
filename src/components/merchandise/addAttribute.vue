  <template>
  	<!--添加属性管理-->
  	<div class="admin-center">
		<div class="attribute-block">
			
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

<style lang="scss">
	
</style>
