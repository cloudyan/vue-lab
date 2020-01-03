
import input from './input'
import select from './select'
import color from './color'
import upload from './upload'

// 不少坑 暂不采用纯 jsx 实现
export const widgets = {
  input,
  select,
  color,
  upload,
}

export const mapping = {
  input: 'input',
  select: 'select',
  color: 'color',
  upload: 'upload',
}
