<template>
   <div class="admin-left f-l">
   		<ul>
			
			<li>
   				<router-link to="/userList">User List<i class="iconfont">&#xe602;</i></router-link>
   			</li>
			<li>
   				<router-link to="/orderIndex">Order List<i class="iconfont">&#xe602;</i></router-link>
   			</li>
   			<li>
   				<router-link to="/signCode">Login Access Code<i class="iconfont">&#xe602;</i></router-link>
   			</li>
   		</ul>
   		<ul class="meau-list">
            <li class="list-title">Vendor</li>
            <li>
                 <router-link to="/suppliers">Vendor Entry<i class="iconfont">&#xe602;</i></router-link>
            </li>
        </ul> 
        <ul class="meau-list">
            <li class="list-title">Merchandise</li>
            <li>
                 <router-link to="/subdivision">Category List<i class="iconfont">&#xe602;</i></router-link>
            </li>
            <li>
                 <router-link to="/addAttribute">Merchandise Category	<i class="iconfont">&#xe602;</i></router-link>
            </li>
            <li>
                 <router-link to="/addGoods">Merchandise Entry	<i class="iconfont">&#xe602;</i></router-link>
            </li>
			<li>
                 <router-link to="/GoodsList">Product list<i class="iconfont">&#xe602;</i></router-link>
            </li>
        </ul> 
        <ul class="meau-list">
            <li class="list-title">Index</li>
            <!-- <li>
            	<router-link to="/adverAdmin">广告<i class="iconfont">&#xe602;</i></router-link>
                <router-link to="/Home/hd/hdIndex">Banner Adver<i class="iconfont">&#xe602;</i></router-link>
            </li> -->
            <li>
        		<router-link to="/Recommend">Product recommendation<i class="iconfont">&#xe602;</i></router-link>
                <!--<router-link to="/Home/hd/hdCode">Recommend<i class="iconfont">&#xe602;</i></router-link>-->
            </li>
        </ul>  
		<ul class="meau-list">
            <li class="list-title">Administrator </li>
            <li>
            	<router-link to="/admin">Administrator List	<i class="iconfont">&#xe602;</i></router-link>
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
	    width: 290px;
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
