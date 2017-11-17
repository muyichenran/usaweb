<template>
  <div id="app">
   	<header class="admin-top">
        <div class="center1200 clearfix">
            <router-link style="display: inline-block;"  :to="{path:'/'}">
                <img class="logo" src="././assets/logo.png" />
                <span class="company-name">魔卡情感-后台</span>
            </router-link>
            
            <div class="admin-login">
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
        requestItem:this.$store.state.common,
      }
    },
    components: {
    	
    },
    methods:{
    	 exit:function(){
            localStorage.removeItem("username");
            this.username='';
            
            this.$router.replace({ path: '/login' });
            window.close() 
        }
    },
    created(){
    	
    }
}
</script>

<style lang="scss">
@import "./assets/index.scss";
.admin-top {
    height: 60px;
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
