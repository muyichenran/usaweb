
<template>   
    <div class="sign-code">
    	<el-button @click="getCode()" plain>生成验证码</el-button>
		<span>{{code}}</span>	
    </div>
</template>    
<script>
    export default{
        data:function(){
            return{
            	code:''
            }
        },
        methods:{
            getCode:function(){
            	var url='http://luxma.helpyoulove.com/back/admin/create/registerCode';
	            var vm=this;
	            this.$http.post(url).then(response => { 
					if(response.data.status==432){
						this.$message.error("登录过期，请重新登录！");
						this.$cookie.delete('adminLogin');
						this.$store.state.adminLogin='';
						this.$router.replace("/Login")
					}else if(response.data.status==200){   
						this.code=response.data.data;
					}else{
						this.$message.error(esponse.data.msg);
					}  
	            }, response => {
	            });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.sign-code{
		padding: 30px 0;
		text-align: center;
		min-height: 400px;
		span{
			display: inline-block;
			width: 160px;
			padding: 0 10px;
			height: 32px;
			line-height: 32px;
			border: 1px solid #c4c4c4;
			vertical-align: middle;
			border-radius: 3px;
		}
	}
</style>