<template>
  <el-upload
    v-bind="schema.options"
    :class="className"
    before-upload="beforeUpload"
  >
    <template v-if="options.drag">
      <em class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </template>
    <template v-else>
      <em slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            click="handleDownload(file)"
          >
            <em class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            click="handleRemove(file)"
          >
            <em class="el-icon-delete" />
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script>
import axios from 'axios'
import { mixinCommon } from '../../common/utils'

export default {
  mixins: [
    mixinCommon,
  ],
  data() {
    return {
      // https://developer.qiniu.com/kodo/manual/1671/region-endpoint
      qiniuUrl: 'https://upload.qiniup.com',
      updatedToken: {},
    }
  },

  computed: {
    options() {
      return this.schema && this.schema.options || {}
    },
    className() {
      let className = `d-upload`
      const { options } = this
      if (options.listType) {
        className += ` d-upload-${options.listType}`
      }
      return className
    },
  },

  methods: {
    beforeUpload() {
      // 按时间格式命名 dayjs 处理
      const keyName = ``
      return axios.get('xxx', data => {
        this.updatedToken = {
          token: data.token,
          // key: keyName,
        }
      })
    },

    uploadQiniu() {
      // 重写 http-request
    },
  },
}
</script>
