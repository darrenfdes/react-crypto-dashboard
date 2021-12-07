import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosListQuery } from "../services/cryptoApi";

import { Loader } from "./Loader";

function Cryptocurrency({ simplified }) {
  const count = simplified ? 10 : 200;
  const { data: cryptosList, isFetching } = useGetCryptosListQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList);

    const filteredData = cryptosList?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);

  // const handleSearchTerm = (e) => {
  //   setSearchTerm(e.target.value);
  //   const filteredData = cryptos.filter((c) =>
  //     c.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setCryptos(filteredData);
  // };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Seacrh Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.slice(0, count).map((x) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={x.id}>
            <Link key={x.id} to={`/crypto/${x.id}`}>
              <Card
                title={`${x.name}`}
                extra={
                  <img className="crypto-image" src={x.image} alt="coin-img" />
                }
                hoverable
              >
                <p>Price: ${millify(Number(x.current_price))}</p>
                <p>Market Cap: ${millify(Number(x.market_cap))}</p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  24hr Change:
                  <div
                    style={{
                      color:
                        Math.sign(Number(x.price_change_percentage_24h)) === -1
                          ? "red"
                          : "green",
                    }}
                  >
                    {" "}
                    {millify(Number(x.price_change_percentage_24h))}%
                  </div>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrency;
