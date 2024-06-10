<h1 style="color: blue;">The Movies App!</h1>


![Demo](moviesAppDemo.gif)


<h2 style="color: blue;">Tool Stack</h2>

- react
- react native
- redux
- reanimated
- expo 51 / expo-dev-client
- grohom/bottomsheet
- react navigation 

## Getting Started

Follow these steps to set up the project:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/TarikMalek/MoviesApp.git
    ```

2. **Login to your expo account and Create Expo development build**:
    ```sh
    eas build --platform android --profile development # For Android
    eas build --platform ios --profile development-simulator # For iOS
    ```

3. **Add API keys in `.env` file at the root level of the project**:
    ```env
    EXPO_PUBLIC_weatherApi=******* # create an account and add your token weatherapi.com
    EXPO_PUBLIC_moviesApi=*******   # create an account and add your token https://developer.themoviedb.org/
    ```

4. **Run the server**:
    ```sh
    npx expo start
    ```
    Then open your preferred simulator and enjoy 😊

## Features

- **Sticky Header with Dynamic Visibility**: The header's visibility changes based on the scroll position, enhancing user experience by keeping important navigation elements in view.

- **Dynamic Bottom Sheet to Control Filters**: An interactive bottom sheet that allows users to apply various filters dynamically.

- **Infinite Scroll**: Automatically loads more content as the user scrolls down, providing a seamless browsing experience.

- **Lottie Animations**: Adds high-quality, engaging animations to the app using Lottie.

- **Animated Layouts**: Smooth transitions and animations for different UI components and layouts.

- **Weather Data Based on Your Location**: Provides real-time weather data by accessing the user's location.

