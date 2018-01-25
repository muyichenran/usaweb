  <template>
  <div class="center1200 admin-content clearfix">
  	<v-left></v-left>
    <div class="admin-right f-r">
    	<router-view/>
    </div>	
  </div>
</template>

<script>
 import left from '../Common/left.vue';
export default {
   data(){
      return{
        requestItem:this.$store.state.common,
      }
    },
    components: {
    	'v-left':left,
    },
    methods:{
    },
    created(){
    	
    }
}
</script>

<style lang="scss">
.admin-content{
	margin-top: 10px;
}
.admin-right {
    width: 1080px;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0,0,0,.4);
    padding: 30px 50px;
    border-radius: 10px;
}
</style>
