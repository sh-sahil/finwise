import streamlit as st
import pandas as pd
import yfinance as yf
import datetime
import altair as alt
import pytz

# Function to add a ticker bubble
def add_bubble():
  if st.session_state.new_bubble:
    st.session_state.bubbles.append(st.session_state.new_bubble)
    st.session_state.new_bubble = ''

# Function to remove a ticker bubble
def remove_bubble(bubble):
  st.session_state.bubbles.remove(bubble)  

# Function to visualise ticker bubbles
def displayTickerBubbles():
  # Markdown for bubble formatting
  st.markdown("""
      <style>
      .stButton button {
          margin: 2px;
          white-space: nowrap;
      }
      </style>
      """, unsafe_allow_html=True)

  bubble_container = st.container()
  cols = bubble_container.columns(10)

  for i, bubble in enumerate(st.session_state.bubbles):
      if cols[i % 10].button(bubble, key=bubble):
          remove_bubble(bubble)
          st.rerun() # Refresh program upon addition of ticker bubble

# Function to display input widgets
def displayInput():
  input, refresh = st.columns([9, 1])
  with input:
    st.text_input("Enter ticker:", 
                  key='new_bubble', 
                  placeholder="Enter Stock Ticker e.g. AAPL", 
                  on_change=add_bubble)
  with refresh:
    st.markdown("<br>", unsafe_allow_html=True)
    st.button("Refresh", key='refresh_button')

# Function to visualise stock information, for a given ticker
def displayStockInfo(ticker):
  stockInfo = yf.Ticker(ticker)
  st.subheader(str(stockInfo.info['longName']))
  price, vol, float = st.columns(3)
  with price:
    currentPrice = stockInfo.info['currentPrice']
    previousClose = stockInfo.info['previousClose']
    dailyChange = round((currentPrice-previousClose)/previousClose,4) * 100
    st.metric(label="Price",
              value=str(('{:,}'.format(currentPrice))) + " " + stockInfo.info['currency'], 
              delta=str(('{:,}'.format(round(dailyChange,2)))) + " %")
  with vol:
    currentVolume = stockInfo.info['volume']
    averageVolume = stockInfo.info['averageVolume']
    dailyVolChange = round((currentVolume-averageVolume)/averageVolume,4) * 100
    st.metric(label="Volume",
              value=str(('{:,}'.format(currentVolume))), 
              delta=str(('{:,}'.format(round(dailyVolChange,2)))) + " %")
  with float:
    sharesFloat = stockInfo.info['floatShares']
    st.metric(label="Float",
              value=str(('{:,}'.format(sharesFloat))))

# Function to display stock price chart, for a given ticker
def displayChart(ticker):
  stockInfo = yf.Ticker(ticker)
  # Get the current time in UTC
  utc_now = datetime.datetime.now(pytz.utc)
  utc_today = datetime.datetime.now().date()
  # Convert the current time to Eastern Standard Time (EST)
  est = pytz.timezone('US/Eastern')
  est_now = utc_now.astimezone(est)
  # Define market open time
  market_open_time = est_now.replace(hour=9, minute=30, second=0, microsecond=0)
  # Today's date
  todayET = datetime.datetime.now(est).date()

  if est_now < market_open_time:
    data = stockInfo.history(start=todayET-datetime.timedelta(1), end=todayET, interval="1m")
  else:
    data = stockInfo.history(start=todayET, end=est_now, interval="1m")


  # # Before market open
  # if (datetime.datetime.now(tz) < todayET + datetime.timedelta(0,9.5*60*60,0)):
  #   data = stockInfo.history(start=todayET - datetime.timedelta(1), end=todayET, interval="1m") # ***FOR STREAMLIT HOSTING
  # else:
  #   data = stockInfo.history(start=todayET, end=datetime.datetime.now(tz), interval="1m") # ***FOR STREAMLIT HOSTING
  # ## data = stockInfo.history(start=today, end=today + datetime.timedelta(days=1), interval="1m") ***FOR LOCAL PROGRAMS

  if not data.empty:
    
    data.reset_index(inplace=True)
    data['Datetime'] = pd.to_datetime(data['Datetime'])
      
    # Calculate the bounds for the y-axis
    y_min = data['Close'].min()
    y_max = data['Close'].max()
    y_margin = (y_max - y_min) * 0.05  # 5% margin
    y_min -= y_margin
    y_max += y_margin

    # Altair for plotting
    chart = alt.Chart(data).mark_line().encode(
        x=alt.X('Datetime:T', title='Time'),
        y=alt.Y('Close', title='Price', scale=alt.Scale(domain=[y_min, y_max])),
        tooltip=['Datetime:T', 'Close']
    ).interactive().properties(
        width=800,
        height=400
    )
    st.altair_chart(chart, use_container_width=True)
  else:
    st.write("No data available for the selected ticker or date.")



# Display stock information for all selected tickers 
def displayWatchlist():
  if len(st.session_state.bubbles) == 0:
    return
  for ticker in st.session_state.bubbles:
    displayStockInfo(ticker)
    displayChart(ticker)

def main():
  # Initialize streamlit title
  st.title('Real-time Stock Watchlist')

  # Initialize session state for bubbles
  if 'bubbles' not in st.session_state:
      st.session_state.bubbles = []

  displayInput()
  displayTickerBubbles()
  displayWatchlist()

if __name__ == '__main__':
  main()