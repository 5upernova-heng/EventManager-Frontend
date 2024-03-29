# EventManager-Frontend

北京邮电大学计算机系2023数据结构课程设计 —— 前端部分

## 环境配置

### 1. 下载 [Node.js](https://nodejs.org/en)

```bash
node -v
# v18.*.*
```

### 2. Clone & 安装依赖

```bash
git clone https://github.com/5upernova-heng/EventManager-Frontend
cd EventManager-Frontend
yarn #(recommand), or you can use "npm i"
```

> 建议使用 [`yarn`](https://yarnpkg.com/)，而不是 `npm` 进行包管理

### 3. 本地调试

```bash
yarn dev 
#or: npm run dev
```

在浏览器中打开 http://localhost:5173/ 查看页面。

## 项目进度

### To Do List

Essiencial

1. Remind
   1. 消息提醒应该为全局，而不是组件级别

2. With backend:
   1. remind 下一天事件时输出路径
   1. 从事件查看页面跳转到导航

More:
- Sort location selector by alphabet
- 404 Page && Can't not access page by pathname directly
- Group Page
- Remove alarm page

### 进度一览

- [x] 日程日历
  - [x] 周日历
    - [x] 日历头
    - [x] 日历表
    - [x] 日历编辑表单：增删查改
      - [x] 输入验证
      - [x] 分类与权限显示
      - [ ] 连接后端
  - [x] 侧边栏
    - [x] 月日历
    - [x] 更详细的时间调整
- [x] 校园地图
  - [x] 显示路线
  - [x] 画出路线
  - [ ] 连接后端
- [ ] 日志显示
  - [ ] 指从后端请求的日志（list group 视图）
- [ ] 闹钟管理
  - [ ] 闹钟界面
    - [x] 闹钟
    - [x] 增删查改按钮
  - [x] Alert 界面
- [x] 登录界面
  - [x] 退出登录
  - [x] 连接后端
- [ ] 说明文档
- [ ] 测试代码