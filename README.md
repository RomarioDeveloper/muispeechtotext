# 🎙️ Text to Speech App

A modern, beautiful text-to-speech web application built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean, gradient-based design with smooth animations
- 🔊 **Text-to-Speech** - Convert any text to natural-sounding speech
- ⚡ **Speed Control** - Adjust speech rate from 0.5x to 2x
- 🔈 **Volume Control** - Fine-tune audio volume
- ⏯️ **Playback Controls** - Play, pause, and stop functionality
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎯 **Real-time Status** - Visual indicators for playback state

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd muispeechtotext
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **Vite** - Fast build tool
- **Lucide React** - Modern icon library
- **Web Speech API** - Browser-native text-to-speech

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── slider.tsx
│   └── TextToSpeech.tsx # Main TTS component
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Design Features

- **Gradient Backgrounds** - Beautiful color transitions
- **Glassmorphism** - Frosted glass effect on cards
- **Smooth Animations** - Hover effects and transitions
- **Inter Font** - Modern, clean typography
- **Responsive Layout** - Mobile-first design approach

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

This app uses the Web Speech API, which is supported in:
- Chrome/Edge (full support)
- Safari (full support)
- Firefox (limited support)

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ using React and Tailwind CSS
