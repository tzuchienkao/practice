# 任務二

### 前言

為了取得證書，必須完成兩項任務作業。

這邊將會針對任務二說明作業時整體的思路及作法。

任務二在作業以前必須遵守幾項要點：

> ###### 作業等級表
> 
> Lv1：做所有 RWD 頁面，**畫面不可顯示 x 軸**
> 
> Lv2：做所有 RWD 頁面，且 JS 效果都做，**畫面不可顯示 x 軸**
> 
> ###### x 軸備註
> 
> **請不要在 body 或第一層 div 加上 overflow:hidden 來規避 x 軸問題**
> 
> <sup>滿滿 der x 軸 (很重要說三次)<sup>
>

針對以上規範，我選擇了 Lv1 來實作 (原因最後再補)。


### mobile frist!
RWD 的部分從行動裝置下手，切分各個區塊後再與桌機版對照，有哪些地方排版需要變形？
  
## 這邊就挑首頁來說，如何拆分區塊？
  
每個網頁基本上會有 header、footer，這部份排在後面說明。

中間區塊依照設計的規律性，可藉由大標題分成四大區塊，以及最下方沒有標題卻不構成 footer 的區塊，這邊我切了五個區塊，它們會夾在 header 及 footer 之間。
  
### 五個區塊分別為：

- 區塊一
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-section-1.png)
  ![desktop](/docs/hexschool/chat_talker/assets/section-1.png)

- 區塊二
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-section-2.png)
  ![desktop](/docs/hexschool/chat_talker/assets/section-2.png)

- 區塊三
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-section-3.png)
  ![desktop](/docs/hexschool/chat_talker/assets/section-3.png)

- 區塊四
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-section-4.png)
  ![desktop](/docs/hexschool/chat_talker/assets/section-4.png)

- 區塊五
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-section-5.png)
  ![desktop](/docs/hexschool/chat_talker/assets/section-5.png)

可以看到區塊一、區塊二、區塊三、區塊四，包含了標題區塊及主題內容。而區塊一、區塊二、區塊三的主題內容在手機版呈現垂直排版，桌機版呈現水平排版，可以利用 css `flex` 相關屬性達到切換效果。

不過在區塊三主題內容的部分，自己懶惰覺得要用 flex 寫得屬性值太多，就選用了 `grid` 進行排版，利用 grid 相關屬性就可以達到不同排版。

額外補充：flex 及 grid 都有 `gap` 屬性可以設定，懶惰如我，使用 gap 就可以排除計算因 padding、border、或是其他會產生的多餘空間的數字問題，為什麼不用呢！

### 談談 header 切版

- header
  
  ![mobile](/docs/hexschool/chat_talker/assets/m-header.png)
  ![desktop](/docs/hexschool/chat_talker/assets/header.png)

從桌機版設計稿中看到有一個滿版破格的黃色圖塊設計，再從畫布設定得知該圖塊與可視視窗等高，為了達到這樣的需求，我將 navbar 及 banner 的部分包進 header 當中，並運用 css `background` 相關屬性與 vh 單位，達到不論在什麼版面中都能有滿版效果。
  
## 為什麼選擇 Lv1 實作？
  
>
> 令我心動的是任務二前幾名繳交的人可以被洧杰老師批改！
>

在我的網頁設計/前端工程師職涯中，還沒有遇過會 code review 這兩個部分的機會，能被 code review 可是要好好把握啊！

很謝謝排除萬難的老師給出的建議。

針對標題類的標籤屬性實屬拿捏不好，能看到這部分的建議真的很補！

另外提到背景圓球的部分，規劃切版時，將圓球位置與可視高度之間的比例為背景定位的方式，這個原因就產生了位移到不正確地方的問題了呢。

很開心能在 1400 位學生當中，成為前 10 位做完這份作業的學生！

謝謝看完的你！希望能幫助到你 :)

有好的建議也請告訴我歐！

### chatTalker AI 機器人
<sup>Lv1：做所有 RWD 頁面，畫面不可顯示 x 軸<sup>

GitHub Page：https://tzuchienkao.github.io/f2e-exam/hexschool/chat_talker/

洧杰老師ㄉ批改建議：https://chalk-freedom-ec6.notion.site/agnes-a08d56cc37594f178d170f36462f2505  



# 體驗營心得

![體驗營心得](https://i.imgur.com/wqZaPpu.jpg)

>
> 起初很猶豫報名
>
> 因為課程太基礎到不行
>
> 但是很便宜又可以做公益
>
> 再加上自己很不確定那些基礎我真的會了嗎？
>
> 各種想法跑來跑去
>
> 反正聽看看無傷大雅🤪
>


第一次跟線上課程的班，不敢置信有一千三百人報名！

居然還有學員在第二週就把取得證書的作業做完！
  
體驗營最大的收穫是被校長批改，擠破頭的擠進第五名交作業的人

原本就已經是加碼再加碼的大開各種課程

又可以收到校長的回饋，根本超值到天際R～
