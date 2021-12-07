import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

// import { useGetCryptoHistoryQuery } from "../services/cryptoApi";
import coinGecko from "../services/coinGecko";
import { historyOptions } from "../utilities/chartConfigs/chartConfigs";

const { Title } = Typography;

const LineChart = ({
  coinId,
  timePeriod,
  currentPrice,
  coinName,
  coinPercentageChangeDay,
}) => {
  // const { data: coinHistory } = useGetCryptoHistoryQuery({
  //   coinId,
  //   timePeriod,
  // });

  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await coinGecko.get(`/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: timePeriod,
        },
      });
      console.log(results.data);
      setCoinData(results.data.prices);
    };
    fetchData();
  }, [coinId, timePeriod]);

  const coinPrice = [];
  const coinTimestamp = [];

  console.log(coinId, timePeriod);
  // console.log(coinHistory);

  for (let i = 0; i < coinData.length; i++) {
    coinPrice.push(coinData[i][1]);
    coinTimestamp.push(new Date(coinData[i][0]).toLocaleDateString());
  }

  console.log("Here");
  // console.log(coinPrice, coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        pointRadius: 0,
      },
    ],
  };

  const options = historyOptions;

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change" style={{ display: "flex" }}>
            24h Change:{" "}
            <div
              style={{
                color:
                  Math.sign(Number(coinPercentageChangeDay)) === -1
                    ? "red"
                    : "green",
              }}
            >
              {Number(coinPercentageChangeDay).toFixed(2)}%
            </div>
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
