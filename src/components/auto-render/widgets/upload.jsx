import { jsxProps } from '../utils'

// 类型 上传图片 文件
// 此组件应完成上传素材库功能, 然后其他处使用返回的 url 即可

// 排版
// 第一种 支持 N 张, 回显预览
// 第二种 支持多张 拖拽
export default {
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },

  render(h) {
    const {
      vname,
      schema,
      formData = {},
    } = this.$props

    const props = jsxProps(schema)
    const { options } = schema

    let className = `d-upload`
    if (options.listType) {
      className += ` d-upload-${options.listType}`
    }

    if (options.drag) {
      return (
        <el-upload
          {...props}
          class={className}
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

