
<template>   
    <div>
        <section class="login-section">
            <div class="login-center">
                <p class="title">Login</p>
                <div class="login-from">
                    <p class="from-title">USENAME</p>
                    <input v-model="item.username" class="" />
                    <p class="from-title">PASSWORD</p>
                    <input class="" v-model="item.password"   type="password"/>
                    <p v-if="msg" class="error">{{msg}}</p>
                </div>
                <a class="login-sub" v-on:click="goLogin" href="javascript:;">Submit</a>
            </div>
        </section>
    </div>
</template>    
<script>
    export default{
        data:function(){
            return{
                item:{},
                msg:''
            }
        },
        methods:{
            goLogin:function(){
                var vm=this;
                var apiUrl='http://manager.luxtonusa.com/back/admin/login';
                if(vm.item.username==undefined||vm.item.password==undefined){
                    this.$message.error('User name and password must be entered！');
                    return false;
                }
                this.$http.post(apiUrl, vm.item).then(response => {                
                    if(response.body.msg=="OK" && response.body.status=="200"){
                        this.$cookie.set('adminLogin',true)
                        this.$store.state.adminLogin=true;
                        this.$message.success('You are login……');
                        var vm=this;
                        this.sign={};
                        setTimeout(() => {
                            vm.$router.push({path:'/'})
                        }, 1000);

                    }else{
                        this.$message.error(response.body.msg);
                    }
                }, response => {
                    // error callback
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-section {
    width: 100%;
    min-width: 1280px;
    padding: 50px 0 50px;
    .login-center {
	    background: #fff;
	    margin: 0 auto;
	    width: 450px;
	    padding: 50px;
	    border-radius: 10px;
	    box-shadow: 0 2px 3px rgba(0,0,0,.4);
	    .title {
		    font-size: 28px;
		    text-align: center
		}
		.login-from {
		    margin: 40px 0 20px;
		    .from-title {
			    font-size: 22px;
			    margin-bottom: 15px
			}
			input {
			    width: 100%;
			    height: 50px;
			    padding: 5px;
			    border-radius: 10px;
			    border: 1px solid #d6d5d6;
			    margin-bottom: 25px
			}
			.error {
			    color: #fe4343
			}

		}
		.login-sub {
		    display: block;
		    width: 200px;
		    height: 50px;
		    line-height: 50px;
		    text-align: center;
		    font-size: 22px;
		    margin: 0 auto;
		    border-radius: 10px;
		    border: 1px solid #d6d5d6;
		    &:hover {
			    background: #dfdfdf
			}
		}
	}
}

</style>