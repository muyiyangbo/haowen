import { useState } from 'react'
import './App.css'

function App() {
  const [designPrompt, setDesignPrompt] = useState('')
  const [designResult, setDesignResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [codeResult, setCodeResult] = useState(null)
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)
  const [activeFramework, setActiveFramework] = useState('react')
  const [activeTab, setActiveTab] = useState('design') // design, components, prototype
  const [components, setComponents] = useState([
    {
      id: 1,
      name: 'Header',
      category: 'Layout',
      description: '网站头部导航栏',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20website%20header%20with%20navigation%20menu&image_size=square',
      code: `<header className="header">\n  <h1>Website Title</h1>\n  <nav>\n    <ul>\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About</a></li>\n      <li><a href="#">Services</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </nav>\n</header>`
    },
    {
      id: 2,
      name: 'Hero Section',
      category: 'Layout',
      description: '网站首页英雄区',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20hero%20section%20with%20call%20to%20action&image_size=landscape_16_9',
      code: `<section className="hero">\n  <div className="hero-content">\n    <h2>Welcome to Our Website</h2>\n    <p>We provide cutting-edge solutions for your needs</p>\n    <button className="cta-button">Get Started</button>\n  </div>\n</section>`
    },
    {
      id: 3,
      name: 'Feature Cards',
      category: 'Components',
      description: '功能卡片组',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20feature%20cards%20grid%20layout&image_size=landscape_16_9',
      code: `<section className="features">\n  <div className="feature-card">\n    <h3>Feature 1</h3>\n    <p>Description of feature 1</p>\n  </div>\n  <div className="feature-card">\n    <h3>Feature 2</h3>\n    <p>Description of feature 2</p>\n  </div>\n  <div className="feature-card">\n    <h3>Feature 3</h3>\n    <p>Description of feature 3</p>\n  </div>\n</section>`
    },
    {
      id: 4,
      name: 'Footer',
      category: 'Layout',
      description: '网站页脚',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20website%20footer%20with%20links&image_size=square',
      code: `<footer className="footer">\n  <p>&copy; 2026 AI UI Assistant. All rights reserved.</p>\n  <div className="footer-links">\n    <a href="#">Privacy Policy</a>\n    <a href="#">Terms of Service</a>\n    <a href="#">Contact</a>\n  </div>\n</footer>`
    },
    {
      id: 5,
      name: 'Contact Form',
      category: 'Forms',
      description: '联系表单',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20contact%20form%20with%20inputs&image_size=square',
      code: `<form className="contact-form">\n  <div className="form-group">\n    <label htmlFor="name">Name</label>\n    <input type="text" id="name" name="name" required />\n  </div>\n  <div className="form-group">\n    <label htmlFor="email">Email</label>\n    <input type="email" id="email" name="email" required />\n  </div>\n  <div className="form-group">\n    <label htmlFor="message">Message</label>\n    <textarea id="message" name="message" rows="4" required></textarea>\n  </div>\n  <button type="submit">Send Message</button>\n</form>`
    }
  ])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [prototypeComponents, setPrototypeComponents] = useState([])
  const [prototypePreview, setPrototypePreview] = useState(false)

  const handlePreviewPrototype = () => {
    setPrototypePreview(true)
  }

  const handleClearPrototype = () => {
    setPrototypeComponents([])
  }

  const handleGenerateDesign = async () => {
    if (!designPrompt) return

    setIsGenerating(true)
    
    // 模拟AI设计生成过程
    setTimeout(() => {
      const mockDesign = {
        id: 1,
        title: 'Generated Design',
        description: designPrompt,
        preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20interface%20design%20with%20clean%20layout%20and%20blue%20color%20scheme&image_size=landscape_16_9',
        components: [
          { name: 'Header', type: 'component' },
          { name: 'Hero Section', type: 'component' },
          { name: 'Feature Cards', type: 'component' },
          { name: 'Footer', type: 'component' }
        ]
      }
      setDesignResult(mockDesign)
      setIsGenerating(false)
    }, 3000)
  }

  const handleGenerateCode = async () => {
    if (!designResult) return

    setIsGeneratingCode(true)
    
    // 模拟代码生成过程
    setTimeout(() => {
      let generatedCode = ''
      
      if (activeFramework === 'react') {
        generatedCode = `import React from 'react';\n\nconst App = () => {\n  return (\n    <div className="app">\n      <header className="header">\n        <h1>Welcome to Our Website</h1>\n        <nav>\n          <ul>\n            <li><a href="#">Home</a></li>\n            <li><a href="#">About</a></li>\n            <li><a href="#">Services</a></li>\n            <li><a href="#">Contact</a></li>\n          </ul>\n        </nav>\n      </header>\n      \n      <section className="hero">\n        <div className="hero-content">\n          <h2>${designResult.description}</h2>\n          <p>Welcome to our modern web application. We provide cutting-edge solutions for your needs.</p>\n          <button className="cta-button">Get Started</button>\n        </div>\n      </section>\n      \n      <section className="features">\n        <div className="feature-card">\n          <h3>Feature 1</h3>\n          <p>Description of feature 1</p>\n        </div>\n        <div className="feature-card">\n          <h3>Feature 2</h3>\n          <p>Description of feature 2</p>\n        </div>\n        <div className="feature-card">\n          <h3>Feature 3</h3>\n          <p>Description of feature 3</p>\n        </div>\n      </section>\n      \n      <footer className="footer">\n        <p>&copy; 2026 AI UI Assistant. All rights reserved.</p>\n      </footer>\n    </div>\n  );\n};\n\nexport default App;`
      } else if (activeFramework === 'vue') {
        generatedCode = `<template>\n  <div class="app">\n    <header class="header">\n      <h1>Welcome to Our Website</h1>\n      <nav>\n        <ul>\n          <li><a href="#">Home</a></li>\n          <li><a href="#">About</a></li>\n          <li><a href="#">Services</a></li>\n          <li><a href="#">Contact</a></li>\n        </ul>\n      </nav>\n    </header>\n    \n    <section class="hero">\n      <div class="hero-content">\n        <h2>${designResult.description}</h2>\n        <p>Welcome to our modern web application. We provide cutting-edge solutions for your needs.</p>\n        <button class="cta-button">Get Started</button>\n      </div>\n    </section>\n    \n    <section class="features">\n      <div class="feature-card">\n        <h3>Feature 1</h3>\n        <p>Description of feature 1</p>\n      </div>\n      <div class="feature-card">\n        <h3>Feature 2</h3>\n        <p>Description of feature 2</p>\n      </div>\n      <div class="feature-card">\n        <h3>Feature 3</h3>\n        <p>Description of feature 3</p>\n      </div>\n    </section>\n    \n    <footer class="footer">\n      <p>&copy; 2026 AI UI Assistant. All rights reserved.</p>\n    </footer>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App'\n} \n</script>`
      } else if (activeFramework === 'html') {
        generatedCode = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Modern Web Application</title>\n  <style>\n    /* Add your CSS here */\n    body {\n      font-family: Arial, sans-serif;\n      margin: 0;\n      padding: 0;\n    }\n    .header {\n      background-color: #2c3e50;\n      color: white;\n      padding: 20px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n    .header nav ul {\n      list-style: none;\n      display: flex;\n      gap: 20px;\n    }\n    .header nav a {\n      color: white;\n      text-decoration: none;\n    }\n    .hero {\n      background-color: #3498db;\n      color: white;\n      padding: 100px 20px;\n      text-align: center;\n    }\n    .features {\n      padding: 50px 20px;\n      display: flex;\n      gap: 20px;\n      justify-content: center;\n    }\n    .feature-card {\n      border: 1px solid #ddd;\n      padding: 20px;\n      border-radius: 8px;\n      width: 300px;\n    }\n    .footer {\n      background-color: #2c3e50;\n      color: white;\n      text-align: center;\n      padding: 20px;\n      margin-top: 50px;\n    }\n  </style>\n</head>\n<body>\n  <div class="app">\n    <header class="header">\n      <h1>Welcome to Our Website</h1>\n      <nav>\n        <ul>\n          <li><a href="#">Home</a></li>\n          <li><a href="#">About</a></li>\n          <li><a href="#">Services</a></li>\n          <li><a href="#">Contact</a></li>\n        </ul>\n      </nav>\n    </header>\n    \n    <section class="hero">\n      <div class="hero-content">\n        <h2>${designResult.description}</h2>\n        <p>Welcome to our modern web application. We provide cutting-edge solutions for your needs.</p>\n        <button class="cta-button">Get Started</button>\n      </div>\n    </section>\n    \n    <section class="features">\n      <div class="feature-card">\n        <h3>Feature 1</h3>\n        <p>Description of feature 1</p>\n      </div>\n      <div class="feature-card">\n        <h3>Feature 2</h3>\n        <p>Description of feature 2</p>\n      </div>\n      <div class="feature-card">\n        <h3>Feature 3</h3>\n        <p>Description of feature 3</p>\n      </div>\n    </section>\n    \n    <footer class="footer">\n      <p>&copy; 2026 AI UI Assistant. All rights reserved.</p>\n    </footer>\n  </div>\n</body>\n</html>`
      }
      
      setCodeResult(generatedCode)
      setIsGeneratingCode(false)
    }, 2000)
  }

  const handleCopyCode = () => {
    if (codeResult) {
      navigator.clipboard.writeText(codeResult)
        .then(() => {
          alert('代码已复制到剪贴板！');
        })
        .catch(err => {
          console.error('复制失败:', err);
        });
    }
  }

  const handleCopyComponentCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('组件代码已复制到剪贴板！');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  }

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...new Set(components.map(component => component.category))];

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI辅助UI设计工具</h1>
        <p>使用AI快速生成UI设计方案并转换为代码</p>
        
        <div className="nav-tabs">
          <button 
            className={activeTab === 'design' ? 'active' : ''}
            onClick={() => setActiveTab('design')}
          >
            AI设计生成
          </button>
          <button 
            className={activeTab === 'components' ? 'active' : ''}
            onClick={() => setActiveTab('components')}
          >
            组件库
          </button>
          <button 
            className={activeTab === 'prototype' ? 'active' : ''}
            onClick={() => setActiveTab('prototype')}
          >
            原型构建
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'design' && (
          <>
            <section className="design-input-section">
              <h2>设计需求</h2>
              <textarea
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                placeholder="请描述您的设计需求，例如：一个现代风格的登录页面，蓝色主题，包含表单和品牌标识"
                rows={5}
              />
              <button 
                onClick={handleGenerateDesign}
                disabled={isGenerating}
                className="generate-btn"
              >
                {isGenerating ? '生成中...' : '生成设计'}
              </button>
            </section>

            {designResult && (
              <section className="design-result-section">
                <h2>设计结果</h2>
                <div className="design-preview">
                  <img src={designResult.preview} alt="Design Preview" />
                </div>
                <div className="design-info">
                  <h3>{designResult.title}</h3>
                  <p>{designResult.description}</p>
                  <h4>包含组件：</h4>
                  <ul>
                    {designResult.components.map((component, index) => (
                      <li key={index}>{component.name}</li>
                    ))}
                  </ul>
                  
                  <div className="framework-selector">
                    <h4>选择框架：</h4>
                    <div className="framework-buttons">
                      <button 
                        className={activeFramework === 'react' ? 'active' : ''}
                        onClick={() => setActiveFramework('react')}
                      >
                        React
                      </button>
                      <button 
                        className={activeFramework === 'vue' ? 'active' : ''}
                        onClick={() => setActiveFramework('vue')}
                      >
                        Vue
                      </button>
                      <button 
                        className={activeFramework === 'html' ? 'active' : ''}
                        onClick={() => setActiveFramework('html')}
                      >
                        HTML/CSS
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleGenerateCode}
                    disabled={isGeneratingCode}
                    className="code-btn"
                  >
                    {isGeneratingCode ? '生成中...' : '转换为代码'}
                  </button>
                </div>
              </section>
            )}

            {codeResult && (
              <section className="code-result-section">
                <h2>代码结果</h2>
                <div className="code-container">
                  <pre><code>{codeResult}</code></pre>
                </div>
                <button 
                  onClick={handleCopyCode}
                  className="copy-btn"
                >
                  复制代码
                </button>
              </section>
            )}
          </>
        )}

        {activeTab === 'components' && (
          <section className="components-section">
            <h2>组件库</h2>
            
            <div className="components-filter">
              <div className="search-box">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索组件..."
                />
              </div>
              
              <div className="category-filter">
                <h4>分类：</h4>
                <div className="category-buttons">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={selectedCategory === category ? 'active' : ''}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="components-grid">
              {filteredComponents.map(component => (
                <div key={component.id} className="component-card" onClick={() => setSelectedComponent(component)}>
                  <div className="component-preview">
                    <img src={component.preview} alt={component.name} />
                  </div>
                  <div className="component-info">
                    <h3>{component.name}</h3>
                    <p className="component-category">{component.category}</p>
                    <p className="component-description">{component.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedComponent && (
              <div className="component-details">
                <h3>{selectedComponent.name}</h3>
                <p className="component-category">{selectedComponent.category}</p>
                <p className="component-description">{selectedComponent.description}</p>
                
                <div className="component-preview-large">
                  <img src={selectedComponent.preview} alt={selectedComponent.name} />
                </div>
                
                <div className="component-code">
                  <h4>代码：</h4>
                  <pre><code>{selectedComponent.code}</code></pre>
                  <button 
                    onClick={() => handleCopyComponentCode(selectedComponent.code)}
                    className="copy-btn"
                  >
                    复制代码
                  </button>
                </div>
                
                <button 
                  onClick={() => setSelectedComponent(null)}
                  className="close-btn"
                >
                  关闭
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'prototype' && (
          <section className="prototype-section">
            <h2>原型构建</h2>
            
            <div className="prototype-editor">
              <div className="prototype-components">
                <h3>可用组件</h3>
                <div className="component-list">
                  {components.map(component => (
                    <div 
                      key={component.id} 
                      className="prototype-component-item"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('componentId', component.id.toString());
                      }}
                    >
                      <div className="component-item-preview">
                        <img src={component.preview} alt={component.name} />
                      </div>
                      <span>{component.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="prototype-canvas" 
                onDrop={(e) => {
                  e.preventDefault();
                  const componentId = parseInt(e.dataTransfer.getData('componentId'));
                  const component = components.find(c => c.id === componentId);
                  if (component) {
                    setPrototypeComponents([...prototypeComponents, {
                      id: Date.now(),
                      componentId: component.id,
                      name: component.name,
                      position: { x: 0, y: 0 }
                    }]);
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                <h3>原型画布</h3>
                <div className="canvas-area">
                  {prototypeComponents.map(item => (
                    <div 
                      key={item.id} 
                      className="canvas-component"
                    >
                      <div className="canvas-component-header">
                        <span>{item.name}</span>
                        <button onClick={() => {
                          setPrototypeComponents(prototypeComponents.filter(c => c.id !== item.id));
                        }}>×</button>
                      </div>
                      <div className="canvas-component-content">
                        {/* 这里可以添加组件的简化预览 */}
                        <p>{item.name} 组件</p>
                      </div>
                    </div>
                  ))}
                  {prototypeComponents.length === 0 && (
                    <div className="canvas-empty">
                      <p>从左侧拖拽组件到此处开始构建原型</p>
                    </div>
                  )}
                </div>
                
                <div className="prototype-controls">
                  <button onClick={handlePreviewPrototype} className="preview-btn">
                    预览原型
                  </button>
                  <button onClick={handleClearPrototype} className="clear-btn">
                    清空画布
                  </button>
                </div>
              </div>
            </div>
            
            {prototypePreview && (
              <div className="prototype-preview">
                <h3>原型预览</h3>
                <div className="preview-content">
                  {prototypeComponents.map(item => (
                    <div key={item.id} className="preview-component">
                      <h4>{item.name}</h4>
                      <p>这是 {item.name} 组件的预览</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setPrototypePreview(false)} className="close-btn">
                  关闭预览
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>AI辅助UI设计工具 - SOLO挑战赛参赛作品</p>
      </footer>
    </div>
  )
}

export default App