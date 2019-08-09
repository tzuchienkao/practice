<template>
<section id="main">
    <div id="shopFilter">
        <template v-if="totalStore">
            <div class="sortTab">
                <p>附近有<span> {{ totalStore }} </span>間店</p>
                <ul class="sortNav">
                    <li class="active" ref="rate" @click="sortBy('rate')">評價</li>
                    <li ref="distance" @click="sortBy('distance')">距離</li>
                    <li ref="time" @click="sortBy('time')">步行時間</li>
                </ul>
            </div>
            <ul id="shopList" v-if="storeList && storeList.length > 0">
                <li :ref="item.name" v-for="(item) in storeList" :key="item.id">
                    <dl class="shopCard">
                        <dt :class="['shopImg', (item.photos && item.photos.length >= 0) ? '' : 'emptyBox']">
                            <span v-if="sortType === 'rate'">{{ item.rating }}</span>
                            <span v-if="sortType === 'distance'">{{ item.distance }} 公尺</span>
                            <span v-if="sortType === 'time'">約 {{ item.time }} 分</span>
                            <template v-if="item.photos && item.photos.length >= 0">
                                <img :src="item.photos[0].getUrl()" :alt="item.name" />
                            </template>
                        </dt>
                        <dd class="shopInfo">
                            <h6>{{ item.name }}</h6>
                            <p>{{ item.vicinity }}</p>
                        </dd>
                    </dl>
                </li>
            </ul>
        </template>
        <template v-else>
            <p class="emptyResult">附近一百公尺內沒有餐廳喔！</p>
        </template>
    </div>
    <div id="map"></div>
</section>
</template>

<script>
var map, service, directionsService, infowindow;
export default {
  name: 'HelloWorld',
  props: ['mainPos'],
  data () {
      return {
          storeList: [],
          sortList: [],
          sortType: 'rate',
          count: false
      }
  },
  computed: {
      totalStore () {
           let total;
           if (this.storeList && this.storeList.length > 0) {
               total = this.storeList.length
           }
        return total
      }
  },
  watch: {
      sortType(newVal, oldVal) {
          if (newVal !== oldVal){
            this.$refs[newVal].classList += 'active';
            this.$refs[oldVal].classList = '';
        }
      }
  },
  methods: {
      initMap(nowPlace) {
        var self = this;
        var _latlng = new google.maps.LatLng(nowPlace[0], nowPlace[1]);
        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(
            document.getElementById('map'), {
                center: _latlng,
                zoom: 17,
                disableDefaultUI: true
            });
        self.whereAmI(_latlng);
        var request = {
            location: map.getCenter(),
            radius: 100,
            type : ['restaurant']
        };
        service = new google.maps.places.PlacesService(map);
        directionsService = new google.maps.DirectionsService();
        service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    self.storeList.unshift(results[i]);
                    self.storeMarker(results[i])
                    self.fromAToB({ id: i, a: _latlng, b: results[i].geometry.location })
                }
                self.sortBy(self.sortType)
            }
        });
    },
    storeMarker(place) {
        console.log(process.env.BASE_URL)
        var stores = {
            url: process.env.BASE_URL + 'images/store.svg',
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            type: 'store',
            icon: stores,
            title: place.name
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    },
    whereAmI (val) {
        let self = this;
        var imHere = {
            url: process.env.BASE_URL + 'images/me.svg',
            size: new google.maps.Size(32, 32),
            scaledSize: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0)
        };
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };
        var marker = new google.maps.Marker({
            map: map,
            position: val,
            type: 'pos',
            icon: imHere,
            shape: shape,
            draggable: true
        });
        map.setCenter(val);
        map.addListener('dragend', function() {
            self.storeList = [];
            marker.setPosition(map.getCenter());
            self.initMap([marker.getPosition().lat(), marker.getPosition().lng()])
        });
        marker.addListener('dragend', function() {
            self.storeList = [];
            map.setCenter(marker.getPosition());
            self.initMap([marker.getPosition().lat(), marker.getPosition().lng()])
        });
    },
    fromAToB (val) {
        var self = this;
        var _distance, _time;
        var _distanceSum = 0;
        var _timeSum = 0;
        var request = {
            origin: val.a,
            destination: val.b,
            travelMode: 'WALKING'
        };
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                var _steps = result.routes[0].legs[0].steps;
                for (var i = 0; i < _steps.length; i++) {
                    _distance = _steps[i].distance ? _steps[i].distance.value : 0;
                    _time = _steps[i].duration ? _steps[i].duration.value : 0;
                    _distanceSum += _distance;
                    _timeSum += _time;
                }
                self.transTimer (_timeSum);
                self.storeList[val.id]['distance'] = _distanceSum;
                self.storeList[val.id]['time'] = self.transTimer (_timeSum);
                self.$forceUpdate()
            } else {
                console.log(status);
            }
        });
    },
    sortBy(sort) {
        let self = this;
        let x, y, r_val, type
        switch (sort) {
            case 'rate':
                type = 'rating'
                break
            case 'distance':
                type = 'distance'
                break
            case 'time': 
                type = 'duration'
                break
        }
        self.count = !self.count;
        self.sortType = sort;
        self.storeList.sort(function(a, b) {
            x = a[type];
            y = b[type];
            r_val = self.count ? y - x : x - y ;
            return r_val;
        });
    },
    transTimer (time) {
        let min;
        min = Math.ceil(time / 60);
        if (min <= 1) {
            min = 1
        }
        return min;
    }
  },
  mounted () {
      this.initMap(this.mainPos);
      this.sortBy(this.sortType);
  }
}
</script>
