# 📝 Kanban Board

[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/Style-CSS3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/Markup-HTML5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A simple **Kanban board** built using **HTML, CSS, and vanilla JavaScript**.  
It helps you manage tasks visually across three stages: **To Do**, **In Progress**, and **Done**.  

---

## 🌍 Live Demo
👉 [View the Kanban Board](https://akshatjain2610.github.io/kanban-board/)

---

## ✨ Features
- ➕ **Add Tasks** with title & description  
- ✏️ **Edit & Delete Tasks**  
- 🎯 **Drag & Drop** tasks between columns  
- 💾 **Persistent Storage** (localStorage support)  
- 🔢 **Task Counters** update automatically per column  
- 📱 **Responsive Layout** with clean UI  

---

## 📂 Project Structure
```yaml
kanban-board/
│── index.html         # Main UI structure
│── styles.css         # Styles for board & tasks
│── js/
│   ├── app.js         # Entry point, initializes TaskManager
│   ├── taskManager.js # Handles task CRUD & rendering
│   ├── domUtils.js    # Utility functions for DOM
│   ├── dragDrop.js    # Drag & drop functionality
│   └── storage.js     # Local storage wrapper

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board