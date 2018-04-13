## 技术线
  * typescript
  * sass
  * css-modules
  * react
  * react-router-dom
  * react-redux
  * redux-act
  * superagent
  * antd
  * moment

### 安装
yarn install

### 启动
yarn start

### 编译
yarn build

### 创建模块
yarn cre m [目录] [模块名称] 

*例子
>yarn cre m . Demo

### 目录结构
* src
  * aip （所有和全局数据以及后端交互但是不和显示层相关的逻辑）
    * system（系统通用api）
    * user（用户相关api）
  * display（显示对象）
    * components（组件）
    * modules（模块）
    * part（显示片段）
  * entry（类似条目的配置）
    * constant（全站用的常量）
    * Routes（路由的跟配置）
  * frame （全站底层类）
  * redux （全局状态管理的扩展）
  * routes (全局路由管理)
  * utils （全站和业务无关的工具类）

<br/><br/>

注意：
> 组件 - 不会有业务逻辑，不和全局数据发生关机。<br/>
> 显示片段 - 有独立的业务逻辑处理能力