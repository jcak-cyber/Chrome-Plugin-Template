# 构建指南

## 开发环境

### 启动开发服务器（包含热更新）

```bash
pnpm dev
```

这个命令会：

- 启动 TypeScript 编译监听
- 启动 Vite 开发构建（包含热更新）
- 启用 WebSocket 热更新服务器（端口 2333）

### 仅构建开发版本

```bash
pnpm build:dev
```

## 生产环境

### 构建生产版本（推荐）

```bash
pnpm build
```

这个命令会：

- 使用生产模式构建
- 完全排除热更新相关代码
- 启用代码压缩和优化
- 提供交互式选项（重新打包/压缩文件）

### 仅构建生产版本

```bash
pnpm build:prod
```

## 环境配置

### 开发环境配置 (env.development)

```
VITE_IS_DEV=true
VITE_MODE=development
```

### 生产环境配置 (env.production)

```
VITE_IS_DEV=false
VITE_MODE=production
```

## 热更新机制

### 开发环境

- 自动启用热更新插件
- WebSocket 服务器监听端口 2333
- 文件变化时自动重新加载
- 支持 Vue 组件热更新

### 生产环境

- 完全排除热更新代码
- 不包含 WebSocket 相关代码
- 不包含文件监听器
- 代码经过压缩和优化

## 注意事项

1. **开发时**：使用 `pnpm dev` 获得最佳开发体验
2. **打包时**：使用 `pnpm build` 确保生产环境代码纯净
3. **热更新代码**：在生产构建中会被完全排除，不会增加包体积
4. **环境变量**：通过 `__HMR_ENABLED__` 全局变量控制热更新功能
