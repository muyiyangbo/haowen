import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [designPrompt, setDesignPrompt] = useState('')
  const [designResult, setDesignResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [codeResult, setCodeResult] = useState(null)
  const [isGeneratingCode, setIsGeneratingCode] = useState(false)
  const [activeFramework, setActiveFramework] = useState('react')
  const [activeTab, setActiveTab] = useState('design') // design, components, prototype, templates, design-system
  const [activeScreenSize, setActiveScreenSize] = useState('desktop') // desktop, tablet, mobile
  const [showResponsivePreview, setShowResponsivePreview] = useState(false)
  const [designHistory, setDesignHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
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
    },
    {
      id: 6,
      name: 'Login Form',
      category: 'Forms',
      description: '登录表单',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20login%20form%20with%20inputs&image_size=square',
      code: `<form className="login-form">\n  <div className="form-group">\n    <label htmlFor="username">Username</label>\n    <input type="text" id="username" name="username" required />\n  </div>\n  <div className="form-group">\n    <label htmlFor="password">Password</label>\n    <input type="password" id="password" name="password" required />\n  </div>\n  <div className="form-group remember">\n    <input type="checkbox" id="remember" name="remember" />\n    <label htmlFor="remember">Remember me</label>\n  </div>\n  <button type="submit">Login</button>\n  <a href="#" className="forgot-password">Forgot password?</a>\n</form>`
    },
    {
      id: 7,
      name: 'Card',
      category: 'Components',
      description: '通用卡片组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20card%20component%20with%20image%20and%20text&image_size=square',
      code: `<div className="card">\n  <div className="card-image">\n    <img src="image.jpg" alt="Card image" />\n  </div>\n  <div className="card-content">\n    <h3>Card Title</h3>\n    <p>This is a sample card component with an image and text content.</p>\n    <button className="card-button">Learn More</button>\n  </div>\n</div>`
    },
    {
      id: 8,
      name: 'Testimonial',
      category: 'Components',
      description: '客户 testimonial',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20testimonial%20component%20with%20avatar&image_size=square',
      code: `<div className="testimonial">\n  <div className="testimonial-content">\n    <p>"This product has changed my life! I can't imagine working without it now."</p>\n  </div>\n  <div className="testimonial-author">\n    <div className="author-avatar">\n      <img src="avatar.jpg" alt="Author" />\n    </div>\n    <div className="author-info">\n      <h4>John Doe</h4>\n      <p>CEO, Example Company</p>\n    </div>\n  </div>\n</div>`
    },
    {
      id: 9,
      name: 'Pricing Table',
      category: 'Components',
      description: '价格表组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20pricing%20table%20with%20three%20plans&image_size=landscape_16_9',
      code: `<section className="pricing">\n  <div className="pricing-plan">\n    <h3>Basic</h3>\n    <div className="price">$9.99<span>/month</span></div>\n    <ul className="features">\n      <li>Feature 1</li>\n      <li>Feature 2</li>\n      <li>Feature 3</li>\n    </ul>\n    <button className="select-plan">Select Plan</button>\n  </div>\n  <div className="pricing-plan popular">\n    <h3>Pro</h3>\n    <div className="price">$19.99<span>/month</span></div>\n    <ul className="features">\n      <li>All Basic features</li>\n      <li>Feature 4</li>\n      <li>Feature 5</li>\n      <li>Priority support</li>\n    </ul>\n    <button className="select-plan">Select Plan</button>\n  </div>\n  <div className="pricing-plan">\n    <h3>Enterprise</h3>\n    <div className="price">$49.99<span>/month</span></div>\n    <ul className="features">\n      <li>All Pro features</li>\n      <li>Feature 6</li>\n      <li>Feature 7</li>\n      <li>24/7 support</li>\n    </ul>\n    <button className="select-plan">Select Plan</button>\n  </div>\n</section>`
    },
    {
      id: 10,
      name: 'FAQ Section',
      category: 'Components',
      description: '常见问题部分',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20faq%20section%20with%20expandable%20items&image_size=landscape_16_9',
      code: `<section className="faq">\n  <h2>Frequently Asked Questions</h2>\n  <div className="faq-item">\n    <button className="faq-question">What is this product?</button>\n    <div className="faq-answer">\n      <p>This product is a comprehensive solution for your needs.</p>\n    </div>\n  </div>\n  <div className="faq-item">\n    <button className="faq-question">How does it work?</button>\n    <div className="faq-answer">\n      <p>It works by providing you with the tools you need to succeed.</p>\n    </div>\n  </div>\n  <div className="faq-item">\n    <button className="faq-question">How much does it cost?</button>\n    <div className="faq-answer">\n      <p>Pricing starts at $9.99 per month.</p>\n    </div>\n  </div>\n</section>`
    },
    {
      id: 11,
      name: 'Navigation Menu',
      category: 'Navigation',
      description: '导航菜单组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20navigation%20menu%20with%20dropdown&image_size=square',
      code: `<nav className="navigation">\n  <ul className="nav-menu">\n    <li><a href="#">Home</a></li>\n    <li>\n      <a href="#">Services</a>\n      <ul className="dropdown-menu">\n        <li><a href="#">Web Design</a></li>\n        <li><a href="#">Development</a></li>\n        <li><a href="#">SEO</a></li>\n      </ul>\n    </li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>`
    },
    {
      id: 12,
      name: 'Breadcrumb',
      category: 'Navigation',
      description: '面包屑导航组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20breadcrumb%20navigation&image_size=square',
      code: `<nav className="breadcrumb">\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Products</a></li>\n    <li><a href="#">Electronics</a></li>\n    <li className="active">Smartphones</li>\n  </ul>\n</nav>`
    },
    {
      id: 13,
      name: 'Pagination',
      category: 'Navigation',
      description: '分页组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20pagination%20component&image_size=square',
      code: `<div className="pagination">\n  <a href="#" className="prev">&laquo; Previous</a>\n  <a href="#">1</a>\n  <a href="#" className="active">2</a>\n  <a href="#">3</a>\n  <a href="#">4</a>\n  <a href="#">5</a>\n  <a href="#" className="next">Next &raquo;</a>\n</div>`
    },
    {
      id: 14,
      name: 'Alert',
      category: 'Feedback',
      description: '警告框组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20alert%20notification%20component&image_size=square',
      code: `<div className="alert alert-success">\n  <span className="alert-icon">✓</span>\n  <div className="alert-content">\n    <h4>Success!</h4>\n    <p>Your action was completed successfully.</p>\n  </div>\n  <button className="alert-close">&times;</button>\n</div>\n\n<div className="alert alert-info">\n  <span className="alert-icon">i</span>\n  <div className="alert-content">\n    <h4>Info</h4>\n    <p>Here's some information for you.</p>\n  </div>\n  <button className="alert-close">&times;</button>\n</div>\n\n<div className="alert alert-warning">\n  <span className="alert-icon">!</span>\n  <div className="alert-content">\n    <h4>Warning</h4>\n    <p>Please be careful with this action.</p>\n  </div>\n  <button className="alert-close">&times;</button>\n</div>\n\n<div className="alert alert-danger">\n  <span className="alert-icon">×</span>\n  <div className="alert-content">\n    <h4>Error</h4>\n    <p>An error occurred while processing your request.</p>\n  </div>\n  <button className="alert-close">&times;</button>\n</div>`
    },
    {
      id: 15,
      name: 'Modal',
      category: 'Overlay',
      description: '模态框组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20modal%20dialog%20box&image_size=square',
      code: `<div className="modal">\n  <div className="modal-overlay"></div>\n  <div className="modal-content">\n    <div className="modal-header">\n      <h3>Modal Title</h3>\n      <button className="modal-close">&times;</button>\n    </div>\n    <div className="modal-body">\n      <p>This is the modal content. You can put any HTML here.</p>\n      <form>\n        <div className="form-group">\n          <label htmlFor="name">Name</label>\n          <input type="text" id="name" name="name" />\n        </div>\n        <div className="form-group">\n          <label htmlFor="email">Email</label>\n          <input type="email" id="email" name="email" />\n        </div>\n      </form>\n    </div>\n    <div className="modal-footer">\n      <button className="modal-btn modal-btn-secondary">Cancel</button>\n      <button className="modal-btn modal-btn-primary">Save</button>\n    </div>\n  </div>\n</div>`
    },
    {
      id: 16,
      name: 'Tabs',
      category: 'Navigation',
      description: '标签页组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tabs%20component&image_size=square',
      code: `<div className="tabs">\n  <div className="tab-buttons">\n    <button className="tab-btn active">Tab 1</button>\n    <button className="tab-btn">Tab 2</button>\n    <button className="tab-btn">Tab 3</button>\n  </div>\n  <div className="tab-content">\n    <div className="tab-pane active">\n      <h3>Tab 1 Content</h3>\n      <p>This is the content for Tab 1.</p>\n    </div>\n    <div className="tab-pane">\n      <h3>Tab 2 Content</h3>\n      <p>This is the content for Tab 2.</p>\n    </div>\n    <div className="tab-pane">\n      <h3>Tab 3 Content</h3>\n      <p>This is the content for Tab 3.</p>\n    </div>\n  </div>\n</div>`
    },
    {
      id: 17,
      name: 'Progress Bar',
      category: 'Feedback',
      description: '进度条组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20progress%20bar%20component&image_size=square',
      code: `<div className="progress">\n  <div className="progress-bar" style="width: 75%;">\n    <span className="progress-text">75%</span>\n  </div>\n</div>\n\n<div className="progress progress-success">\n  <div className="progress-bar" style="width: 60%;">\n    <span className="progress-text">60%</span>\n  </div>\n</div>\n\n<div className="progress progress-warning">\n  <div className="progress-bar" style="width: 45%;">\n    <span className="progress-text">45%</span>\n  </div>\n</div>\n\n<div className="progress progress-danger">\n  <div className="progress-bar" style="width: 30%;">\n    <span className="progress-text">30%</span>\n  </div>\n</div>`
    },
    {
      id: 18,
      name: 'Tooltip',
      category: 'Feedback',
      description: '提示框组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20tooltip%20component&image_size=square',
      code: `<div className="tooltip-container">\n  <button className="tooltip-trigger">Hover me</button>\n  <div className="tooltip">This is a tooltip</div>\n</div>\n\n<div className="tooltip-container tooltip-top">\n  <button className="tooltip-trigger">Hover me (Top)</button>\n  <div className="tooltip">This is a tooltip</div>\n</div>\n\n<div className="tooltip-container tooltip-left">\n  <button className="tooltip-trigger">Hover me (Left)</button>\n  <div className="tooltip">This is a tooltip</div>\n</div>\n\n<div className="tooltip-container tooltip-right">\n  <button className="tooltip-trigger">Hover me (Right)</button>\n  <div className="tooltip">This is a tooltip</div>\n</div>`
    },
    {
      id: 19,
      name: 'Dropdown',
      category: 'Form',
      description: '下拉菜单组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20dropdown%20menu%20component&image_size=square',
      code: `<div className="dropdown">\n  <button className="dropdown-toggle">\n    Select an option\n    <span className="dropdown-arrow">▼</span>\n  </button>\n  <div className="dropdown-menu">\n    <a href="#" className="dropdown-item">Option 1</a>\n    <a href="#" className="dropdown-item">Option 2</a>\n    <a href="#" className="dropdown-item">Option 3</a>\n    <a href="#" className="dropdown-item">Option 4</a>\n  </div>\n</div>`
    },
    {
      id: 20,
      name: 'Loading Spinner',
      category: 'Feedback',
      description: '加载动画组件',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20loading%20spinner%20animation&image_size=square',
      code: `<div className="loading-spinner">\n  <div className="spinner"></div>\n  <p>Loading...</p>\n</div>\n\n<div className="loading-spinner loading-spinner-lg">\n  <div className="spinner"></div>\n  <p>Loading...</p>\n</div>\n\n<div className="loading-spinner loading-spinner-sm">\n  <div className="spinner"></div>\n  <p>Loading...</p>\n</div>`
    }
  ])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [prototypeComponents, setPrototypeComponents] = useState([])
  const [prototypePreview, setPrototypePreview] = useState(false)
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: '现代企业官网',
      description: '适合企业展示的现代风格官网模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20website%20design%20with%20clean%20layout&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Feature Cards', 'Testimonial', 'Footer']
    },
    {
      id: 2,
      name: '电子商务网站',
      description: '适合在线购物的电商网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ecommerce%20website%20design%20with%20product%20cards&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Feature Cards', 'Pricing Table', 'Footer']
    },
    {
      id: 3,
      name: '个人作品集',
      description: '展示个人作品的作品集网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=personal%20portfolio%20website%20design%20with%20gallery&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Card', 'Testimonial', 'Footer']
    },
    {
      id: 4,
      name: '登录注册页面',
      description: '简洁的登录和注册页面模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20login%20and%20registration%20page%20design&image_size=landscape_16_9',
      components: ['Header', 'Login Form', 'Footer']
    },
    {
      id: 5,
      name: '博客网站',
      description: '适合个人或企业的博客网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20blog%20website%20design%20with%20articles&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Card', 'Pagination', 'Footer']
    },
    {
      id: 6,
      name: '作品集网站',
      description: '专业的作品集展示网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portfolio%20website%20with%20project%20gallery&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Card', 'Tabs', 'Footer']
    },
    {
      id: 7,
      name: '电子商务网站',
      description: '完整的电子商务网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=complete%20ecommerce%20website%20with%20shopping%20cart&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Feature Cards', 'Pricing Table', 'Footer']
    },
    {
      id: 8,
      name: '企业官网',
      description: '专业的企业官网模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20corporate%20website%20with%20services&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Feature Cards', 'Testimonial', 'FAQ Section', 'Footer']
    },
    {
      id: 9,
      name: '个人简历',
      description: '现代风格的个人简历网站模板',
      preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20personal%20resume%20website%20design&image_size=landscape_16_9',
      components: ['Header', 'Hero Section', 'Feature Cards', 'Testimonial', 'Footer']
    }
  ])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [designSystem, setDesignSystem] = useState({
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      accent: '#e74c3c',
      background: '#ffffff',
      text: '#333333',
      border: '#dddddd'
    },
    typography: {
      heading: 'Arial, sans-serif',
      body: 'Helvetica, Arial, sans-serif',
      size: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.5rem',
        body: '1rem'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '2rem',
      xl: '3rem'
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px'
    }
  })
  const [activeTab, setActiveTab] = useState('design') // design, components, prototype, templates, design-system

  const handlePreviewPrototype = () => {
    setPrototypePreview(true)
  }

  const handleClearPrototype = () => {
    setPrototypeComponents([])
  }

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template)
    // 这里可以根据模板生成设计
    const mockDesign = {
      id: Date.now(),
      title: template.name,
      description: template.description,
      preview: template.preview,
      components: template.components.map(name => ({ name, type: 'component' }))
    }
    setDesignResult(mockDesign)
    setActiveTab('design')
  }

  const handleGenerateDesign = async () => {
    if (!designPrompt) return

    setIsGenerating(true)
    
    // 模拟AI设计生成过程
    setTimeout(() => {
      const mockDesign = {
        id: Date.now(),
        title: 'Generated Design',
        description: designPrompt,
        preview: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20interface%20design%20with%20clean%20layout%20and%20blue%20color%20scheme&image_size=landscape_16_9',
        components: [
          { name: 'Header', type: 'component' },
          { name: 'Hero Section', type: 'component' },
          { name: 'Feature Cards', type: 'component' },
          { name: 'Footer', type: 'component' }
        ],
        timestamp: new Date().toISOString()
      }
      setDesignResult(mockDesign)
      
      // 添加到历史记录
      setDesignHistory(prevHistory => [mockDesign, ...prevHistory])
      
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

  const handleExportDesign = () => {
    if (!designResult) return;

    // 显示导出选项
    const exportOption = prompt('请选择导出格式:\n1. HTML\n2. PNG\n3. JSON', '1');

    if (exportOption === '1') {
      // 导出为HTML
      handleExportAsHTML();
    } else if (exportOption === '2') {
      // 导出为PNG
      handleExportAsPNG();
    } else if (exportOption === '3') {
      // 导出为JSON
      handleExportAsJSON();
    }
  }

  const handleExportAsHTML = () => {
    if (!designResult) return;

    // 生成HTML代码
    const htmlCode = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${designResult.title}</title>
  <style>
    body {
      font-family: ${designSystem.typography.body};
      margin: 0;
      padding: 0;
      background-color: ${designSystem.colors.background};
      color: ${designSystem.colors.text};
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      font-family: ${designSystem.typography.heading};
    }
    h1 {
      font-size: ${designSystem.typography.size.h1};
    }
    h2 {
      font-size: ${designSystem.typography.size.h2};
    }
    h3 {
      font-size: ${designSystem.typography.size.h3};
    }
    .button {
      background-color: ${designSystem.colors.primary};
      color: white;
      border: none;
      padding: ${designSystem.spacing.sm} ${designSystem.spacing.md};
      border-radius: ${designSystem.borderRadius.sm};
      cursor: pointer;
    }
    .button:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${designResult.title}</h1>
    <p>${designResult.description}</p>
    <h2>设计预览</h2>
    <img src="${designResult.preview}" alt="${designResult.title}" style="max-width: 100%; height: auto;">
    <h2>包含组件</h2>
    <ul>
      ${designResult.components.map(component => `<li>${component.name}</li>`).join('')}
    </ul>
  </div>
</body>
</html>`;

    // 创建并下载HTML文件
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${designResult.title.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('HTML导出成功！');
  }

  const handleExportAsPNG = () => {
    if (!designResult) return;

    // 创建图片元素
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = designResult.preview;

    img.onload = () => {
      // 创建画布
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      // 绘制图片
      ctx.drawImage(img, 0, 0);
      
      // 转换为PNG并下载
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${designResult.title.replace(/\s+/g, '-').toLowerCase()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('PNG导出成功！');
      }, 'image/png');
    };

    img.onerror = () => {
      alert('导出PNG失败：无法加载图片');
    };
  }

  const handleExportAsJSON = () => {
    if (!designResult) return;

    // 生成JSON数据
    const designData = {
      ...designResult,
      designSystem,
      timestamp: new Date().toISOString()
    };

    const jsonString = JSON.stringify(designData, null, 2);

    // 创建并下载JSON文件
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${designResult.title.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('JSON导出成功！');
  }

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', ...new Set(components.map(component => component.category))];

  // 处理页面加载
  useEffect(() => {
    // 模拟页面加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // 处理滚动事件
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 滚动到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 页面加载动画 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>加载中...</p>
          </div>
        </div>
      )}
      
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
          <button 
            className={activeTab === 'templates' ? 'active' : ''}
            onClick={() => setActiveTab('templates')}
          >
            模板库
          </button>
          <button 
            className={activeTab === 'design-system' ? 'active' : ''}
            onClick={() => setActiveTab('design-system')}
          >
            设计系统
          </button>
          <button 
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            设计历史
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
                  
                  <button 
                    onClick={() => setShowResponsivePreview(!showResponsivePreview)}
                    className="preview-btn"
                  >
                    {showResponsivePreview ? '关闭响应式预览' : '响应式预览'}
                  </button>
                  
                  <button 
                    onClick={handleExportDesign}
                    className="export-btn"
                  >
                    导出设计
                  </button>
                </div>
                
                {showResponsivePreview && (
                  <div className="responsive-preview">
                    <h4>响应式设计预览</h4>
                    <div className="screen-size-selector">
                      <button 
                        className={activeScreenSize === 'desktop' ? 'active' : ''}
                        onClick={() => setActiveScreenSize('desktop')}
                      >
                        桌面端
                      </button>
                      <button 
                        className={activeScreenSize === 'tablet' ? 'active' : ''}
                        onClick={() => setActiveScreenSize('tablet')}
                      >
                        平板端
                      </button>
                      <button 
                        className={activeScreenSize === 'mobile' ? 'active' : ''}
                        onClick={() => setActiveScreenSize('mobile')}
                      >
                        移动端
                      </button>
                    </div>
                    <div className={`preview-container ${activeScreenSize}`}>
                      <img src={designResult.preview} alt="Responsive Preview" />
                    </div>
                  </div>
                )}
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

        {activeTab === 'templates' && (
          <section className="templates-section">
            <h2>模板库</h2>
            <p>选择一个预设模板快速开始您的设计</p>
            
            <div className="templates-grid">
              {templates.map(template => (
                <div key={template.id} className="template-card">
                  <div className="template-preview">
                    <img src={template.preview} alt={template.name} />
                  </div>
                  <div className="template-info">
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>
                    <div className="template-components">
                      <h4>包含组件：</h4>
                      <div className="component-tags">
                        {template.components.map((component, index) => (
                          <span key={index} className="component-tag">{component}</span>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleUseTemplate(template)}
                      className="use-template-btn"
                    >
                      使用此模板
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'design-system' && (
          <section className="design-system-section">
            <h2>设计系统</h2>
            <p>管理您的设计系统，包括颜色、字体、间距等</p>
            
            <div className="design-system-tabs">
              <button className="active">颜色</button>
              <button>字体</button>
              <button>间距</button>
              <button>边框圆角</button>
            </div>
            
            <div className="design-system-content">
              <div className="colors-section">
                <h3>颜色管理</h3>
                <div className="colors-grid">
                  {Object.entries(designSystem.colors).map(([key, value]) => (
                    <div key={key} className="color-item">
                      <div 
                        className="color-preview" 
                        style={{ backgroundColor: value }}
                      ></div>
                      <div className="color-info">
                        <span className="color-name">{key}</span>
                        <span className="color-value">{value}</span>
                        <input 
                          type="color" 
                          value={value} 
                          onChange={(e) => {
                            setDesignSystem({
                              ...designSystem,
                              colors: {
                                ...designSystem.colors,
                                [key]: e.target.value
                              }
                            })
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="typography-section" style={{ display: 'none' }}>
                <h3>字体管理</h3>
                <div className="typography-settings">
                  <div className="setting-item">
                    <label>标题字体：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.heading}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            heading: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="setting-item">
                    <label>正文字体：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.body}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            body: e.target.value
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="setting-item">
                    <label>H1 字体大小：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.size.h1}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            size: {
                              ...designSystem.typography.size,
                              h1: e.target.value
                            }
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="setting-item">
                    <label>H2 字体大小：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.size.h2}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            size: {
                              ...designSystem.typography.size,
                              h2: e.target.value
                            }
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="setting-item">
                    <label>H3 字体大小：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.size.h3}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            size: {
                              ...designSystem.typography.size,
                              h3: e.target.value
                            }
                          }
                        })
                      }}
                    />
                  </div>
                  <div className="setting-item">
                    <label>正文字体大小：</label>
                    <input 
                      type="text" 
                      value={designSystem.typography.size.body}
                      onChange={(e) => {
                        setDesignSystem({
                          ...designSystem,
                          typography: {
                            ...designSystem.typography,
                            size: {
                              ...designSystem.typography.size,
                              body: e.target.value
                            }
                          }
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="spacing-section" style={{ display: 'none' }}>
                <h3>间距管理</h3>
                <div className="spacing-settings">
                  {Object.entries(designSystem.spacing).map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label>{key.toUpperCase()} 间距：</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => {
                          setDesignSystem({
                            ...designSystem,
                            spacing: {
                              ...designSystem.spacing,
                              [key]: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-radius-section" style={{ display: 'none' }}>
                <h3>边框圆角管理</h3>
                <div className="border-radius-settings">
                  {Object.entries(designSystem.borderRadius).map(([key, value]) => (
                    <div key={key} className="setting-item">
                      <label>{key.toUpperCase()} 圆角：</label>
                      <input 
                        type="text" 
                        value={value}
                        onChange={(e) => {
                          setDesignSystem({
                            ...designSystem,
                            borderRadius: {
                              ...designSystem.borderRadius,
                              [key]: e.target.value
                            }
                          })
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'history' && (
          <section className="history-section">
            <h2>设计历史</h2>
            <p>查看您的设计历史记录</p>
            
            {designHistory.length === 0 ? (
              <div className="history-empty">
                <p>暂无设计历史记录</p>
                <p>生成设计后会自动添加到历史记录中</p>
              </div>
            ) : (
              <div className="history-grid">
                {designHistory.map((design) => (
                  <div key={design.id} className="history-card">
                    <div className="history-preview">
                      <img src={design.preview} alt={design.title} />
                    </div>
                    <div className="history-info">
                      <h3>{design.title}</h3>
                      <p className="history-description">{design.description}</p>
                      <p className="history-date">
                        {new Date(design.timestamp).toLocaleString()}
                      </p>
                      <div className="history-components">
                        <h4>包含组件：</h4>
                        <div className="component-tags">
                          {design.components.map((component, index) => (
                            <span key={index} className="component-tag">{component.name}</span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setDesignResult(design);
                          setActiveTab('design');
                        }}
                        className="view-design-btn"
                      >
                        查看设计
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>AI辅助UI设计工具 - SOLO挑战赛参赛作品</p>
      </footer>
      
      {/* 滚动到顶部按钮 */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="滚动到顶部"
        >
          ↑
        </button>
      )}
    </div>
    </>)
}

export default App