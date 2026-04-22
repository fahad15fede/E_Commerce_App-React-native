# ShopApp — React Native E-Commerce App

A fully functional mobile e-commerce application built with React Native and Expo. Products are fetched live from the [FakeStore API](https://fakestoreapi.com/). Includes visual search powered by TensorFlow.

## App Name
ShopApp

## Technologies Used
- React Native + Expo
- TypeScript
- React Navigation (Stack + Tab)
- Redux Toolkit (slice + async thunk)
- Axios (API integration)
- AsyncStorage (offline caching)
- Formik + Yup (form validation)
- i18next (localization — English & Spanish)
- @rneui/themed (UI components)
- TensorFlow.js (visual search)

## Features
- Authentication flow (Login, Register, Forgot Password)
- Bottom tab navigation (Home, Shop, Bag, Favorites, Profile)
- Live product listing from FakeStore public API
- Loading indicator and error handling on API calls
- Offline caching with AsyncStorage
- Product filtering (price range, color, size, category)
- Sort products by popularity, price, etc.
- Visual search (camera + image picker)
- Localization (English / Spanish)

## How to Run
```bash
npm install
npx expo start
```
Then scan the QR code with Expo Go on your device, or press `a` for Android emulator / `i` for iOS simulator.

## Screenshots

<img src="/assets/screenshots/login_screen.png" alt="Login Screen" width="200"> | <img src="/assets/screenshots/register_screen.png" alt="Register Screen" width="200">  | <img src="/assets/screenshots/forgot_password_screen.png" alt="Forgot Password Screen" width="200"> | <img src="/assets/screenshots/home_screen.png" alt="Home Screen" width="200"> | <img src="/assets/screenshots/shop_screen.png" alt="Shop Screen" width="200"> | <img src="/assets/screenshots/category_screen.png" alt="Category Screen" width="200"> | <img src="/assets/screenshots/filter_screen.png" alt="Filter Screen" width="200"> | <img src="/assets/screenshots/visual_search_screen.png" alt="Vissual Search Screen" width="200"> | <img src="/assets/screenshots/crop_screen.png" alt="Search Screen" width="200"> | <img src="/assets/screenshots/sort_screen.png" alt="Sort Screen" width="200">  

## Features

- User authentication (Sign up, Sign in, Forgot password)
- Product Listing
- Product search (Visual Search)
- Product details
- Add to cart
- Cart management (Add, update, remove items)
- Checkout flow
- Order history
- User profile management

## Technology Stack

- [React Native](https://reactnative.dev/): A JavaScript framework for building native mobile applications.
- [Expo](https://docs.expo.io/): Expo is an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- [Redux](https://redux.js.org/): A predictable state container for managing the application state.
- [React Navigation](https://reactnavigation.org/): A navigation library for managing navigation between screens.
- [Axios](https://axios-http.com/): A promise-based HTTP client for making API requests.
- [React Native Elements](https://reactnativeelements.com/): A UI toolkit for building reusable UI components.
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons): A library for adding vector icons to your React Native application.
- [Formik](https://formik.org/): A form library for building scalable and reusable forms.
- [Yup](https://github.com/jquense/yup): A schema validation library for form validation.

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- Expo CLI

## Getting Started

1. Clone the repository:

```
git clone https://github.com/JamesUgbanu/Ecommerce-mobile.git
```

2. Navigate to the project directory:

```
cd ecommerce-mobile-template
```


3. Install dependencies:

```
npm install
```
or
```
yarn install
```


4. Start the development server:

```
npm run start
```

This will open the Expo Developer Tools in your browser.

5. Choose the desired platform (iOS, Android, or web) to run the app.

6. Use the Expo client app or an emulator to run the app on your device.

## Folder Structure

The project structure is organized as follows:

```
├── assets
│   ├── fonts
│   ├── images
├── components
│   ├── auth
│   ├── cart
│   ├── common
│   ├── products
│   ├── profile
├── constants
├── localization
├── navigation
├── screens
├── services
├── store
├── utils
```

- **assets**: Contains font files and image assets used in the app.
- **components**: Contains reusable UI components used throughout the app, organized by feature or functionality.
- **navigation**: Contains the app's navigation configuration.
- **screens**: Contains individual app screens.
- **services**: Contains services or utility functions used across the app.
- **utils**: Contains helper functions and utility scripts.

Feel free to modify the folder structure based on your project requirements.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. UX design can be found [here](https://www.figma.com/file/h8Qh89sALKZK9Ru38NDg1u/E-Commerce-App-Design-(Community))

## License

This project is licensed under the MIT License. Feel free to use it for commercial or personal use.

## Acknowledgments

This project is inspired by the React Native and Expo community. Thank you to all the developers who contribute to these amazing open-source frameworks.

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.io/)
