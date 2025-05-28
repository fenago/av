# 🎓 LearningScience.ai - The Future of Educational Technology

<div align="center">

![LearningScience.ai Logo](./app/icon.png)

**Revolutionizing Education with AI-Powered Teaching Tools**

*Where professors meet their digital teaching assistant and students discover personalized learning*

[![Next.js](https://img.shields.io/badge/Next.js-14.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

</div>

## 🚀 What Makes LearningScience.ai Special?

**LearningScience.ai** isn't just another educational platform—it's a comprehensive ecosystem that transforms how educators teach and students learn. Powered by **DrLeeGPT**, our specialized AI assistant, we bridge the gap between traditional teaching methods and cutting-edge artificial intelligence.

### 🎯 **For Professors**: Your Digital Teaching Companion
- **Save 15+ hours per week** on content creation and grading
- **Generate culturally relevant examples** that resonate with diverse student populations
- **Create engaging multimedia content** from podcasts to interactive materials
- **Integrate seamlessly** with your existing Google Workspace workflow

### 🌟 **For Students**: Personalized Learning at Scale
- **Chat with your course materials** for instant comprehension
- **Learn in your preferred style** with AI-adapted content delivery
- **Get 24/7 support** from an AI tutor that never sleeps
- **Access multimedia learning** through generated videos and podcasts

---

## 🛠️ 19 Powerful Educational Applications

Our platform features a comprehensive suite of **19 specialized educational tools**, each designed to address specific teaching and learning challenges:

### 📚 **Content Creation Suite**
- **Write Your Own Textbook**: AI-powered textbook creation tailored to your curriculum
- **Create Teaching Materials**: Generate lesson plans, worksheets, and assessments
- **Lesson to Podcast**: Transform written content into engaging audio experiences
- **Native Image Generation**: Create custom educational visuals and diagrams

### 🎥 **Multimedia Learning Tools**
- **Video Generation**: Convert lessons into professional educational videos
- **Talk to Your Materials**: Interactive AI conversations with course content
- **ChatterBots**: Customizable AI tutors for specific subjects

### 💬 **Interactive AI Assistants**
- **Chat with DrLeeGPT**: Direct access to our specialized educational AI
- **DrLeeGPT Live**: Real-time AI assistance during lectures and office hours
- **Tiny Cats Explain**: Fun, engaging explanations for complex concepts

### 🔧 **Integration & Automation**
- **Google Workspace Integration**: Seamless workflow with your existing tools
- **Assignment Creation & Grading**: Automated assessment generation and evaluation
- **Student Progress Tracking**: AI-powered analytics and insights

*And 8 more powerful tools designed to enhance every aspect of the educational experience!*

---

## 🏗️ Technology Stack

### **Frontend Architecture**
```
Next.js 14.1.4 (App Router)  →  Modern React framework with server-side rendering
React 18.2.0                →  Component-based UI development
TypeScript 5.4.3            →  Type-safe development experience
Tailwind CSS 3.4.3          →  Utility-first styling framework
DaisyUI 4.10.1              →  Beautiful, accessible UI components
```

### **Backend & Database**
```
Next.js API Routes          →  Serverless backend functionality
MongoDB Atlas               →  Cloud-native document database
Mongoose 7.6.10             →  Elegant MongoDB object modeling
NextAuth.js 4.24.7          →  Complete authentication solution
```

### **AI & Integration Services**
```
OpenAI Integration          →  GPT-powered educational assistance
Stripe 13.11.0              →  Secure payment processing
Resend 4.0.1                →  Reliable email delivery
React Hot Toast 2.4.1      →  Beautiful notification system
```

### **Development & Quality**
```
ESLint 8.47.0               →  Code quality and consistency
Autoprefixer 10.4.19        →  CSS vendor prefixing
PostCSS 8.4.38              →  CSS processing and optimization
Zod 3.22.4                  →  Runtime type validation
```

---

## ⚡ Quick Start Guide

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- MongoDB Atlas account (free tier available)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/learningscience-ai.git
   cd learningscience-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.sample .env
   # Add your API keys and database credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🎨 Features & Benefits

### **🔐 Enterprise-Grade Security**
- Google OAuth integration
- Magic link authentication
- Secure session management
- GDPR-compliant data handling

### **💳 Flexible Monetization**
- 4-tier pricing structure
- Stripe-powered payments
- Subscription management
- Usage-based billing options

### **📊 Analytics & Insights**
- Student engagement tracking
- Learning outcome analytics
- Professor productivity metrics
- Custom reporting dashboard

### **🌍 Global Accessibility**
- Mobile-responsive design
- Multi-language support
- Accessibility-first development
- Cross-browser compatibility

---

## 📁 Project Structure

```
LearningScience.ai/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes and endpoints
│   ├── (auth)/            # Authentication pages
│   └── page.tsx           # Main landing page
├── components/            # Reusable React components
│   ├── Apps.tsx          # Educational apps carousel
│   ├── Hero.tsx          # Landing page hero section
│   ├── Pricing.tsx       # Pricing tiers display
│   └── FAQ.tsx           # Frequently asked questions
├── libs/                  # Utility libraries and configs
├── models/               # MongoDB/Mongoose schemas
├── DevDocs/              # Development documentation
└── public/               # Static assets and images
```

---

## 🚀 Deployment

### **Production Build**
```bash
npm run build
npm start
```

### **Environment Variables Required**
```env
NEXTAUTH_URL=your_domain
NEXTAUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
RESEND_API_KEY=your_resend_key
```

---

## 📚 Documentation

### **Development Guides**
- [Setting Up Email With Resend](./DevDocs/1_Setting_Up_Email_With_Resend.md)
- [MongoDB Atlas Configuration](./DevDocs/2_Setting_Up_MongoDB_Atlas.md)
- [Google Authentication Setup](./DevDocs/3_Setting_Up_Google_Authentication.md)
- [Stripe Payment Integration](./DevDocs/5_Setting_Up_Stripe_Payments.md)
- [UI Components Guide](./DevDocs/0_UI_Components_Guide.md)

### **Architecture Documentation**
- [System Architecture Overview](./DevPlanDocs/1-Architecture-Overview.md)
- [Component Structure](./DevPlanDocs/2-Components-Overview.md)
- [API Endpoints Reference](./DevPlanDocs/4-API-Endpoints.md)
- [Database Models](./DevPlanDocs/5-Database-Models.md)

---

## 🤝 Contributing

We welcome contributions from educators, developers, and AI enthusiasts! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Community

### **Get Help**
- 📧 Email: support@learningscience.ai
- 💬 Discord: [Join our community](https://discord.gg/learningscience)
- 📖 Documentation: [docs.learningscience.ai](https://docs.learningscience.ai)

### **Stay Updated**
- ⭐ Star this repository for updates
- 🐦 Follow us on Twitter [@LearningSciAI](https://twitter.com/learningsciAI)
- 📰 Subscribe to our newsletter for feature announcements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by educators, for educators**

*Transforming education one AI-powered tool at a time*

[Get Started](https://learningscience.ai) • [Documentation](./DevDocs) • [Community](https://discord.gg/learningscience) • [Support](mailto:support@learningscience.ai)

</div>
