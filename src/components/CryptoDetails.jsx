import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  // MoneyCollectOutlined,
  DollarCircleOutlined,
  // FundOutlined,
  ExclamationCircleOutlined,
  // StopOutlined,
  TrophyOutlined,
  // CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  LinkOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";

import {
  useGetCryptoDetailsQuery,
  // useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { Loader } from "./Loader";

// import chartData from "../utilities/chartData";

const { Title, Text } = Typography;
const { Option } = Select;

const getTimeperiod = (timePeriod) => {
  console.log(timePeriod);
  let days = "7";
  switch (timePeriod) {
    case "1h":
      days = "0.04167";
      break;

    case "3h":
      days = "0.125";
      break;

    case "24h":
      days = "1";
      break;

    case "7d":
      days = "7";
      break;

    case "14d":
      days = "14";
      break;

    case "30d":
      days = "30";
      break;

    case "1y":
      days = "365";
      break;

    case "max":
      days = "max";
      break;

    default:
      days = "7";
      break;
  }
  console.log(days);
  return String(days);
};

function CryptoDetails() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState(7);
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);
  // const { data: coinHistory } = useGetCryptoHistoryQuery({
  //   coinId,
  //   timePeriod,
  // });

  // console.log(coinHistory);
  // console.log(coinId, getTimeperiod(timePeriod));

  if (isFetching) {
    return <Loader />;
  }

  const coinPercentageChangeDay =
    cryptoDetails.market_data.price_change_percentage_24h;
  const time = ["1h", "3h", "24h", "7d", "14d", "30d", "1y", "max"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${
        cryptoDetails?.market_data.current_price.usd &&
        millify(cryptoDetails?.market_data.current_price.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoDetails?.market_cap_rank,
      icon: <NumberOutlined />,
    },
    {
      title: "Total Volume",
      value: `$ ${
        cryptoDetails?.market_data.total_volume.usd &&
        millify(cryptoDetails?.market_data.total_volume.usd)
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.market_data.market_cap.usd &&
        millify(cryptoDetails?.market_data.market_cap.usd)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "24h High",
      value: `$ ${millify(cryptoDetails?.market_data.high_24h.usd)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.market_data.total_supply &&
        millify(cryptoDetails?.market_data.total_supply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.market_data.circulating_supply &&
        millify(cryptoDetails?.market_data.circulating_supply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  console.log(cryptoDetails);

  const blockChainSites = cryptoDetails?.links.homepage.filter(
    (x) => x.trim() !== ""
  );

  const gitHubLinks = cryptoDetails?.links.repos_url.github.filter(
    (x) => x.trim() !== ""
  );
  console.log(gitHubLinks);

  let timeFrame = getTimeperiod(timePeriod);

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in USD, view value statistics, market
          cap and supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinId={coinId}
        timePeriod={timeFrame}
        coinPercentageChangeDay={coinPercentageChangeDay}
        currentPrice={millify(cryptoDetails.market_data.current_price.usd)}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>An overview showing details of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={5} className="coin-details-heading">
            What is {cryptoDetails?.name}?<br />
            {HTMLReactParser(cryptoDetails?.description.en)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            <GithubOutlined /> GitHub
          </Title>
          {gitHubLinks.map((x) => (
            <Row className="coin-links">
              <a href={x} target="_blank" rel="noreferrer">
                {x}
              </a>
            </Row>
          ))}
          {blockChainSites.map((x) => (
            <Row className="coin-link">
              <a href={x} target="_blank" rel="noreferrer">
                <Title level={3} className="coin-details-heading">
                  <LinkOutlined /> {cryptoDetails.name}
                </Title>
              </a>
            </Row>
          ))}

          {/* {cryptoDetails.links.map((x) => (
            <Row className="coin-link" key={x.key}>
              <Title level={5}>{x.key}</Title>
            </Row>
          ))} */}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetails;
