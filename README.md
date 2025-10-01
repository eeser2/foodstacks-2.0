# 🍽️ Foodstacks 2.0

Tired of endless debates about where to eat? Foodstacks 2.0 takes the guesswork out of dining decisions! This modern web application helps you discover your next favorite restaurant based on your preferences and location.

## ✨ Features

- **Smart Recommendations**: Get personalized restaurant suggestions based on your location and food preferences
- **Customizable Preferences**: Set your dining preferences including cuisine type and location
- **Modern UI**: Clean, responsive design built with Next.js and Tailwind CSS
- **Local Storage**: Saves your preferences for future visits

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager
- API keys for TripAdvisor and Google Places (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/foodstacks-2.0.git
   cd foodstacks-2.0/foodstacks2-0
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `config.json` file in the root directory with your API keys:
   ```json
   {
     "apis": {
       "tripAdvisor": "your_tripadvisor_api_key",
       "googlePlaces": "your_google_places_api_key"
     }
   }
   ```

4. Create a `db.json` file in the root directory with the following structure:
   ```json
   {
     "typeOfFood": "",
     "location": "",
     "location_name": ""
   }
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Integration**: Next.js API Routes
- **Data Storage**: JSON-based local storage

## 📱 Usage

1. Visit the homepage
2. Set your food preferences by clicking "Set Your Preferences!"
3. The application will save your preferences in `db.json`
4. Get personalized restaurant recommendations based on your saved preferences

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using Next.js and Tailwind CSS
- Inspired by the eternal struggle of deciding where to eat
