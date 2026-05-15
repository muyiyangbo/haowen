# UI Patterns for Desktop Applications

## Layout Patterns

### Three-Column Layout (三栏布局)

**Use Case:** Chat applications, IDEs, email clients

```
┌─────────┬──────────────────────────┬─────────┐
│         │                          │         │
│ Sidebar │      Main Content        │  Panel  │
│  250px  │       (flexible)         │  300px  │
│         │                          │         │
├─────────┤                          ├─────────┤
│         │                          │         │
│  Nav    │                          │ Context │
│         │                          │  Info   │
│         │                          │         │
└─────────┴──────────────────────────┴─────────┘
```

**Implementation:**
```html
<div class="flex h-screen">
    <aside class="w-64 flex-shrink-0">Sidebar</aside>
    <main class="flex-1 min-w-0">Main Content</main>
    <aside class="w-80 flex-shrink-0">Right Panel</aside>
</div>
```

### Dashboard Grid (仪表盘网格)

**Use Case:** Analytics dashboards, admin panels

```
┌─────────────────────────────────────────────┐
│  Header / Stats Row                          │
├──────────┬──────────┬──────────┬────────────┤
│  Stat 1  │  Stat 2  │  Stat 3  │   Stat 4   │
├──────────┴──────────┴──────────┴────────────┤
│                                             │
│           Main Chart / Content              │
│                                             │
├─────────────────────┬───────────────────────┤
│                     │                       │
│    Recent Activity  │     Quick Actions     │
│                     │                       │
└─────────────────────┴───────────────────────┘
```

**Implementation:**
```html
<div class="grid grid-cols-4 gap-4 mb-6">
    <div class="stat-card">...</div>
    <div class="stat-card">...</div>
    <div class="stat-card">...</div>
    <div class="stat-card">...</div>
</div>
<div class="grid grid-cols-3 gap-4">
    <div class="col-span-2">Main Content</div>
    <div>Side Panel</div>
</div>
```

### Settings Layout (设置页布局)

**Use Case:** Preferences, configuration pages

```
┌─────────────────────────────────────────────┐
│  Settings Header                             │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   Category 1     │                          │
│   ───────────    │    Settings Form         │
│   Category 2     │                          │
│   ───────────    │    [Field 1]             │
│   Category 3     │    [Field 2]             │
│   ───────────    │    [Field 3]             │
│   Category 4     │                          │
│                  │    [Save Button]         │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

## Component Patterns

### Glass Card (玻璃卡片)

**Visual Style:** Modern, translucent, depth effect

```css
.glass-card {
    background: rgba(17, 17, 24, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
}
```

**Usage:**
- Modal dialogs
- Cards and panels
- Navigation bars
- Floating elements

### Gradient Button (渐变按钮)

**Visual Style:** Vibrant, modern, call-to-action

```css
.btn-gradient {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3);
}
.btn-gradient:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
}
```

### Status Badge (状态徽章)

**Variants:**

```css
/* Primary */
.badge-primary {
    background: rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    border: 1px solid rgba(139, 92, 246, 0.3);
}

/* Success */
.badge-success {
    background: rgba(16, 185, 129, 0.2);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Warning */
.badge-warning {
    background: rgba(245, 158, 11, 0.2);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Error */
.badge-error {
    background: rgba(239, 68, 68, 0.2);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.3);
}
```

### Input Field with Icon (图标输入框)

```html
<div class="relative">
    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" ...>
        <!-- Icon -->
    </svg>
    <input 
        type="text" 
        class="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50"
        placeholder="Placeholder text"
    >
</div>
```

## Navigation Patterns

### Vertical Navigation (垂直导航)

```
┌─────────────────┐
│     Logo        │
├─────────────────┤
│  ○ Dashboard    │
│  ○ Chat         │
│  ○ Settings     │
├─────────────────┤
│  ○ Profile      │
└─────────────────┘
```

**Active State:**
```css
.nav-item {
    padding: 10px 16px;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.6);
    transition: all 0.2s ease;
}
.nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
}
.nav-item.active {
    background: rgba(139, 92, 246, 0.15);
    color: #a78bfa;
}
```

### Horizontal Tabs (水平标签页)

```css
.tab-list {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.tab {
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.5);
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
}
.tab:hover {
    color: rgba(255, 255, 255, 0.8);
}
.tab.active {
    color: #a78bfa;
    border-bottom-color: #8b5cf6;
}
```

## Feedback Patterns

### Toast Notification (轻提示)

```javascript
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

```css
.toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 12px 20px;
    border-radius: 8px;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
}
.toast.show {
    transform: translateY(0);
    opacity: 1;
}
.toast-success {
    background: rgba(16, 185, 129, 0.9);
    color: white;
}
```

### Loading States (加载状态)

**Skeleton Loading:**
```html
<div class="skeleton w-full h-4 rounded bg-white/10 animate-pulse"></div>
```

**Spinner:**
```html
<div class="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
```

**Typing Indicator:**
```html
<div class="flex items-center gap-1">
    <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce"></span>
    <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style="animation-delay: 0.1s"></span>
    <span class="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style="animation-delay: 0.2s"></span>
</div>
```

## Modal Patterns

### Confirmation Dialog (确认对话框)

```html
<div class="modal-overlay">
    <div class="glass-card modal-content max-w-md">
        <div class="flex items-start gap-4">
            <div class="warning-icon">
                <svg>...</svg>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-white mb-2">确认删除？</h3>
                <p class="text-white/60 text-sm mb-6">此操作无法撤销。</p>
                <div class="flex gap-3 justify-end">
                    <button class="btn-secondary">取消</button>
                    <button class="btn-danger">删除</button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Slide-over Panel (侧滑面板)

```css
.slide-over {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    background: var(--bg-secondary);
    transform: translateX(100%);
    transition: transform 0.3s ease;
}
.slide-over.open {
    transform: translateX(0);
}
```

## Data Display Patterns

### Data Table (数据表格)

```html
<table class="w-full">
    <thead class="border-b border-white/10">
        <tr>
            <th class="text-left py-3 px-4 text-white/50 font-medium">Name</th>
            <th class="text-left py-3 px-4 text-white/50 font-medium">Status</th>
            <th class="text-left py-3 px-4 text-white/50 font-medium">Date</th>
        </tr>
    </thead>
    <tbody>
        <tr class="border-b border-white/5 hover:bg-white/5">
            <td class="py-3 px-4 text-white">Item 1</td>
            <td class="py-3 px-4"><span class="badge badge-success">Active</span></td>
            <td class="py-3 px-4 text-white/60">2024-01-01</td>
        </tr>
    </tbody>
</table>
```

### Empty State (空状态)

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-white/30">...</svg>
    </div>
    <h3 class="text-white font-medium mb-2">暂无数据</h3>
    <p class="text-white/50 text-sm mb-4">开始创建您的第一个项目</p>
    <button class="btn-primary">创建项目</button>
</div>
```

## Animation Patterns

### Page Transitions (页面过渡)

```css
.page-enter {
    opacity: 0;
    transform: translateY(20px);
}
.page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.3s ease;
}
.page-exit {
    opacity: 1;
}
.page-exit-active {
    opacity: 0;
    transition: opacity 0.2s ease;
}
```

### Hover Effects (悬停效果)

```css
.hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.hover-glow {
    transition: box-shadow 0.2s ease;
}
.hover-glow:hover {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

### Stagger Animation (交错动画)

```css
.stagger-item {
    opacity: 0;
    transform: translateY(20px);
    animation: staggerIn 0.3s ease forwards;
}
.stagger-item:nth-child(1) { animation-delay: 0.05s; }
.stagger-item:nth-child(2) { animation-delay: 0.1s; }
.stagger-item:nth-child(3) { animation-delay: 0.15s; }
.stagger-item:nth-child(4) { animation-delay: 0.2s; }

@keyframes staggerIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

## Responsive Patterns

### Breakpoints

```css
/* Mobile First Approach */
/* Base styles for mobile */

/* Tablet */
@media (min-width: 768px) {
    /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
    /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1280px) {
    /* Large desktop styles */
}
```

### Responsive Sidebar

```css
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
}

@media (min-width: 1024px) {
    .sidebar {
        position: relative;
        transform: translateX(0);
    }
}

.sidebar.open {
    transform: translateX(0);
}
```

## Accessibility Patterns

### Focus States

```css
/* Visible focus indicator */
button:focus-visible,
input:focus-visible,
a:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
}

/* Skip to main content */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #8b5cf6;
    color: white;
    padding: 8px;
    z-index: 100;
}
.skip-link:focus {
    top: 0;
}
```

### ARIA Labels

```html
<button aria-label="Close dialog">
    <svg aria-hidden="true">...</svg>
</button>

<nav aria-label="Main navigation">
    <!-- Navigation items -->
</nav>

<div role="alert" aria-live="polite">
    <!-- Alert message -->
</div>
```
