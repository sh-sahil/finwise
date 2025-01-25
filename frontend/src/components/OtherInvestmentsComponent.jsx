import React from "react";
import "./OtherInvestmentsComponent.modules.css";

function OtherInvestmentsComponent() {
  return (
    <div className="App">
      <h1>Investment Guide</h1>

      {/* Bonds Section */}
      <div className="section">
        <h2>Bonds</h2>
        <h3>What are Bonds?</h3>
        <p>
          Bonds are debt securities issued by companies or governments to raise capital. When you
          buy a bond, you're lending money to the issuer in exchange for periodic interest payments
          and the return of the principal amount at maturity.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>Generally lower risk than stocks, especially government bonds.</li>
          <li>Provide regular income through interest payments (coupons).</li>
          <li>Safer investment compared to stocks during times of market volatility.</li>
        </ul>

        <h3>Risks:</h3>
        <ul>
          <li>Interest rate risk: Bond prices fall when interest rates rise.</li>
          <li>Credit risk: The issuer may default on its payments.</li>
          <li>Lower returns compared to stocks.</li>
        </ul>

        <h3>Ideal For:</h3>
        <p>Conservative investors seeking stable income with lower risk.</p>
      </div>

      {/* Cryptocurrency Section */}
      <div className="section">
        <h2>Cryptocurrency</h2>
        <h3>What is Cryptocurrency?</h3>
        <p>
          Cryptocurrencies are digital or virtual currencies that use cryptography for security.
          Bitcoin, Ethereum, and other cryptocurrencies are decentralized and operate on blockchain
          technology.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>High potential for high returns.</li>
          <li>Decentralized, meaning it's not controlled by any central bank or government.</li>
          <li>Cryptocurrency can be easily traded 24/7 on various platforms.</li>
        </ul>

        <h3>Risks:</h3>
        <ul>
          <li>Highly volatile with prices subject to rapid fluctuations.</li>
          <li>
            Regulatory uncertainty as many governments are still exploring how to regulate
            cryptocurrencies.
          </li>
          <li>Security risks such as hacking and loss of funds.</li>
        </ul>

        <h3>Ideal For:</h3>
        <p>
          Investors willing to take high risks in pursuit of potentially high returns and
          comfortable with the volatility and uncertainty of the market.
        </p>
      </div>

      {/* ETFs Section */}
      <div className="section">
        <h2>Exchange-Traded Funds (ETFs)</h2>
        <h3>What are ETFs?</h3>
        <p>
          ETFs are investment funds that hold a collection of assets, such as stocks or bonds, and
          trade on stock exchanges, much like individual stocks. They provide a simple way to invest
          in a diversified portfolio without buying individual securities.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>Low expense ratios compared to mutual funds.</li>
          <li>Liquid and can be traded on the exchange just like stocks.</li>
          <li>Offers diversification, which reduces individual stock risk.</li>
        </ul>

        <h3>Risks:</h3>
        <ul>
          <li>
            Market risk: ETFs that track specific sectors or indexes may suffer from sector or
            market downturns.
          </li>
          <li>May not be as actively managed as mutual funds.</li>
        </ul>

        <h3>Ideal For:</h3>
        <p>Investors looking for low-cost diversification with easy access to markets.</p>
      </div>

      {/* Commodities Section */}
      <div className="section">
        <h2>Commodities (e.g., Oil, Silver, etc.)</h2>
        <h3>What Are Commodities?</h3>
        <p>
          Commodities include physical goods like oil, agricultural products, metals (silver,
          copper), and other natural resources. Investors can trade in commodities through futures
          contracts, ETFs, or commodity stocks.
        </p>

        <h3>Advantages:</h3>
        <ul>
          <li>Hedge against inflation.</li>
          <li>Commodities can perform well when other markets, like stocks, underperform.</li>
          <li>Commodities like gold and oil have been long-standing stores of value.</li>
        </ul>

        <h3>Risks:</h3>
        <ul>
          <li>
            Highly volatile with price fluctuations based on geopolitical factors, supply-demand
            issues, and weather events.
          </li>
          <li>May require specialized knowledge for effective investment.</li>
        </ul>

        <h3>Ideal For:</h3>
        <p>Investors looking to hedge against inflation and diversify their portfolios.</p>
      </div>
    </div>
  );
}

export default OtherInvestmentsComponent;