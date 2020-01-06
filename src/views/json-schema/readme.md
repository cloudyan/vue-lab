# 深入了解 JSON SCHEMA

https://json-schema.org/

参看示例: https://json-schema.org/learn/
校验测试: https://vue.labs.cloudai.net/examples/json-schema/xxx.schema.json

## 字段解析

json schema 最外层包含以下几个字段

```json
{
  // $schema 关键字状态，表示这个模式与 v7 规范草案书写一致。
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "标题", // 标题，用来描述结构
  "description": "描述",
  "type": ["string", "number", "boolean", "null", "array", "object"], // 类型 anyOfIn
  "properties": {}, // 定义属性
  "required": [], // 必需属性, 字符串数组
}
```

type 和 properties 用来定义json 属性的类型。required 是对Object字段的必段性进行约束。

### string

https://json-schema.org/understanding-json-schema/reference/string.html

```json
{
  "type": "string",
  "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$", // 正则验证
  "format": "date",
  /**
    format 可选值
    - date-time 2018-11-13T20:20:39+00:00
    - time 20:20:39+00:00
    - date 2018-11-13
    - email
    - hostname
    - uri
    - uri-template
    - ipv4
    - ipv6
    - regex
  */
  "maxLength": "2", // The length of a string,
  "minLength": "8",
}
```

常用的正则表达式

- [^a-z]

### number

https://json-schema.org/understanding-json-schema/reference/numeric.html

```json
{
  // 可选 number integer
  "type": "number",
  // 使用 multipleOf 关键字可以将数字限制为给定数字的倍数。可以将其设置为任何正数。
  "multipleOf": 3, // 必须大于0的整数
  "minimum": 1, // X >= minimum
  "maximum": 9, // X <= maximum
  "exclusiveMinimum": 1, // X > exclusiveMinimum
  "exclusiveMaximum": 9, // X < exclusiveMaximum
}
```

### object

https://json-schema.org/understanding-json-schema/reference/object.html

```json
{
  "type": "object", // type 限定类型
  "properties": {}, // 定义object的各个字段
  "require": [],  // 字符串数组, 限定必需字段
  "propertyNames": { // 属性名称校验
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  },
  "minProperties": 2, // 可选 最小属性个数
  "maxProperties": 6, // 可选 最大属性个数
  "additionalProperties": true, // 用于控制的额外的东西 默认:true, 可选 false or object
  // - false 不允许 properties 有未列出的其他属性
  // - false 不允许 properties 有未列出的其他属性
  "dependencies": {
    // 属性依赖 依赖可以单向 也可以双向
    // "credit_card": ["billing_address"],
    // "billing_address": ["credit_card"],
    // 架构依赖
    "credit_card": {
      "properties": {
        "billing_address": { "type": "string" }
      },
      "required": ["billing_address"]
    }
  },
  // 模式依赖
  "patternProperties": {
    "^S_": { "type": "string" }, // 如果属性名以 S_ 开头, 必须为字符串
    "^I_": { "type": "integer" } // 如果属性名以 I_ 开头, 必须为整数
  },
  "additionalProperties": false
    // additionalProperties 用于控制的额外的东西 默认:true,
    // 设置为 false, 则不允许 properties 有未列出的其他属性
    // 设置为 object, 如 { "type": "string" }, 则未列出的多余的属性必须满足此条件
}
```

### array

https://json-schema.org/understanding-json-schema/reference/array.html

默认情况下，数组的元素可以是任何东西。但是，通常也可以根据某种模式验证数组的项。

```json
{
  "type": "array",
  // 如下, 当items为单个模式时，additionalItems关键字是没有意义的，因此不应使用。
  // "items": { // items 模式 (每个项都要满足条件)
  //   "type": "number"
  // },
  "contains": { // contains 模式 只要一个满足条件就 OK
    "type": "number"
  },
  "items": [ // 元组模式
    {
      "type": "number"
    },
    {
      "type": "string"
    },
    {
      "type": "string",
      "enum": ["Street", "Avenue", "Boulevard"]
    },
    {
      "type": "string",
      "enum": ["NW", "NE", "SW", "SE"]
    }
  ],
  // additionalItems 控制超出了items 数组所定义的额外项是否有效
  // 如果您正在执行“列表验证”（items是一个对象），则没有任何意义，在这种情况下将被忽略。
  "additionalItems": false, // 也可以设置 object 限定额外项的类型等
  "minItems": 2, // items 长度限制
  "maxItems": 3,
  "uniqueItems": true // items 中每个项都是唯一的
}
```

### boolean

```json
{
  "type": "boolean" // 限定匹配两个值 true 或 false
}
```

### null

空类型通常用于表示缺失值, 只有一个可接受的值: null

```json
{
  "type": "null"
}
```

### 通用关键字

https://json-schema.org/understanding-json-schema/reference/generic.html

```json
  // 草案 7 的新功能 注释
  "$comment": "注释",
  "title" : "Match anything",
  "description" : "This is a schema that matches anything.",
  "default" : "Default value",
  "examples" : [
    "Anything",
    4035
  ],
  // 枚举值 要满足枚举值
  // enum 用于限制值，以一个固定的一组值。它必须是一个至少包含一个元素的数组，其中每个元素都是唯一的。
  "enum": ["red", "amber", "green", null, 42]
  // const 用于限制值，以一个单一的值。
  "const": "this must be this", // 只是语法糖, 等价于 "enum": ["this must be this"]
  // "$ref": "", // $ref 用来引用其它schema, $ref也可以是相对或绝对URI
}
```

其他

```json
// definitions: 当一个schema写的很大的时候，可能需要创建内部结构体，再使用$ref进行引用
{
  "type": "array",
  "items": { "$ref": "#/definitions/positiveInteger" },
  "definitions": {
    "positiveInteger": {
      "type": "integer",
      "minimum": 0,
      "exclusiveMinimum": true
    }
  }
}

{ "not": { "type": "string" } }

// 复杂模式
{
  "$schema": "http://json-schema.org/draft-07/schema#",

  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city":           { "type": "string" },
        "state":          { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },

  "type": "object",

  "properties": {
    "billing_address": { "$ref": "#/definitions/address" },
    "shipping_address": { "$ref": "#/definitions/address" }
  }
}
```

### 媒体类型

https://json-schema.org/understanding-json-schema/reference/non_json_data.html

处理非 json 格式数据

```json
{
  "type": "string",
  "contentMediaType": "text/html"
}

// or

{
  "type": "string",
  "contentEncoding": "base64",
  "contentMediaType": "image/png"
}
```

### 结合模式

https://json-schema.org/understanding-json-schema/reference/combining.html

```json
// 满足所有要求即可
{
  "allOf": [
    { "type": "string" },
    { "maxLength": 5 }
  ]
}

// 满足任一或多个要求即可
{
  "anyOf": [
    { "type": "string", "maxLength": 5 },
    { "type": "number", "minimum": 0 }
  ]
}

// 满足任一条件即可 但不能多个
{
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}
// 上述等效
{
   "type": "number",
   "oneOf": [
     { "multipleOf": 5 },
     { "multipleOf": 3 }
   ]
 }

// 不满足条件的才有效
{ "not": { "type": "string" } }
```

### 条件应用

https://json-schema.org/understanding-json-schema/reference/conditionals.html

```json
{
  "type": "object",
  "properties": {
    "street_address": {
      "type": "string"
    },
    "country": {
      "enum": ["United States of America", "Canada"]
    }
  },
  "if": {
    "properties": { "country": { "const": "United States of America" } }
  },
  "then": {
    "properties": { "postal_code": { "pattern": "[0-9]{5}(-[0-9]{4})?" } }
  },
  "else": {
    "properties": { "postal_code": { "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]" } }
  }
}
```
