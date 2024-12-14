# bolt-generated-converter-project

# Cryptocurrency Converter

This project allows you to easily convert popular cryptocurrencies (BTC, ETH, Polkadot, and Dogecoin) to PLN and vice versa. The application utilizes the CoinGecko API to fetch real-time cryptocurrency exchange rates.

![preview](https://repository-images.githubusercontent.com/903052632/34e00c51-0de3-4439-a57a-05ec893e7db6)

## Features

- Supports BTC, ETH, Polkadot, and Dogecoin.
- Converts both ways: Cryptocurrency ↔ PLN.
- Fetches live data directly from the CoinGecko API.
- User-friendly interface with a dark theme.
- Input validation to ensure only numeric values are entered.
- Displays the current exchange rate for the selected cryptocurrency.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A build tool that provides a fast and optimized development experience.
- **CoinGecko API:** A public API for fetching cryptocurrency exchange rates.

## How to Run the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kuka42/bolt-generated-converter-project.git
    cd bolt-generated-converter-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the address provided in the console, usually:
    `http://localhost:5173`).

## Usage

1.  Select the cryptocurrency you want to convert from the dropdown menu.
2.  Enter the amount in either the PLN or cryptocurrency input field.
3.  The corresponding amount in the other currency will be automatically calculated and displayed.
4.  The current exchange rate for the selected cryptocurrency is displayed below the input fields.

## Project Structure

-   `index.html`: The main HTML file.
-   `src/`: Contains the source code for the application.
    -   `main.jsx`: The entry point of the React application.
    -   `App.jsx`: The main component of the application, containing the currency converter logic.
    -   `index.css`: The CSS file for styling the application.

## API Usage

The application uses the CoinGecko API to fetch real-time exchange rates. The API endpoint used is:

`https://api.coingecko.com/api/v3/simple/price?ids={selectedCrypto}&vs_currencies=pln`

Where `{selectedCrypto}` is replaced with the ID of the selected cryptocurrency (e.g., `bitcoin`, `ethereum`, `polkadot`, `dogecoin`).

## License

This project is licensed under the MIT License