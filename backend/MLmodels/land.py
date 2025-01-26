import streamlit as st
import pandas as pd
import pickle

# Load the pre-trained model
@st.cache_resource
def load_model():
    with open('mumbai_house_prediction.pkl', 'rb') as f:
        return pickle.load(f)

# Load regions from JSON (assuming you have a method to do this)
@st.cache_data
def load_regions():
    import json
    with open('columns.json') as f:
        data = json.load(f)
    return data["data_columns"][3:]

# Prediction function
def predict_rate(bhk, area, region):
    sample_data = {
        'bhk': [bhk],
        'area': [area],
        'type': ['Apartment'],  # Hardcoded to Apartment
        'region': [region]
    }
    sample_df = pd.DataFrame(sample_data)
    best_pipeline = load_model()
    predicted_price = best_pipeline.predict(sample_df)[0]
    return predicted_price

# Streamlit App
def main():
    st.title('Mumbai House Price Predictor')
    
    # Load regions
    regions = load_regions()
    
    # Sidebar for inputs
    st.sidebar.header('Input Features')
    
    # BHK (Bedroom, Hall, Kitchen) Selection
    bhk = st.sidebar.slider('Number of BHK', min_value=1, max_value=5, value=2)
    
    # Area Input
    area = st.sidebar.number_input('Area (sq ft)', min_value=100, max_value=10000, value=1000)
    
    # Region Selection
    region = st.sidebar.selectbox('Region', regions)
    
    # Prediction Button
    if st.sidebar.button('Predict Price'):
        try:
            # Make prediction
            predicted_price = predict_rate(bhk, area, region)
            
            # Display results
            st.header('Prediction Results')
            st.success(f'Estimated House Price: ₹{predicted_price:,.2f} lakhs')
            
            # Additional information
            st.info(f'Details:\n- {bhk} BHK\n- {area} sq ft\n- Location: {region}')
        
        except Exception as e:
            st.error(f'An error occurred: {e}')
    
    # Optional: Add some context or explanation
    st.markdown("""
    ### How This Prediction Works
    - This model predicts house prices in Mumbai based on:
      * Number of Bedrooms (BHK)
      * Total Area
      * Specific Region
    - The prediction is based on historical real estate data
    - Accuracy may vary depending on market conditions
    """)

if __name__ == '__main__':
    main()