# Memory Vine UX Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 Memory Vine 的新增弹窗、时间轴和封面页从功能可用提升到更完整的复古手账体验。

**Architecture:** 不调整后端与数据库，只围绕现有 Next.js 页面和组件做交互与视觉重构。重点在上传入口重设计、时间轴中线结构、新增按钮重绘，以及封面翻书动画。

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, Vitest

---

### Task 1: 新增弹窗上传交互重构

**Files:**
- Modify: `src/components/memory/new-memory-modal.tsx`
- Modify: `src/components/memory/new-memory-form.tsx`
- Test: `src/lib/memory/schemas.test.ts`

**Step 1: 保持现有上传校验测试通过**

Run: `npm run test -- src/lib/memory/schemas.test.ts`
Expected: PASS

**Step 2: 重构上传区域**

- 左侧相框成为点击上传入口
- 移除“媒体文件”标题与提示文案
- 增加上传后预览
- 时间字段改为 `type="time"`

**Step 3: 验证**

Run: `npm run build`
Expected: PASS

### Task 2: 时间轴加藤蔓主线与新按钮

**Files:**
- Modify: `src/components/memory/timeline-list.tsx`
- Modify: `src/components/memory/polaroid-card.tsx`

**Step 1: 增加主线骨架**
- 中央藤蔓线
- 叶片节点
- 卡片位置与主线关系重排

**Step 2: 重做新增按钮**
- 黄铜/印章质感
- hover/active 状态

**Step 3: 验证**

Run: `npm run build`
Expected: PASS

### Task 3: 封面页翻书进入

**Files:**
- Modify: `src/components/book/book-cover.tsx`

**Step 1: 去掉独立 CTA**
- 整本书可点击
- 增加翻书动画与跳转

**Step 2: 验证**

Run: `npm run build`
Expected: PASS

### Task 4: 全量回归

**Files:**
- Modify: `progress.md`
- Modify: `task_plan.md`

**Step 1: 运行测试**

Run: `npm run test`
Expected: PASS

**Step 2: 运行构建**

Run: `npm run build`
Expected: PASS
