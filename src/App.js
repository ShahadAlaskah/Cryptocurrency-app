import { useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const [cryptoCurrencyIDList, setCryptoCurrencyIDList] = useState([]);
  const [cryptoCurrencyList, setCryptoCurrencyList] = useState([]);
  const [cryptoCurrencySerch, setCryptoCurrencySerch] = useState(false);
  const [serchValue, setSerchValue] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch("https://api.coinstats.app/public/v1/coins");
      const data = await request.json();
      setCryptoCurrencyList(data.coins.slice(0, 10));
      setCryptoCurrencyIDList(
        data.coins.slice(0, 10).map((i) => {
          return {
            value: i.id,
            label: i.name,
          };
        })
      );
    };

    fetchData();
  }, []);

  const serch = async (option) => {
    const request = await fetch(
      `https://api.coinstats.app/public/v1/coins/${option.value}`
    );
    const data = await request.json();
    setSerchValue(data.coin);
    setCryptoCurrencySerch(true);
  };

  return (
    <div className="container mt-5 w-50">
      <h1 className="text-center text-light">Cryptocurrency</h1>
      <div className="input-group mt-3 w-100 mx-auto">
        <Select
          onChange={serch}
          className="w-100"
          options={cryptoCurrencyIDList}
        />
      </div>
      {cryptoCurrencySerch ? (
        <div className="card w-100 mt-5 ml-auto">
          <img
            width="30px"
            height="400px"
            src={serchValue.icon}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{serchValue.name}</h5>
            <p className="card-text">
              price:{serchValue.price}
              rank:{serchValue.rank}
              priceBtc:{serchValue.priceBtc}
              volume:{serchValue.volume}
              marketCap:{serchValue.marketCap}
            </p>
          </div>
        </div>
      ) : (
        <ol className="list-group list-group-numbered mt-5">
          {cryptoCurrencyList.map((i, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{i.name}</div>
                price:{i.price}
              </div>

              <span>
                <img src={i.icon} className="card-img-top" alt="..." />
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
