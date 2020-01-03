import { cloneDeep } from 'lodash'

function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

const isAttr = makeMap(
  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
  'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
  'target,title,type,usemap,value,width,wrap'
)

const isRenderableAttr = name => {
  return (
    isAttr(name) ||
    name.indexOf('data-') === 0 ||
    name.indexOf('aria-') === 0
  )
}

// 处理 vue jsx 中 props 自动分割
function filterProps(obj, cb) {
  const newObj = {}
  for (let key in obj) {
    // 满足规则或不存在规则时
    if(!cb || cb(key)) {
      newObj[key] = obj[key]
      delete obj[key]
    }
  }
  return newObj
}

// 实现 props 自动分拆等同于模板之上的 v-bind 合并写法
export function jsxProps(schema = {}) {
  const temp = cloneDeep(schema)
  const { options = {} } = temp

  const rest = {}
  rest.attrs = filterProps(options, isRenderableAttr)
  rest.props = filterProps(options)
  rest.style = schema.style

  return rest
}
