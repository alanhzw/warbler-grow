# 基于Nuxt3的ssr模版管理系统
---
[toc]

## 1. 功能描述
1. 模版列表页面
   1. 搜索条件包括以下啊内容
      * templateName 名称（模糊匹配）
      * type 模版类型（准确匹配）
      * templateKey key（准确匹配）
   2. 表格内按创建时间倒序排列，包含以下内容
      * 模版id templateId
      * 名称 templateName
      * 描述 templateDesc
      * key templateKey
      * 类型 typeName
      * 创建时间 createTime
      * 最后一次的更新时间 updateTime
      * 操作栏，包括一下功能
        * 查看 - 点击进入模版详情页面
        * 修改 - 点击进入模版编辑页面
        * 复制 - 点击进入模版创建页面
   3. 创建按钮 - 点击进入创建模版页面
   4. 分页器
2. 模版详情页面
   1. 展示模版名称、模版类型、模版描述
   2. 分页展示模版实例列表
      1. 搜索条件包括
         * instanceName 实例名称（模糊匹配）
         * isGeneral 是否是通用模版
         * groupId 如果是非通用模版可以输入
         * isOpen 是否可用
         * isRoot 是否是跟节点
      2. 表格内按照创建时间正序排列，包含以下内容
         * 实例id instanceId
         * 名称 instanceName
         * 父id parentId
         * 是否通用 isGeneral
         * 配置 configJson 点击可以预览修改
         * 是否可用开关 isOpen 点击可以切换
         * 创建时间 createTime
         * 最后一次的更新时间 updateTime
         * 操作栏，包括一下功能
           * 修改 - 点击进入实例编辑页面
           * 复制 - 点击进入实例创建页面
3. 模版创建页面
   1. 输入以下信息，保存生成模版数据：
      * 名称 templateName string
      * 描述 templateDesc string
      * key templateKey string - 表内唯一
      * 类型 typeName number 下拉选择
   2. 如果是复制模版，需要默认写入原模版的以下信息：
      * 名称 templateName string
      * 描述 templateDesc string
      * 类型 typeName number 下拉选择
4. 模版编辑页面
   1. 进入页面展示以下模版信息：
      * 名称 templateName
      * 描述 templateDesc
      * key templateKey
      * 类型 typeName
   2. 输入以下信息，保存更新模版数据：
      * 名称 templateName string
      * 描述 templateDesc string
      * 类型 typeName number 下拉选择
5. 实例创建页面
   1. 输入以下信息，保存生成实例数据：
      * 名称 instanceName string
      * 父id parentId string 可以为空
      * 是否通用 isGeneral number 开关点击切换
      * 配置 configJson 默认是 “{}”
      * 是否可用开关 isOpen number 开关点击切换

      _另外需要默认写入模版id templateId，并不可修改_
   2. 如果是复制实例，需要默认写入原实例的以下信息：
      * 名称 instanceName string
      * 父id parentId string 被复制的实例的id
      * 是否通用 isGeneral
      * 配置 configJson
      * 是否可用开关 isOpen
6. 实例编辑页面
   1. 进入页面展示以下模版信息：
      * 名称 instanceName
      * 父id parentId string
      * 是否通用 isGeneral
      * 配置 configJson
      * 是否可用开关 isOpen
   2. 输入以下信息，保存更新模版数据：
      * 名称 instanceName string
      * 是否通用 isGeneral number 开关点击切换
      * 配置 configJson 默认是 “{}”
      * 是否可用开关 isOpen number 开关点击切换

## 2. 开发流程
1. 初始化项目
   1. 创建项目使用Nuxi命令新建工程

      ```javascript
      nuxi init nuxt-template-admin
      ```
   2. 从[gitlab](http://49.4.78.8:30001/frontend-training/nuxt-template-admin)上拉取项目

      ```bash
      git clone git@49.4.78.8:frontend-training/nuxt-template-admin.git
      ```
2. 创建空页面
   1. 模版列表页面 - /pages/template/index.vue
   2. 模版详情页面 - /pages/template/[templateId]/index.vue
   3. 模版创建页面 - /pages/template/create.vue
   4. 模版编辑页面 - /pages/template/[templateId]/edit.vue
   5. 模版实例新建页面 - /pages/instance/create.vue
   6. 模版实例编辑页面 - /pages/instance/[instanceId]/edit.vue
3. 集成element-plus
   1. 利用nuxt的plugin集成element-plus
4. 创建接口
   1. 获取模版类型接口 - /server/api/types GET
   2. 获取模版列表接口 - /server/api/templates GET
   3. 获取模版详情接口 - /server/api/template/:templateId GET
   4. 获取模版下属实例列表接口 - /server/api/template/:templateId/instances GET
   5. 创建模版接口 - /server/api/template PUT
   6. 修改模版接口 - /server/api/template/:templateId POST
   7. 创建实例接口 - /server/api/instance PUT
   8. 修改实例接口 - /server/api/instance/:instanceId POST