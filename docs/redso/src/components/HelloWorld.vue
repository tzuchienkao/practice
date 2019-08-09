<template>
<section id="landing">
  <article>
    <template v-if="!userLoc">
      <h2>尋找附近餐廳</h2>
      <p>幫你找出步行一百公尺的附近餐廳，<br />但需要您的允許存取位置的同意。</p>
      <a class="btn solid" href="javascript:void(0)" @click="getLocation">我知道了！</a>
    </template>
    <template v-else>
      <p>{{ waitingTxt }}</p>
    </template>
  </article>
</section>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      nowPlace: [],
      userLoc: false,
      waitingTxt: ''
    }
  },
  methods: {
    getLocation() { //取得 經緯度
      var self = this;
      self.userLoc = true;
      self.waitingTxt = '等待中...'
      if ("geolocation" in navigator) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(res) {
              if (res) {
                self.nowPlace = [res.coords.latitude, res.coords.longitude]
                self.$emit('getAns', self.nowPlace)
                self.userLoc = false;
              } else {
                self.userLoc = true;
              }
            }, function(){
                self.waitingTxt = '您拒絕存取位置T^T'
            });
        } else {
          self.waitingTxt = '您的瀏覽器不支援 顯示地理位置 API ，請使用其它瀏覽器開啟 這個網址'
        }
      } else {
          self.waitingTxt = '您的瀏覽器不支援 顯示地理位置 API ，請使用其它瀏覽器開啟 這個網址'
      }
    }
  }
}
</script>
