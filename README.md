# Memory Vine

基于 `Next.js + TypeScript + Tailwind CSS + Supabase + Vercel` 的私密记忆手账应用。

## 本地运行

1. 安装依赖

```bash
npm install
```

2. 配置环境变量

参考 `.env.example`，本地开发使用 `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

3. 在 Supabase SQL Editor 执行

- `supabase/schema.sql`
- `supabase/storage.sql`

4. 启动开发环境

```bash
npm run dev
```

## 已实现

- 用户注册
- 用户登录
- 登录态保持
- 封面页
- 时间轴列表
- 新增记忆
- 详情弹层
- 图片/视频上传接口

## 当前约束

- 需要在 Supabase 后台关闭邮箱确认，才能实现注册后自动登录
- `memories-media` 目前按公开桶设计，便于 MVP 快速接通
- 编辑、删除、搜索等能力尚未加入
- 用户名会在服务端映射成合法内部邮箱，如 `admin@example.com`
