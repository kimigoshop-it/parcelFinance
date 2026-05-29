# 技术栈文档

> 项目名称：**parcelFinance**（基于 Soybean Admin 0.9.7 模板）
> 文档生成时间：2026-05-29

---

## 一、项目概述

本项目是一个基于 **Vue 3 + Vite + TypeScript** 的物流财务中后台管理系统，基于开源模板 [Soybean Admin](https://github.com/honghuangdc/soybean-admin) 进行二次开发。系统主要面向物流与财务场景，涵盖应收对账单、应付对账单、结算、报表、订单管理、退货处理、合并订单、报价等核心业务模块。

---

## 二、核心技术栈

### 2.1 前端框架与运行时

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue** | 3.3.4 | 渐进式 JavaScript 框架，使用 Composition API |
| **TypeScript** | 4.9.3 | 静态类型系统，增强代码可维护性 |
| **Vite** | 3.2.5 | 下一代前端构建工具，极速冷启动与 HMR |

### 2.2 路由与状态管理

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue Router** | 4.1.6 | 官方路由管理器，支持 Hash / History 模式 |
| **Pinia** | 2.1.7 | 官方推荐的状态管理库，轻量、类型友好 |
| **@soybeanjs/router-page** | 1.0.4 | 基于文件系统的自动路由插件 |

### 2.3 UI 组件库

| 技术 | 版本 | 说明 |
|------|------|------|
| **Naive UI** | 2.34.2 | 主要 UI 组件库，清新优雅的 Vue 3 组件 |
| **Element Plus** | 2.3.14 | 辅助 UI 组件库，提供表格、配置化组件等 |
| **Vant** | 4.5.0 | 轻量移动端组件库（项目中按需引入部分组件） |

### 2.4 样式方案

| 技术 | 版本 | 说明 |
|------|------|------|
| **UnoCSS** | 0.47.5 | 即时原子化 CSS 引擎，基于 Tailwind 语法 |
| **Sass / SCSS** | 1.56.1 | CSS 预处理器，用于全局样式与组件样式 |
| **CSS 变量** | - | 主题色系统，支持动态切换与深色模式 |

### 2.5 HTTP 请求与数据交互

| 技术 | 版本 | 说明 |
|------|------|------|
| **Axios** | 0.27.2 | HTTP 客户端，封装了统一请求/响应拦截 |
| **qs** | 6.11.0 | URL 参数序列化与解析 |

### 2.6 国际化 (i18n)

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue I18n** | 9.2.2 | 国际化方案，当前支持 **中文、俄语、哈萨克语** |

### 2.7 图标方案

| 技术 | 版本 | 说明 |
|------|------|------|
| **Iconify** | 2.1.148 | 海量图标库，支持按需加载 |
| **unplugin-icons** | 0.14.14 | 图标自动按需引入为 Vue 组件 |
| **vite-plugin-svg-icons** | 2.0.1 | 本地 SVG 图标自动注册为 Symbol |
| **@vicons/antd** | 0.12.0 | Ant Design 图标集 |

### 2.8 图表与可视化

| 技术 | 版本 | 说明 |
|------|------|------|
| **ECharts** | 5.4.2 | 百度开源数据可视化图表库 |

### 2.9 工具库

| 技术 | 版本 | 说明 |
|------|------|------|
| **VueUse** | 9.6.0 | 实用的 Vue 组合式工具函数集 |
| **Day.js** | 1.11.7 | 轻量日期处理库 |
| **Moment** | 2.29.4 | 日期处理（兼容存量代码） |
| **Lodash-ES** | 4.17.21 | 实用工具函数库（ES Module 版本） |
| **Crypto-JS** | 4.1.1 | 加密算法库 |
| **Clipboard** | 2.0.11 | 剪贴板操作 |
| **ua-parser-js** | 1.0.32 | 浏览器 User-Agent 解析 |
| **colord** | 2.9.3 | 颜色处理与转换 |
| **@better-scroll/core** | 2.5.0 | 滚动优化库 |

---

## 三、工程化与开发工具

### 3.1 构建与插件

| 工具 | 说明 |
|------|------|
| **Vite** | 项目构建工具，支持开发服务器、打包、预览 |
| **@vitejs/plugin-vue** | Vite Vue 单文件组件支持 |
| **@vitejs/plugin-vue-jsx** | Vite JSX/TSX 支持 |
| **@vue-macros/reactivity-transform** | Vue 响应式语法糖转换（已废弃特性） |
| **unplugin-vue-components** | 组件自动按需引入（支持 Naive UI 自动解析） |
| **unplugin-vue-macros** | Vue 宏增强插件 |
| **vite-plugin-mock** | Mock 数据服务，支持开发/生产环境 |
| **vite-plugin-html** | HTML 模板变量注入（如 `<%= appName %>`） |

### 3.2 代码规范

| 工具 | 配置 | 说明 |
|------|------|------|
| **ESLint** | `soybeanjs-vue` 预设 | 代码质量与风格检查 |
| **Prettier** | 自定义 `.prettierrc.json` | 代码格式化 |
| **Husky** | 8.0.2 | Git 钩子管理 |
| **EditorConfig** | `.editorconfig` | 编辑器统一配置 |

### 3.3 包管理

| 工具 | 说明 |
|------|------|
| **pnpm** | 包管理器，使用 `pnpm-lock.yaml` 锁定依赖版本 |
| **.npmrc** | 配置淘宝镜像 `registry=https://registry.npmmirror.com/` |

---

## 四、项目架构

### 4.1 目录结构

```
parcelFinance/
├── build/              # Vite 构建相关配置与插件
│   ├── config/         # 代理配置
│   ├── plugins/        # Vite 插件集合
│   └── utils/          # 构建工具函数
├── mock/               # Mock 数据接口
├── public/             # 静态资源（不经过构建）
├── src/
│   ├── assets/         # 静态资源（图片、字体、SVG）
│   ├── components/     # 全局/业务组件
│   ├── composables/    # 组合式函数（布局、路由、系统、图标等）
│   ├── config/         # 项目配置文件
│   ├── context/        # 上下文相关
│   ├── directives/     # Vue 自定义指令
│   ├── enum/           # 枚举定义
│   ├── hooks/          # 业务/通用 Hooks
│   ├── json/           # JSON 静态数据
│   ├── lang/           # 国际化语言包（zh / rs / kh）
│   ├── layouts/        # 布局组件
│   ├── plugins/        # 项目插件注册
│   ├── router/         # 路由配置与守卫
│   ├── service/        # API 请求层
│   │   ├── api/        # 业务接口定义
│   │   └── request/    # Axios 封装
│   ├── settings/       # 主题/颜色/系统设置
│   ├── store/          # Pinia 状态管理模块
│   ├── styles/         # 全局样式（SCSS / CSS）
│   ├── typings/        # TypeScript 类型声明
│   ├── utils/          # 工具函数库
│   └── views/          # 页面视图
├── index.html          # HTML 入口模板
├── vite.config.ts      # Vite 主配置
├── tsconfig.json       # TypeScript 配置
├── uno.config.ts       # UnoCSS 配置
├── .eslintrc.js        # ESLint 配置
├── .prettierrc.json    # Prettier 配置
├── .env-config.ts      # 多环境服务配置
├── Dockerfile          # Docker 镜像构建
└── nginx.conf          # Nginx 部署配置
```

### 4.2 路由模式

- 支持 **Hash 模式** (`createWebHashHistory`) 与 **History 模式** (`createWebHistory`)
- 通过环境变量 `VITE_HASH_ROUTE` 控制切换
- 结合 `@soybeanjs/router-page` 实现基于文件结构的自动路由生成

### 4.3 状态管理模块 (Pinia)

| 模块 | 职责 |
|------|------|
| `app` | 应用级状态（语言、全屏、侧边栏等） |
| `auth` | 用户认证与权限信息 |
| `theme` | 主题配置（明暗模式、主题色、布局模式） |
| `tab` | 多页签状态管理 |
| `route` | 路由权限与菜单数据 |
| `business` | 业务相关状态 |

### 4.4 主题与布局系统

- **布局模式**：支持 `vertical` / `vertical-mix` / `horizontal` / `horizontal-mix`
- **主题色**：内置 24 种预设色板 + 中国传统颜色扩展
- **动画**：6 种页面切换动画（fade-slide / fade / fade-bottom / fade-scale / zoom-fade / zoom-out）
- **深色模式**：通过 `dark` class + Naive UI `n-config-provider` 实现

---

## 五、环境配置

### 5.1 多环境脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 开发环境（dev） |
| `pnpm dev:test` | 测试环境 |
| `pnpm dev:prod` | 生产环境（本地模拟） |
| `pnpm build` | 生产环境打包 |
| `pnpm build:dev` | 开发环境打包 |
| `pnpm build:test` | 测试环境打包 |
| `pnpm preview` | 预览生产构建 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm lint` | ESLint 自动修复 |

### 5.2 后端服务环境

项目配置了 **3 套环境**（`dev` / `test` / `prod`），支持**双后端地址**（主服务 + 第二服务）：

| 环境 | 主服务地址 | 说明 |
|------|-----------|------|
| dev | `http://192.168.110.102:8080/` | 本地/内网开发 |
| test | `https://admapi.qa.kimigoshop.com/` | QA 测试环境 |
| prod | `https://admapi.prod.kimigoshop.com/` | 生产环境 |

---

## 六、部署方案

### 6.1 Docker + Nginx

```dockerfile
FROM nginx:1.20
COPY dist/ /opt/web/dist/
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
```

- **构建产物**：`dist/` 目录为纯静态资源
- **Web 服务器**：Nginx 1.20
- **Gzip 压缩**：已启用，压缩 `text/css` / `application/javascript` / `application/json` 等

### 6.2 端口配置

- **开发服务器**：`3200`
- **Nginx 默认**：`80` / `443`

---

## 七、业务模块

| 模块 | 说明 |
|------|------|
| **receivable_statement** | 应收对账单 |
| **payable_statement** | 应付对账单 |
| **settlement** | 结算管理 |
| **statement** | 财务报表 |
| **orderforgoods** | 货物订单 |
| **returnshipment** | 退货管理 |
| **combinedorder** | 合并订单 |
| **quotation** | 报价管理 |
| **home** | 首页/仪表盘 |
| **settings** | 系统设置 |

---

## 八、特色功能

1. **自动按需引入**：组件、图标均通过 `unplugin` 系列插件自动按需加载，无需手动 import
2. **多语言支持**：内置中文、俄语、哈萨克语三套语言包，可动态切换
3. **主题动态切换**：支持一键切换主题色、布局模式、明暗模式，配置持久化到本地存储
4. **双后端代理**：支持同时代理两个不同的后端服务地址
5. **Mock 服务**：基于 `vite-plugin-mock`，开发/生产均可使用 Mock 数据
6. **SVG 图标系统**：本地 SVG 自动注册为 Symbol，支持 Iconify 海量图标库

---

## 九、版本兼容性说明

> ⚠️ 部分依赖版本较旧，升级时需注意：

- **Vue 3.3.4**：当前稳定版本，建议评估升级至 Vue 3.4+
- **Vite 3.2.5**：Vite 3.x 已停止维护，建议升级至 Vite 5.x/6.x
- **Axios 0.27.2**：建议升级至 1.x 版本以获得更好的 TypeScript 支持
- **TypeScript 4.9.3**：建议升级至 5.x 以获得最新类型特性
- **@vue-macros/reactivity-transform**：该语法糖已在 Vue 3.4 中废弃，建议逐步迁移
