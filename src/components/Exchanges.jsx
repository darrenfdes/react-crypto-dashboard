import React from "react";
// import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import { Loader } from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) {
    <Loader />;
  }

  const exchangesList = data;
  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume BTC</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={12}>
                      <Text>
                        <strong>{exchange.trust_score_rank}.</strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    {/* <Col span={12}>
                      ${millify(exchange.trade_volume_24h_btc)}
                    </Col> */}
                    {/* <Col span={6}>{exchange.year_established}</Col> */}
                    {/* <Col span={6}>{exchange.country}</Col> */}
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
