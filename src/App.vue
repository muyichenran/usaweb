<template>
  <div id="app">
   	<header class="admin-top">
        <div class="center1200 clearfix">
            <router-link style="display: inline-block;"  :to="{path:'/'}">
                <img class="logo" src="././assets/logo.png" />
                <span class="company-name">魔卡情感-后台</span>
            </router-link>
            
            <div v-if="adminLogin"  class="admin-login">
                <a href="javascript:;"><i class="iconfont">&#xe601;</i>用户</a>
                <a href="javascript:;" v-on:click="exit">退出</a>
            </div>
        </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
   data(){
      return{
      }
	},
	computed:{
        adminLogin(){
            return this.$store.state.adminLogin;
        }
	},
	 watch:{
        adminLogin(){
            if(this.adminLogin){
            }
        }
    },
    components: {
    	
    },
    methods:{
    	 exit:function(){
            var url='http://luxma.helpyoulove.com/back/admin/logout';
	        var vm=this;
	        this.$http.post(url).then(response => {   
	            if(response.data.status==432){
                    this.$message.error("登录过期，请重新登录！");
					this.$cookie.delete('adminLogin');
					this.$store.state.adminLogin='';
                    this.$router.replace("/Login")
                }else if(response.data.status==200){
					this.$message.success('成功退出');
					var vm=this;
					setTimeout(() => {
						vm.$router.push({path:'/Login'})
					}, 1000);
					
				}else{
					this.$message.error(response.data.msg);
				}
	        }, response => {
	        });
        }
    },
    created(){
    	if(this.$store.state.adminLogin==undefined||this.$store.state.adminLogin==null||this.$store.state.adminLogin==""){
            var adminLogin='';
            adminLogin=this.$cookie.get('adminLogin');
            this.$store.commit('LOG_IN',adminLogin);
            
        }else{
            
        }
    }
}
</script>

<style lang="scss">
@import "./assets/index.scss";
.admin-top {
    height: 60px;
    min-width:1200px;
    background: #292929;
		.center1200{
		    height: 100%;
		    position: relative;
		    line-height:60px;
		}
		.logo {
		    float: left;
		    width: 30px;
		    height: 30px;
		    vertical-align: middle;
		    margin-top: 15px;
		    padding-right: 10px;
		}
		.company-name {
		    display: inline-block;
		    float: left;
		    font-size: 26px;
		    color: #fff;
		}
		.admin-login {
		    float: right;
		    font-size: 22px;
	      a {
				    color: #fff;
			    i {
					    font-size: 30px;
					    padding-right: 5px
					}
				}
				a:first-child {
				    margin-right: 30px
				}
				a:last-child {
				    color: #f76260
				}	
		}
}
</style>
