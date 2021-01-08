<template>
  <div class="page-c">
    <div class="cu-chat">
      <div class="cu-item self">
        <div class="main">
          <div class="content bg-green shadow">
            <span>喵喵喵！喵喵喵！喵喵喵！喵喵！喵喵！！喵！喵喵喵！</span>
          </div>
        </div>
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></div>
        <div class="date">2018年3月23日 13:23</div>
      </div>
      <div class="cu-info round">对方撤回一条消息!</div>
      <div class="cu-item">
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></div>
        <div class="main">
          <div class="content shadow">
            <span>喵喵喵！喵喵喵！</span>
          </div>
        </div>
        <div class="date "> 13:23</div>
      </div>
      <div class="cu-info">
        <span class="cuIcon-roundclosefill text-red "></span> 对方拒绝了你的消息
      </div>
      <div class="cu-info">
        对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
        <span class="text-blue">发送好友验证</span>
      </div>
      <div class="cu-item self">
        <div class="main">
          <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
        </div>
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></div>
        <div class="date"> 13:23</div>
      </div>
      <div class="cu-item self">
        <div class="main">
          <div class="action text-bold text-grey">
            3"
          </div>
          <div class="content shadow">
            <span class="cuIcon-sound text-xxl padding-right-xl"> </span>
          </div>
        </div>
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></div>
        <div class="date">13:23</div>
      </div>
      <div class="cu-item self">
        <div class="main">
          <div class="action">
            <span class="cuIcon-locationfill text-orange text-xxl"></span>
          </div>
          <div class="content shadow">
            喵星球，喵喵市
          </div>
        </div>
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></div>
        <div class="date">13:23</div>
      </div>
      <div class="cu-item">
        <div class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></div>
        <div class="main">
          <div class="content shadow">
            @#$^&**
          </div>
          <div class="action text-grey">
            <span class="cuIcon-warnfill text-red text-xxl"></span> <span class="text-sm margin-left-sm">翻译错误</span>
          </div>
        </div>
        <div class="date">13:23</div>
      </div>
    </div>

<!--    <div class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">-->
    <div class="cu-bar input" :style="[{bottom:InputBottom+'px'}]" style="width: 100%;position: absolute;bottom: 0;">
      <div class="action">
        <span class="cuIcon-sound text-grey"></span>
      </div>
      <input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
             @focus="InputFocus" @blur="InputBlur"></input>
      <div class="action">
        <span class="cuIcon-emojifill text-grey"></span>
      </div>
      <button class="cu-btn bg-green shadow">发送</button>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        InputBottom: 0
      };
    },
    methods: {
      InputFocus(e) {
        this.InputBottom = e.detail.height
      },
      InputBlur(e) {
        this.InputBottom = 0
      }
    }
  }
</script>

<style>
  .page-c{
    padding-bottom: 100px;
    width: 100%;
    background-color: #e3e3e3;
    position: relative;
    border: 1px solid #cccccc;
  }
</style>
