import streamlit as st
import pandas as pd
import numpy as np

# Load the bank FD dataset
df = pd.read_csv("bank_fd_data.csv")

# Streamlit app
st.title("AI-Driven Financial Advisor: FD Investment")

# User input form
st.header("Enter Your Profile Details")
amount = st.number_input("Amount to Invest (in USD)", min_value=0)
time_span = st.number_input("Investment Time Span (in years)", min_value=1)
risk_level = st.selectbox("Risk Level", ["Low", "Medium", "High"])

# Calculate profit for each bank
def calculate_profit(row, amount, time_span):
    interest_rate = row["Interest_Rate"] / 100  # Convert percentage to decimal
    profit = amount * (1 + interest_rate) ** time_span - amount
    return round(profit, 2)

# Filter banks based on user input
filtered_banks = df[
    (df["Term"] == time_span) &  # Match FD term
    (df["Minimum_Investment"] <= amount) &  # Check minimum investment
    (df["Risk_Level"] == risk_level)  # Match risk level
]

# Add profit column
filtered_banks["Profit"] = filtered_banks.apply(
    lambda row: calculate_profit(row, amount, time_span), axis=1
)

# Sort banks by profit (descending order)
filtered_banks = filtered_banks.sort_values(by="Profit", ascending=False)

# Display top 3 banks
st.header("Recommended Banks")
if len(filtered_banks) > 0:
    for i, (_, row) in enumerate(filtered_banks.head(3).iterrows(), 1):
        st.subheader(f"#{i}: {row['Bank_Name']}")
        st.write(f"**Interest Rate:** {row['Interest_Rate']}%")
        st.write(f"**Term:** {row['Term']} years")
        st.write(f"**Minimum Investment:** ${row['Minimum_Investment']}")
        st.write(f"**Expected Profit:** ${row['Profit']}")
else:
    st.error("No banks match your criteria. Please adjust your inputs.")