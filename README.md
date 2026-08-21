# DB & LLM Systems

个人学习资源导航站，整理 [CMU 15-445](https://15445.courses.cs.cmu.edu/)（Introduction to Database Systems）课程资料，按学期分类存放讲座与视频入口。

本站基于 **Jekyll** 构建，页面布局与导航由模板自动生成，讲座数据以 YAML 结构化存储，新增内容无需手写 HTML。

## 本地运行

```bash
bundle install          # 首次安装依赖
bundle exec jekyll serve --livereload
```

然后访问 <http://127.0.0.1:4000>。

> 系统 Ruby 较旧（如 macOS 自带 2.6.x）时，`bundle install` 若遇到 gem 写入权限问题，可先执行 `bundle config set --local path vendor/bundle` 将依赖安装到项目目录。

## 项目结构

```
├── _config.yml          # 站点配置（标题、作者、collection 等）
├── _layouts/            # 页面布局（default / page / semester）
├── _includes/           # 头部、侧边栏、页脚片段
├── _data/
│   ├── semesters.yml    # 学期元数据（侧边栏与课程卡片自动生成）
│   └── lectures.yml     # 各学期讲座列表
├── _semesters/          # 学期页面（collection，自动生成 /lectures-*.html）
├── assets/              # 样式与脚本
├── index.html           # 主页
├── about.html           # 关于课程 / FAQ
└── lectures.html        # 讲座与视频总览
```

## 维护指南

**添加一个新学期**（以 2027 秋为例）：

1. 在 `_data/semesters.yml` 追加一条元数据（`slug` 需唯一，`url` 为页面地址）：
   ```yaml
   - slug: 2027-fall
     name: 2027秋
     en: Fall 2027
     url: /lectures-2027-fall.html
     course_url: https://15445.courses.cs.cmu.edu/fall2027/
     desc: CMU 15-445/645 Fall 2027 学期课程。
   ```
2. 新建 `_semesters/2027-fall.md`：
   ```markdown
   ---
   title: 2027秋 · CMU 15-445 数据库系统
   description: CMU 15-445/645 Fall 2027 学期课程讲座与视频入口。
   slug: 2027-fall
   permalink: /lectures-2027-fall.html
   ---
   ```
3. 在 `_data/lectures.yml` 追加该学期的讲座列表。讲座条目可选 `video: { label, url }` 字段，未提供时页面渲染为「TODO」：
   ```yaml
   - slug: 2027-fall
     items:
       - num: 01
         topic: 关系模型与代数
       - num: 02
         topic: 现代 SQL
         video:
           label: 飞书文档
           url: https://example.com/
   ```

**补全已有学期的讲座/视频**：直接编辑 `_data/lectures.yml` 中对应 `slug` 下的 `items` 即可，页面会自动更新。

## 部署

- **GitHub Pages**：推送到仓库后，在仓库 Settings → Pages 中开启即可。若部署到项目页（`username.github.io/仓库名/`），需把 `_config.yml` 中的 `baseurl` 改为 `"/仓库名"`。
- **本地静态托管**：`bundle exec jekyll build` 生成的 `_site/` 目录可直接部署到任意静态托管平台。
