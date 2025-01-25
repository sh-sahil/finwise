import streamlit as st
import pandas as pd
import numpy as np

# Load the bank RD dataset
df = pd.read_csv("bank_rd_data.csv")

# Streamlit app
st.title("AI-Driven Financial Advisor: RD Investment")

# User input form
st.header("Enter Your Profile Details")
monthly_investment = st.number_input("Monthly Investment (in USD)", min_value=0)
time_span = st.number_input("Investment Time Span (in years)", min_value=1)
risk_level = st.selectbox("Risk Level", ["Low", "Medium", "High"])

# Calculate maturity amount and profit for each bank
def calculate_rd_maturity(row, monthly_investment, time_span):
    interest_rate = row["Interest_Rate"] / 100  # Convert percentage to decimal
    n = time_span * 12  # Total number of months
    r = interest_rate / 4  # Quarterly interest rate
    maturity_amount = monthly_investment * (((1 + r) ** (4 * time_span) - 1) / (1 - (1 + r) ** (-1 / 3)))
    total_investment = monthly_investment * n
    profit = maturity_amount - total_investment
    return round(maturity_amount, 2), round(profit, 2)

# Filter banks based on user input
filtered_banks = df[
    (df["Term"] == time_span) &  # Match RD term
    (df["Minimum_Monthly_Investment"] <= monthly_investment) &  # Check minimum monthly investment
    (df["Risk_Level"] == risk_level)  # Match risk level
]

# Add maturity amount and profit columns
filtered_banks[["Maturity_Amount", "Profit"]] = filtered_banks.apply(
    lambda row: calculate_rd_maturity(row, monthly_investment, time_span), axis=1, result_type="expand"
)

# Sort banks by profit (descending order)
filtered_banks = filtered_banks.sort_values(by="Profit", ascending=False)

# Display top 3 banks
st.header("Top 3 Recommended Banks")
if len(filtered_banks) > 0:
    for i, (_, row) in enumerate(filtered_banks.head(3).iterrows(), 1):
        st.subheader(f"#{i}: {row['Bank_Name']}")
        st.write(f"**Interest Rate:** {row['Interest_Rate']}%")
        st.write(f"**Term:** {row['Term']} years")
        st.write(f"**Minimum Monthly Investment:** ${row['Minimum_Monthly_Investment']}")
        st.write(f"**Maturity Amount:** ${row['Maturity_Amount']}")
        st.write(f"**Expected Profit:** ${row['Profit']}")
else:
    st.error("No banks match your criteria. Please adjust your inputs.")