---
name: app-replication-rebuild
description: This skill should be used when the user wants to replicate, rebuild, or modernize an existing desktop application with comprehensive UI/UX upgrades. It provides a complete PDCA (Plan-Do-Check-Act) workflow for project analysis, architecture redesign, UI specification creation, high-fidelity page generation, and documentation delivery. Triggers on requests like "复刻项目", "重构应用", "升级UI", "项目解析", "高保真出图", or when working with Electron/Vue/React desktop apps that need modernization.
---

# App Replication Rebuild

## Overview

This skill enables comprehensive replication and modernization of existing desktop applications. It follows a strict PDCA (Plan-Do-Check-Act) methodology to analyze, redesign, and rebuild applications with modern UI/UX standards.

The skill is designed for:
- **Desktop applications** (Electron, Tauri, WPF, etc.)
- **Web applications** requiring UI modernization
- **Legacy system** reconstruction projects
- **Full-stack** application rebuilds

## Workflow Decision Tree

```
┌─────────────────────────────────────────────────────────────────┐
│                    项目复刻重构流程                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PLAN (规划阶段)                                              │
│     ├─ 项目全量解析 → 输出技术栈、目录结构、痛点分析              │
│     ├─ 需求分析定位 → 输出功能清单、用户画像、需求文档            │
│     └─ 架构设计 → 输出分层架构、目录规范、接口定义               │
│                                                                 │
│  2. DESIGN (设计阶段)                                            │
│     ├─ UI设计规范 → 输出色彩、字体、组件、交互规范               │
│     └─ 高保真出图 → 输出核心页面HTML预览文件                     │
│                                                                 │
│  3. DO (执行阶段)                                                │
│     ├─ 项目初始化 → 搭建标准化目录结构                           │
│     ├─ 核心功能复刻 → 按模块实现业务逻辑                         │
│     └─ UI界面接入 → 应用设计系统、统一视觉风格                   │
│                                                                 │
│  4. CHECK (检查阶段)                                             │
│     ├─ 功能完整性验证 → 对照需求清单检查                         │
│     ├─ UI一致性检查 → 验证设计规范执行情况                       │
│     └─ 性能代码检查 → 优化冗余、提升性能                         │
│                                                                 │
│  5. ACT (处理阶段)                                               │
│     ├─ 问题修复 → 解决检查阶段发现的问题                         │
│     ├─ UI精修 → 细节优化、体验提升                               │
│     └─ 交付汇总 → 生成总汇总HTML文件                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Plan - Project Analysis

### 1.1 Project Full Analysis (项目全量解析)

Analyze the existing application comprehensively:

**Directory Structure Analysis:**
```bash
# Traverse and document all files, folders, configurations
# Identify: entry points, source code, resources, dependencies
```

**Output Document Structure:**
```markdown
# 01-项目全量解析.md

## 1. 项目基本信息
- 应用名称、版本、类型
- 技术栈识别
- 运行环境要求

## 2. 目录结构分析
```
[Directory tree with annotations]
```

## 3. 功能模块梳理
| 模块 | 功能描述 | 文件位置 | 依赖关系 |

## 4. 数据流向分析
[Data flow diagrams]

## 5. 痛点与问题
- UI老旧问题
- 交互体验问题
- 性能瓶颈
- 代码冗余
```

### 1.2 Requirements Analysis (需求分析与定位)

Define the target state of the rebuilt application:

**Core Functionality Preservation:**
- List all features to keep
- Prioritize by user value
- Document business logic

**Module Elimination:**
- Identify deprecated features
- Remove redundant functionality
- Simplify complex workflows

**New Custom Requirements:**
- Modern UI patterns
- Enhanced user experience
- New platform adaptations

**Output:** `02-需求分析与定位.md`

### 1.3 Architecture Design (架构设计)

Design the new application architecture:

**Layered Architecture:**
```
┌─────────────────────────────────────┐
│        表现层 (Presentation)         │  ← UI Components, Pages
├─────────────────────────────────────┤
│        业务层 (Business Logic)       │  ← Stores, Services, Composables
├─────────────────────────────────────┤
│        数据层 (Data Layer)           │  ← API Clients, Storage
├─────────────────────────────────────┤
│        通信层 (Communication)        │  ← IPC, Event Bus, WebSocket
├─────────────────────────────────────┤
│        工具层 (Utils)                │  ← Helpers, Constants
└─────────────────────────────────────┘
```

**Standardized Directory Structure:**
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── layout/         # Layout components
│   └── features/       # Feature-specific components
├── views/              # Page-level components
├── stores/             # State management (Pinia/Vuex)
├── services/           # Business logic services
├── composables/        # Vue composables
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── styles/             # Global styles
```

**Output:** `03-架构设计.md`

## Phase 2: Design - UI/UX Specification

### 2.1 UI Design System (UI设计规范)

Create a comprehensive design system:

**Color Palette:**
```css
/* Primary Brand Colors */
--primary-500: #8b5cf6;    /* 主色 - 紫罗兰 */
--primary-600: #7c3aed;
--primary-700: #6d28d9;

/* Secondary Colors */
--secondary-500: #06b6d4;  /* 辅助色 - 青色 */

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Background */
--bg-primary: #111118;
--bg-secondary: #1a1a24;
--bg-tertiary: #252532;

/* Text */
--text-primary: rgba(255, 255, 255, 0.9);
--text-secondary: rgba(255, 255, 255, 0.6);
--text-tertiary: rgba(255, 255, 255, 0.4);
```

**Typography:**
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Type Scale */
--text-h1: 2.5rem (40px)     /* 页面标题 */
--text-h2: 1.5rem (24px)     /* 区块标题 */
--text-h3: 1.25rem (20px)    /* 卡片标题 */
--text-body: 1rem (16px)     /* 正文 */
--text-small: 0.875rem (14px) /* 辅助文字 */
--text-xs: 0.75rem (12px)    /* 标签 */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Spacing System:**
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
```

**Component Styles:**

1. **Glass Card (玻璃卡片)**
```css
.glass-card {
    background: rgba(17, 17, 24, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
}
```

2. **Primary Button**
```css
.btn-primary {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3);
}
.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}
```

3. **Badge/Tag**
```css
.badge {
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
}
.badge-primary {
    background: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    border: 1px solid rgba(139, 92, 246, 0.3);
}
```

**Output:** `04-UI设计规范.md`

### 2.2 High-Fidelity Page Generation (高保真出图)

Generate HTML pages for all core screens:

**Required Pages:**
1. **Dashboard/首页** - Main application dashboard
2. **Chat/对话页** - Primary interaction interface
3. **Settings/设置页** - User preferences and configuration
4. **Login/登录页** - Authentication interface
5. **Modals/弹窗组件** - Dialogs, toasts, loading states

**Page Structure Template:**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Page Name] - [App Name]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Design System CSS Variables */
        :root {
            --primary: #8b5cf6;
            --secondary: #06b6d4;
            --bg: #111118;
            /* ... */
        }
        /* Component Styles */
        .glass-card { /* ... */ }
        .btn-primary { /* ... */ }
        /* Animations */
        @keyframes fadeIn { /* ... */ }
    </style>
</head>
<body class="bg-[#111118] text-white">
    <!-- Page Content -->
</body>
</html>
```

**Output Location:** `output/pages/`

## Phase 3: Do - Implementation

### 3.1 Project Initialization

Set up the standardized project structure:

```bash
# Create output directory structure
mkdir -p output/{pages,docs,assets}
```

### 3.2 Core Function Replication

Implement business logic following the architecture design:

1. **Data Layer First** - Set up API clients and storage
2. **Business Logic** - Implement services and stores
3. **Presentation Layer** - Build components and views

### 3.3 UI Integration

Apply the design system consistently:

1. **Global Styles** - Set up CSS variables and base styles
2. **Component Library** - Build reusable components
3. **Page Implementation** - Assemble pages using components

## Phase 4: Check - Verification

### 4.1 Functional Completeness

Verify against requirements document:

- [ ] All core features implemented
- [ ] Business logic correctly replicated
- [ ] Data flow working as expected
- [ ] Edge cases handled

### 4.2 UI Consistency Check

Verify design system compliance:

- [ ] Colors match specification
- [ ] Typography consistent
- [ ] Spacing uniform
- [ ] Components styled correctly
- [ ] Animations smooth

### 4.3 Code Quality Check

Review for best practices:

- [ ] No code duplication
- [ ] Proper TypeScript types
- [ ] Performance optimized
- [ ] Accessibility considered

## Phase 5: Act - Delivery

### 5.1 Issue Resolution

Address findings from Check phase:

1. Document issues found
2. Prioritize by severity
3. Implement fixes
4. Re-verify

### 5.2 UI Refinement

Polish the user experience:

1. Micro-interactions
2. Loading states
3. Error handling UI
4. Responsive adjustments

### 5.3 Final Delivery

Create comprehensive delivery package:

**Output Structure:**
```
output/
├── index.html              # Master summary page
├── pages/
│   ├── 01-[page-name].html
│   ├── 02-[page-name].html
│   └── ...
└── docs/
    ├── 01-项目全量解析.md
    ├── 02-需求分析与定位.md
    ├── 03-架构设计.md
    ├── 04-UI设计规范.md
    └── 05-开发计划.md
```

**Master Summary Page (index.html):**
- Project overview
- Quick links to all pages
- Documentation access
- Design system showcase
- Delivery checklist

## Development Plan Template

**Output:** `05-开发计划.md`

```markdown
# 开发计划

## 时间线

| 阶段 | 周期 | 主要任务 | 交付物 |
|------|------|----------|--------|
| Phase 1 | Week 1-2 | 架构搭建 | 项目框架、基础组件 |
| Phase 2 | Week 3-4 | 核心功能 | 业务逻辑实现 |
| Phase 3 | Week 5-6 | UI优化 | 视觉升级、动画 |
| Phase 4 | Week 7-8 | 测试交付 | 测试修复、文档 |

## 任务分解

### Week 1
- [ ] Day 1-2: 项目初始化
- [ ] Day 3-4: 目录重构
- [ ] Day 5: 基础组件

### Week 2
- [ ] Day 1-2: 样式系统
- [ ] Day 3-5: 架构验证

## 风险管理

| 风险 | 影响 | 应对措施 |
|------|------|----------|
| 需求变更 | 高 | 严格变更控制流程 |
| 技术难点 | 中 | 技术预研、专家咨询 |
```

## Usage Examples

### Example 1: Complete Application Rebuild

**User Request:**
> "基于我本地应用目录完成完整项目解析、复刻开发、UI视觉升级、高保真出图、HTML交付"

**Execution:**
1. Run Phase 1: Analyze existing application
2. Run Phase 2: Create design system and generate pages
3. Run Phase 3: Implement core functionality
4. Run Phase 4: Verify and check
5. Run Phase 5: Deliver final package

### Example 2: UI Modernization Only

**User Request:**
> "帮我升级这个老旧应用的UI，要现代化的设计"

**Execution:**
1. Analyze current UI pain points
2. Create modern design system
3. Generate high-fidelity mockups
4. Deliver HTML previews

### Example 3: Architecture Redesign

**User Request:**
> "重构这个项目的架构，要清晰的分层"

**Execution:**
1. Analyze current architecture
2. Design layered architecture
3. Define interfaces between layers
4. Create migration plan

## Resources

### References
- `references/pdca-workflow.md` - Detailed PDCA methodology
- `references/ui-patterns.md` - Common UI patterns for desktop apps
- `references/electron-best-practices.md` - Electron-specific guidelines

### Assets
- `assets/html-template/` - Starter HTML template with design system
- `assets/component-snippets/` - Reusable component code snippets

### Scripts
- `scripts/generate-pages.py` - Helper for batch page generation
- `scripts/validate-structure.py` - Validate project structure compliance

## Best Practices

1. **Always follow PDCA cycle** - Don't skip phases
2. **Document everything** - Each phase produces deliverables
3. **Validate early and often** - Check phase prevents rework
4. **Maintain consistency** - Design system applies everywhere
5. **Think in layers** - Respect architectural boundaries

## Output Checklist

Before marking project complete, verify:

- [ ] All 5 documents created in `docs/`
- [ ] All required pages created in `pages/`
- [ ] Master `index.html` summary created
- [ ] Design system consistently applied
- [ ] All pages responsive
- [ ] No broken links or references
- [ ] Code follows style guidelines
