import { cloneDeep } from './utils'

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

// 实现 props 自动分拆等同于模板之上的 v-bind 合并写法 dynamicProps
// 在普通组件中，只要明确声明的属性会被划分到props分类中，剩下的均在attrs中。
// 而对于函数式组件，只要省略了props选项，传参时不管是否明确分类，最终context.props获取到的都是全部属性
// 如果你需要获取明确的分类情况，可以在context.data下查看
export function vueProps(props = {}) {
  const temp = cloneDeep(props)

  const rest = {}
  rest.attrs = filterProps(temp, isRenderableAttr)
  rest.props = filterProps(temp)
  rest.style = props.style

  return rest
}
