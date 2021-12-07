import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrency, News } from ".";
import millify from "millify";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery();
  console.log(data);
  const globalStats = data?.data;
  console.log(globalStats);

  // let sum = 0;
  // const totalMarketCap = globalStats.total_market_cap;
  // const keyArr = Object.values(totalMarketCap);
  // keyArr.map((x) => (sum += x.value));

  // console.log(sum);
  if (isFetching) return "Loading...";

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Coins Tracked"
            value={globalStats.active_cryptocurrencies}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Ongoing ICOs" value={globalStats.ongoing_icos} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap BTC"
            value={millify(globalStats.total_market_cap.btc)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Markets" value={globalStats.markets} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Market Cap change 24h"
            value={Number(
              globalStats.market_cap_change_percentage_24h_usd
            ).toFixed(2)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies by market cap
        </Title>
        <Title level={3} className="show-more">
          <Link to="/crypto">Show More</Link>
        </Title>
      </div>
      <Cryptocurrency simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage;
