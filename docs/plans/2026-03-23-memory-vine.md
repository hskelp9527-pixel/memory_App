# Memory Vine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建 Memory Vine 的 MVP Web 应用，完成用户名密码鉴权、私密时间轴、多媒体上传与详情查看。

**Architecture:** 采用 Next.js App Router 作为前端与轻量 API 层，Supabase 承载 Auth、Postgres 与 Storage。通过服务端 Route Handler 统一封装注册/登录与记忆 CRUD，前端围绕现有 Stitch 样式稿重构为可复用组件。

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Supabase, Zod, Vitest, Testing Library

---

### Task 1: 初始化工程骨架

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `.env.example`

**Step 1: 写基础配置测试或验证点**
- 确认 `npm run build` 可以作为骨架验证命令

**Step 2: 初始化最小工程**
- 创建 Next.js 运行所需配置
- 建立 `src/` 目录结构

**Step 3: 运行构建验证**
- Run: `npm run build`
- Expected: 成功输出 Next.js 构建结果

### Task 2: 落环境变量与 Supabase 客户端

**Files:**
- Create: `src/lib/env.ts`
- Create: `src/lib/supabase/browser.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`
- Test: `src/lib/env.test.ts`

**Step 1: 写失败测试**
- 验证缺失必要环境变量时抛错

**Step 2: 运行测试看红**
- Run: `npm run test -- src/lib/env.test.ts`

**Step 3: 写最小实现**
- 环境变量读取
- 浏览器端与服务端 Supabase client

**Step 4: 重新运行测试**
- Run: `npm run test -- src/lib/env.test.ts`

### Task 3: 实现认证领域逻辑

**Files:**
- Create: `src/lib/auth/username.ts`
- Create: `src/lib/auth/schemas.ts`
- Create: `src/app/api/auth/register/route.ts`
- Create: `src/app/api/auth/login/route.ts`
- Test: `src/lib/auth/username.test.ts`

**Step 1: 写失败测试**
- 用户名规范化
- 用户名转内部邮箱

**Step 2: 跑红**
- Run: `npm run test -- src/lib/auth/username.test.ts`

**Step 3: 写最小实现**
- `normalizeUsername`
- `usernameToEmail`
- Zod schema
- 注册/登录 Route Handler

**Step 4: 跑绿**
- Run: `npm run test -- src/lib/auth/username.test.ts`

### Task 4: 准备数据库脚本

**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/storage.sql`
- Create: `src/types/memory.ts`

**Step 1: 产出 SQL**
- `memories` 表
- RLS 策略
- Storage bucket 规则说明

**Step 2: 同步 TS 类型**
- 对齐 Memory 实体与表单输入

### Task 5: 构建设计系统与基础布局

**Files:**
- Create: `src/components/ui/paper-card.tsx`
- Create: `src/components/ui/paper-modal.tsx`
- Create: `src/components/ui/primary-button.tsx`
- Create: `src/components/ui/text-field.tsx`
- Create: `src/components/ui/vintage-stamp.tsx`
- Modify: `src/app/globals.css`

**Step 1: 先建立样式 token**
- 颜色
- 字体
- 纸张/皮革/颗粒纹理

**Step 2: 写最小复用组件**
- 不引入额外 UI 库

### Task 6: 实现登录、注册、封面页

**Files:**
- Create: `src/app/(auth)/login/page.tsx`
- Create: `src/app/(auth)/register/page.tsx`
- Create: `src/app/(app)/book/page.tsx`
- Create: `src/components/auth/login-form.tsx`
- Create: `src/components/auth/register-form.tsx`
- Create: `src/components/book/book-cover.tsx`

**Step 1: 先写交互测试**
- 表单必填校验
- 成功后跳转行为

**Step 2: 跑红**
- Run: `npm run test`

**Step 3: 写最小实现**
- 接服务端认证接口
- 成功跳转 `/book`
- 未登录访问 app 路由重定向

**Step 4: 跑绿**
- Run: `npm run test`

### Task 7: 实现时间轴列表与获取接口

**Files:**
- Create: `src/app/(app)/timeline/page.tsx`
- Create: `src/app/api/memories/route.ts`
- Create: `src/components/memory/timeline-list.tsx`
- Create: `src/components/memory/polaroid-card.tsx`

**Step 1: 写接口和渲染测试**
- 空列表
- 正常列表

**Step 2: 实现接口与页面**
- 当前用户数据查询
- 倒序展示

### Task 8: 实现新增记忆与上传

**Files:**
- Create: `src/components/memory/new-memory-modal.tsx`
- Create: `src/components/memory/new-memory-form.tsx`
- Create: `src/lib/memory/schemas.ts`
- Modify: `src/app/api/memories/route.ts`
- Test: `src/lib/memory/schemas.test.ts`

**Step 1: 写失败测试**
- 校验必填字段
- 校验媒体类型

**Step 2: 跑红**
- Run: `npm run test -- src/lib/memory/schemas.test.ts`

**Step 3: 写最小实现**
- 文件上传到 Storage
- 插入 memories 表

**Step 4: 跑绿**
- Run: `npm run test -- src/lib/memory/schemas.test.ts`

### Task 9: 实现详情弹层

**Files:**
- Create: `src/app/api/memories/[id]/route.ts`
- Create: `src/components/memory/memory-detail-modal.tsx`
- Create: `src/components/memory/memory-detail.tsx`

**Step 1: 实现读取单条记忆**
- 权限校验
- 图片/视频分支展示
- 邮戳信息展示

### Task 10: 收尾验证

**Files:**
- Modify: `README.md`
- Modify: `task_plan.md`
- Modify: `progress.md`

**Step 1: 全量验证**
- Run: `npm run test`
- Run: `npm run build`

**Step 2: 手工检查**
- 登录
- 注册
- 时间轴
- 新增
- 详情

**Step 3: 记录结果**
- 更新计划与进度
