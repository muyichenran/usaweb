<template>
   <div class="admin-left f-l">
   		<ul>
   			<li>
   				<router-link to="/signCode">登陆验证码<i class="iconfont">&#xe602;</i></router-link>
   			</li>
   		</ul>
   		<ul class="meau-list">
            <li class="list-title">供应商</li>
            <li>
                 <router-link to="/suppliers">供应商录入<i class="iconfont">&#xe602;</i></router-link>
            </li>
        </ul> 
        <ul class="meau-list">
            <li class="list-title">商品</li>
            <li>
                 <router-link to="/subdivision">分区列表<i class="iconfont">&#xe602;</i></router-link>
            </li>
            <li>
                 <router-link to="/addAttribute">商品属性<i class="iconfont">&#xe602;</i></router-link>
            </li>
            <li>
                 <router-link to="/addGoods">商品录入<i class="iconfont">&#xe602;</i></router-link>
            </li>
        </ul> 
        <ul class="meau-list">
            <li class="list-title">首页(Index)</li>
            <li>
            	<router-link to="/adverAdmin">广告<i class="iconfont">&#xe602;</i></router-link>
                <!--<router-link to="/Home/hd/hdIndex">Banner Adver<i class="iconfont">&#xe602;</i></router-link>-->
            </li>
            <li>
        		<router-link to="/Recommend">商品推荐<i class="iconfont">&#xe602;</i></router-link>
                <!--<router-link to="/Home/hd/hdCode">Recommend<i class="iconfont">&#xe602;</i></router-link>-->
            </li>
        </ul>  
		<ul class="meau-list">
            <li class="list-title">管理员管理</li>
            <li>
            	<router-link to="/admin">管理员列表<i class="iconfont">&#xe602;</i></router-link>
                <!--<router-link to="/Home/hd/hdIndex">Banner Adver<i class="iconfont">&#xe602;</i></router-link>-->
            </li>
        </ul>  
    </div>			
</template>

<script>
    export default{

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.admin-left {
	    width: 200px;
	    background: #fff;
	    box-shadow: 0 2px 3px rgba(0,0,0,.4);
	    padding: 20px 20px 50px;
	    border-radius: 5px;
	    .meau-list:first-child{
	    	.list-title {
	    		margin-top: 0;
	    	}
	    }
	    .list-title {
		    margin-top: 15px;
		    font-size: 18px;
		    padding-left: 10px;
		    position: relative;
		    font-weight: 700;
		    &:before {
    			content: "";
			    position: absolute;
			    display: inline-block;
			    top: 12px;
			    left: 0;
			    bottom: 10px;
			    border: 2px solid #95989a;
			    color: #95989a
			}
		}
		li {
		    display: block;
		    width: 100%;
		    height: 40px;
		    line-height: 40px;
		    border-bottom: 1px solid #e5e5e5;
		    font-size: 16px;
		    i {
			    position: absolute;
			    right: 8px
			}
		    a {
			    padding: 0 8px;
			    display: block;
			    position: relative;
			    &:hover{
			    	color: #52a8f9;
			    	i {
					    color: #52a8f9
					}
			    }
			}
			.router-link-active{
				color: #52a8f9;
		    	i {
				    color: #52a8f9
				}
			}
		}
	}

</style>
