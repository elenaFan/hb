<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                           <el-input-number v-model="buyNum" @change="handleNum" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                         <a @click="selectedStatus=1" href="javascript:;" :class="{selected:selectedStatus==1}">商品介绍</a>
                                        <!-- <a @click="selectedStatus=0" href="javascript:;" class="selected">商品介绍</a> -->
                                    </li>
                                    <li>
                                        <a @click="selectedStatus=0" :class="{selected:selectedStatus==0}" href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" v-show="selectedStatus" v-html="goodsinfo.content">
                              
                            </div>
                            <div class="tab-content"  v-show="!selectedStatus">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="Mes" ></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="subMes">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautifyTime('年','月','日')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                  
                                    </ul> -->
                                     <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautifyTime('年','月','日')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                               <Page :current='pageIndex' @on-page-size-change="pageSizel" @on-change="pageChange" :total="totalcount" placement="top" :page-size=6 :page-size-opts='[6,16,26,36]' show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                            <span>{{item.add_time | beautifyTime('年','月','日')}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
        goodID:'',
      goodsinfo: {},
      // 热卖列表
      hotgoodslist: [],
      // 图片列表
      imglist: [],
      buyNum:1,
      selectedStatus:0,
      pageIndex:1,//默认是第一页
      pageSize:6,
      comments:[],
      totalcount:0,
      Mes:''

    };
  },

  methods:{
      handleNum(){
          console.log("hahah")
      },
          pageChange(pageNum){
        // console.log('页码改变');
        // console.log(pageNum);
        // 修改页码
        this.pageIndex = pageNum;
        // 重新发请求
        this.getComments();
    },
    subMes(){
        this.$axios.post('site/validate/comment/post/goods/'+this.goodID,{
          commenttxt: this.Mes
        }).then(response=>{
         this.pageIndex=1;
            this.getComments();
            this.Mes='';
           
        })
        

    },
    pageSizel(value){
// console.log(value)
this.pageSize=value;
this.pageIndex=1;
this.getComments();

    },
      getGoodId(){
         
              this.$axios
      .get("/site/goods/getgoodsinfo/" + this.goodID)
      .then(response => {
        // console.log(response);
        // 商品信息
        this.goodsinfo = response.data.message.goodsinfo;
        // 热卖列表
        this.hotgoodslist = response.data.message.hotgoodslist;
        // 图片列表
        this.imglist = response.data.message.imglist;
      });
      },

      getComments(){
        //   this.$axios.get(`site/comment/getbypage/goods/${this.goodID}?pageIndex${this.pageIndex}&pageSize${this.pageSize}`)
          
          this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodID}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        ).then(response => {
            //   console.log(response);
            this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
          })
      }
  },
    created() {
    this.goodID = this.$route.params.goodID;

this.getGoodId();
 this.buyNum=1;
this.getComments();
  },
   watch: {
    '$route' (to, from) {
      this.goodID=to.params.goodID;
    // console.log(to);
    this.getGoodId();
    this.getComments();
    }
  }
};
</script>
<style>
.ql-align-center img{
    display: block;
}
</style>

