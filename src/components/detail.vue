<template>

     <div>
         <!-- <input type="button" value='detail的累加' @click="detailAdd"> -->
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
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                              <ProductZoomer
                                :base-images="images"
                                :base-zoomer-options="containerRoundOptions"
                                />
                            </div>
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
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                             <Affix>
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
                            </Affix>
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
                                            <span>{{item.add_time | beauty}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
           <BackTop :height="100" :bottom="100">
        <div class="top">返回顶端</div>
    </BackTop>
    </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
      goodID: "",
      goodsinfo: {},
      // 热卖列表
      hotgoodslist: [],
      // 图片列表
      imglist: [],
      buyNum: 1,
      selectedStatus: 0,
      pageIndex: 1, //默认是第一页
      pageSize: 6,
      comments: [],
      totalcount: 0,
      Mes: "",
      images: {
        normal_size: [
          {
            id: 1,
            url:
              "https://www.google.com/search?q=%E7%8A%AC%E5%A4%9C%E5%8F%89&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjfqrC_joDeAhWHM94KHbX2CFMQ_AUIDigB&biw=1536&bih=516&dpr=1.25#imgrc=-ZSNpzWshivGtM:"
          },
          {
            id: 2,
            url:
              "https://www.google.com/search?q=%E7%8A%AC%E5%A4%9C%E5%8F%89&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjfqrC_joDeAhWHM94KHbX2CFMQ_AUIDigB&biw=1536&bih=516&dpr=1.25#imgrc=yYMW3lt_5jxjHM:"
          }
        ]
      },
      containerRoundOptions: {
        zoomFactor: 4,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },

  methods: {
    detailAdd() {
      this.$store.commit("increment");
    },
    addCart(){
        this.$store.commit('addCart',{
            id:this.goodID,
            buyCount:this.buyNum
        })
    },
    handleNum() {
      console.log("hahah");
    },
    pageChange(pageNum) {
      // console.log('页码改变');
      // console.log(pageNum);
      // 修改页码
      this.pageIndex = pageNum;
      // 重新发请求
      this.getComments();
    },
    subMes() {
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodID, {
          commenttxt: this.Mes
        })
        .then(response => {
          this.pageIndex = 1;
          this.getComments();
          this.Mes = "";
        });
    },
    pageSizel(value) {
      // console.log(value)
      this.pageSize = value;
      this.pageIndex = 1;
      this.getComments();
    },
    getGoodId() {
      this.images.normal_size = [];
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
          let tem_normal_size = [];
          this.imglist.forEach(v => {
            tem_normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
          this.images.normal_size = tem_normal_size;
        });
    },

    getComments() {
      //   this.$axios.get(`site/comment/getbypage/goods/${this.goodID}?pageIndex${this.pageIndex}&pageSize${this.pageSize}`)

      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodID}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response);
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
        });
    }
  },
  created() {
    this.goodID = this.$route.params.goodID;

    this.getGoodId();
    this.buyNum = 1;
    this.getComments();
  },
  watch: {
    $route(to, from) {
      this.goodID = to.params.goodID;
      // console.log(to);
      this.getGoodId();
      this.getComments();
    }
  }
};
</script>
<style>
.ql-align-center img {
  display: block;
}
.pic-box {
  width: 395px;
  /* height: 320px; */
}
 .top{
        padding: 10px;
        background: rgba(0, 153, 229, .7);
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>

