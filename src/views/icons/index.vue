<template>
  <div class="icons-container">
    <aside>
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="png">
        <div class="grid">
          <div v-for="item of pngIcons" :key="item" @click="handleClipboard(generatePngCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generatePngCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'icon icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateElementIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-' + item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="网络图片/base64">
        <div class="grid">
          <div v-for="item of netIcons" :key="item" @click="handleClipboard(generateImgCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateImgCode(item) }}
              </div>
              <img style="max-width: 200px" :src="item" alt="">
            </el-tooltip>
          </div>
        </div>
        <div class="grid">
          <div v-for="item of base64" :key="item" @click="handleClipboard(generateImgCode(item), $event)">
            <el-tooltip placement="top">
              <div slot="content">
                {{ generateImgCode(item) }}
              </div>
              <img style="max-width: 200px" :src="item" alt="">
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import clipboard from '@/utils/clipboard'
  import svgIcons from './svg-icons'
  import elementIcons from './element-icons'
  import netIcons from './netIcons'
  import base64 from './base64'
  import pngIcons from './png-Icons'

  export default {
    name: 'Icons',
    data() {
      return {
        svgIcons,
        elementIcons,
        netIcons,
        base64,
        pngIcons,
        image: ''
      }
    },
    methods: {
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      generateElementIconCode(symbol) {
        return `<i class="el-icon-${symbol}" />`
      },
      generateImgCode(symbol) {
        return `<img src="${symbol}" />`
      },
      generatePngCode(symbol) {
        return `<i class="icon icon-${symbol}" />`
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      }
    }
  }
</script>

<style ref="sass" lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
