# 附近餐廳
利用定位尋找附近一百公尺內的餐廳 (https://tzuchienkao.github.io/mapfindfood/)

## 版本使用
- [x] Vue-cli 3
- [x] NPM 6.9.0
- [x] Node 11.1.0
- [x] Google Map API v3
- [x] HTML 5
- [x] CSS 3
- [x] Javascript

## 緣起
運用 Google Map API 並搭配 HTML 5 - Navigator API 實作練習『尋找附近餐廳』。

依循友善的設計模式，會先詢問使用者是否有意願分享目前位置，接著進入 Google Map 畫面。

進入地圖後，目前位置會吐出附近一百公尺內有的餐廳，並能依照“評價、距離、步行時間”排序；而使用者亦能拖動地圖或是移動目前所在位置的圖標，列表再顯示出該位置一百公尺內附近的餐廳。

## 目前遇到的問題
- [ ] 餐廳列表與地圖之間的互動關係
- [ ] Google Map API OVER_QUERY_LIMIT 造成無資料而畫面空白
- [ ] 首次使用 Google Map API，還有很多未知世界需要探索

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
