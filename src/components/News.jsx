import React, { useState } from "react";
import { Select, Typography, Row, Col, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosListQuery } from "../services/cryptoApi";

import { Loader } from "./Loader";
import HTMLReactParser from "html-react-parser";

const { Title, Text } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptosList } = useGetCryptosListQuery(simplified ? 10 : 100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 10 : 100,
  });

  // console.log(coinArr);
  // console.log(isFetching);

  if (isFetching) {
    return <Loader />;
  }

  const articles = cryptoNews.articles;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a news Category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency"></Option>
            {cryptosList?.map((c) => (
              <Option value={c.name}>{c.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {articles.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card
            hoverable
            className="news-card"
            cover={<img src={news.urlToImage} alt="" />}
          >
            <a href={news?.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news?.title}
                </Title>
              </div>
              <p>
                {news.description > 100
                  ? `${HTMLReactParser(news.description.substring(0, 100))}...`
                  : HTMLReactParser(news.description)}
              </p>
              <div className="provider-container">
                <div>
                  <Text className="provider-name">{news.source.name}</Text>
                </div>
                <div>
                  <Text>
                    {moment(news.publishedAt).startOf("ss").fromNow()}
                  </Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
