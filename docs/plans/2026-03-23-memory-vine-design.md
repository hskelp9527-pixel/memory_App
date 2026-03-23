# Memory Vine 设计文档

## 1. 背景与目标

Memory Vine 是一个以复古手账为视觉核心的私密记忆 Web 应用。用户通过“用户名 + 密码”完成注册与登录，进入专属记忆封面页，再进入时间轴查看、创建与回顾自己的多媒体记忆。

本阶段目标：
- 基于现有 6 个 HTML 样式稿，统一成一套可复用的前端界面体系
- 采用 `Next.js + TypeScript + Tailwind CSS + Supabase + Vercel`
- 完成 MVP 闭环：注册、登录、封面、时间轴、新增记忆、详情查看、媒体上传、用户隔离

## 2. 技术选型

### 推荐方案
- 前端框架：Next.js App Router
- 语言：TypeScript
- 样式：Tailwind CSS + 全局设计 Token
- 数据与鉴权：Supabase
- 部署：Vercel
- 表单校验：Zod
- 测试：Vitest + Testing Library

### 选型理由
- Next.js 便于管理路由、布局、鉴权跳转与未来服务端能力
- TypeScript 有利于约束数据模型与接口结构
- Tailwind 适合将 Stitch 输出的视觉元素提炼成组件
- Supabase 天然满足 Auth、Postgres、Storage 与 RLS 需求

## 3. 产品范围

### MVP 包含
- 用户注册
- 用户登录
- 登录态持久化
- 封面页入口
- 时间轴列表
- 新增记忆
- 查看记忆详情
- 图片/视频上传
- 响应式适配
- RLS 数据隔离

### MVP 不包含
- 忘记密码
- 编辑/删除记忆
- 搜索/筛选
- 标签系统
- 分享能力
- 后台管理

## 4. 信息架构与页面映射

### 路由
- `/`：根据登录态跳转
- `/login`：登录页
- `/register`：注册页
- `/book`：手账封面页
- `/timeline`：时间轴页

### 弹层
- `NewMemoryModal`：新增记忆
- `MemoryDetailModal`：记忆详情

### 样式稿映射
- `login.html` -> 登录页
- `sign.html` -> 注册页
- `signal.html` -> 封面页
- `code.html` -> 时间轴页
- `新增.html` -> 新增记忆弹窗
- `详情页弹窗.html` -> 记忆详情弹窗

## 5. 数据模型

### 表：`memories`
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id)`
- `title text not null`
- `memory_date date not null`
- `specific_time text null`
- `location text null`
- `media_url text not null`
- `media_path text not null`
- `media_type text not null check (media_type in ('image','video'))`
- `caption text not null`
- `content text not null`
- `created_at timestamptz not null default now()`

### 说明
- `media_path` 用于后续更稳定地管理 Storage 对象
- `media_url` 用于前端直接渲染

## 6. 认证设计

### 对用户暴露的能力
- 注册：用户名 + 密码
- 登录：用户名 + 密码

### 对 Supabase 的内部映射
- 用户名会被转换成内部邮箱：`<normalizedUsername>@example.com`
- 注册成功后立即自动登录

### 约束
- 用户名需要规范化与唯一性校验
- 服务端封装注册/登录接口，避免前端散落鉴权逻辑

## 7. 安全设计

### 必做项
- 服务端密钥仅用于服务端环境变量
- 前端只使用 publishable key
- 所有表单用 Zod 校验
- 上传文件限制 MIME 与大小
- 启用 memories 表 RLS
- Storage 路径按 `user_id/<uuid>.<ext>` 组织
- 服务端错误信息不向前端泄漏内部细节

## 8. 组件设计

### UI 基础组件
- `PaperCard`
- `PaperModal`
- `TextField`
- `TextareaField`
- `PrimaryButton`
- `FloatingActionButton`
- `VintageStamp`
- `PolaroidCard`

### 业务组件
- `LoginForm`
- `RegisterForm`
- `BookCover`
- `TimelineList`
- `MemoryCard`
- `NewMemoryForm`
- `MemoryDetail`

## 9. 测试策略

### 单元测试
- 用户名规范化逻辑
- 认证请求参数校验
- 记忆表单校验
- 文件类型与大小校验

### 集成测试
- 注册接口
- 登录接口
- 创建记忆接口
- 获取记忆列表接口

### 暂缓
- E2E 流程可在 MVP 基础稳定后补

## 10. 实施阶段

1. 初始化项目与设计 Token
2. 配置 Supabase 客户端与环境变量
3. 落数据库 SQL、RLS、Storage 规则
4. 实现认证接口与鉴权守卫
5. 实现登录/注册/封面/时间轴
6. 实现新增与详情弹层
7. 添加测试并联调

## 11. 当前决议

- 采用 Next.js 方案
- 不向用户暴露邮箱字段
- 注册和登录均走服务端封装接口
- 数据库与存储均由 Supabase 承载
