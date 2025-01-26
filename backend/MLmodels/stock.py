import os
import datetime as dt
import yfinance as yf
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from mpl_finance import candlestick_ohlc
import matplotlib.ticker as mticker
import streamlit as st

# Function to process stock data and save results
def process_stock_data(company_name):
    # Create output directory
    output_dir = f"output/{company_name}"
    os.makedirs(output_dir, exist_ok=True)

    # Load data
    start = dt.datetime(2000, 1, 1)
    end = dt.datetime(2019, 12, 31)
    data = yf.download(company_name, start=start, end=end)

    # Save raw data to CSV
    data.to_csv(f"{output_dir}/{company_name}.csv")

    # Plot and save the closing price
    st.subheader(f'{company_name} Closing Prices')
    fig, ax = plt.subplots(figsize=(20, 10))
    data['Close'].plot(ax=ax)
    plt.title(f'{company_name} Closing Prices')
    st.pyplot(fig)
    plt.close(fig)

    # Prepare DataFrame for candlestick plotting
    data_ohlc = data['Close'].resample('10D').ohlc()
    data_volume = data['Volume'].resample('10D').sum()
    data_ohlc.reset_index(inplace=True)

    # Rename columns to lowercase for compatibility with candlestick_ohlc
    data_ohlc.columns = ['Date', 'open', 'high', 'low', 'close']
    data_ohlc['Date'] = data_ohlc['Date'].map(mdates.date2num)

    # Plot and save candlestick chart
    st.subheader(f'{company_name} Candlestick Chart')
    fig, ax1 = plt.subplots(figsize=(20, 10))
    candlestick_ohlc(ax1, data_ohlc[['Date', 'open', 'high', 'low', 'close']].values, width=2, colorup='g')
    ax1.xaxis_date()
    ax1.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
    ax1.xaxis.set_major_locator(mticker.MaxNLocator(10))
    ax1.grid(True)
    plt.setp(ax1.get_xticklabels(), rotation=45, ha='right')
    plt.title(f'{company_name} Candlestick Chart')
    st.pyplot(fig)
    plt.close(fig)

    # Feature Engineering for LSTM
    data_ohlc['MA_5'] = data_ohlc['close'].rolling(window=5).mean()
    data_ohlc['MA_20'] = data_ohlc['close'].rolling(window=20).mean()
    data_ohlc = data_ohlc.dropna()

    features = ['open', 'high', 'low', 'close', 'MA_5', 'MA_20']
    target = 'close'

    # Normalize the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data_ohlc[features])

    # Prepare dataset for time-series forecasting
    def create_dataset(data, target_col, look_back=60):
        X, y = [], []
        for i in range(len(data) - look_back):
            X.append(data[i:i + look_back])
            y.append(data[i + look_back, target_col])
        return np.array(X), np.array(y)

    X, y = create_dataset(scaled_data, data_ohlc.columns.get_loc(target))

    # Train-test split
    train_size = int(len(X) * 0.8)
    X_train, X_test = X[:train_size], X[train_size:]
    y_train, y_test = y[:train_size], y[train_size:]

    # Build LSTM model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(LSTM(units=50))
    model.add(Dense(1))

    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model.fit(X_train, y_train, epochs=10, batch_size=32)

    # Predict the test set
    y_pred = model.predict(X_test)

    # Invert scaling
    y_test_rescaled = scaler.inverse_transform(
        np.concatenate((X_test[:, -1, :-1], y_test.reshape(-1, 1)), axis=1)
    )[:, -1]
    y_pred_rescaled = scaler.inverse_transform(
        np.concatenate((X_test[:, -1, :-1], y_pred), axis=1)
    )[:, -1]

    # Plot and save predictions vs actual values
    st.subheader(f'{company_name} LSTM Predictions vs Actual')
    fig, ax = plt.subplots(figsize=(20, 10))
    plt.plot(y_test_rescaled, label='Actual', color='blue')
    plt.plot(y_pred_rescaled, label='Predicted', color='red')
    plt.legend()
    plt.title(f'{company_name} LSTM Predictions vs Actual')
    st.pyplot(fig)
    plt.close(fig)

    # Save the model
    model.save(f"{output_dir}/{company_name}_model.keras")
    st.success(f"Processing complete. Outputs saved in: {output_dir}")

# Streamlit app
def main():
    st.title("Stock Data Analysis with LSTM")
    company = st.text_input("Enter the company ticker symbol (e.g., IBM): ")
    if company:
        process_stock_data(company)

if __name__ == "__main__":
    main()