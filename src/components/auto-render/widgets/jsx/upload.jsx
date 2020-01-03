import axios from 'axios'
import { jsxProps } from '../../utils'

// 类型 上传图片 文件
// 此组件应完成上传素材库功能, 然后其他处使用返回的 url 即可

// 如果是图片 需要限制格式 image/jpeg,image/jpg,image/png,image/gif

const accepts = {

}

// 排版
// 第一种 支持 N 张, 回显预览
// 第二种 支持多张 拖拽
export default {
  props: {
    vname: String,
    schema: {
      type: Object,
      required: true,
    },
    formData: Object,
  },

  data() {
    return {
      // https://developer.qiniu.com/kodo/manual/1671/region-endpoint
      qiniuUrl: 'https://upload.qiniup.com',
      updatedToken: {},
    }
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

  render(h) {
    const {
      vname,
      schema,
      formData = {},
      beforeUpload,
    } = this

    schema.options = schema.options || {}
    const { options } = schema

    options.action = this.qiniuUrl
    options.data = this.uploadToken
    // options.autoUpload = false

    let className = `d-upload`
    if (options.listType) {
      className += ` d-upload-${options.listType}`
    }

    // 如果上传图片, 默认 accepts
    if (!options.accepts) {
      schema.options.accepts = 'image/jpeg,image/jpg,image/png,image/gif'
    }

    const props = jsxProps(schema)

    if (options.drag) {
      return (
        <el-upload
          {...props}
          class={className}
          beforeUpload={beforeUpload}
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      )
    }

    return (
      <el-upload
        {...props}
        class={className}
        beforeUpload={beforeUpload}
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            src="file.url"
            alt=""
          />
          <span class="el-upload-list__item-actions">
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
    )
  },
}

