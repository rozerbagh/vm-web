import React, { useEffect, useState } from "react";
// const currencyAPIKey = "b3184f4acf41f4176b0c8fff9b84e28a";
const gooleMap = "Google Maps";
const mapBox = "Mapbox";
const GoogleMapPricing = () => {
  const [users, setUsers] = useState(1000);
  const [viewsPerDay, setViewsPerDay] = useState(2);
  const [pricingDetails, setPricingDetails] = useState({
    freeLoads: 1000,
    freeDirRequest: 1000,
    maps_pricePer1000: 7,
    dir_pricePer1000: 5,
    monthlyMapUsage: 0,
    monthlyDirUsage: 0,
    mapPerMonPrice: 0,
    dirPerMonPrice: 0,
  });
  function calculateMapsPricing(requestsPerDay) {
    // Google Maps Dynamic Maps pricing: $7 per 1,000 requests
    setPricingDetails((ps) => {
      const requestPerMon = requestsPerDay * 30;
      return {
        ...ps,
        monthlyMapUsage: requestPerMon,
        monthlyDirUsage: requestPerMon,
        mapPerMonPrice: (requestPerMon / ps.freeLoads) * ps.maps_pricePer1000,
        dirPerMonPrice:
          (requestPerMon / ps.freeDirRequest) * ps.dir_pricePer1000,
      };
    });
  }

  useEffect(() => {
    // 1000 users opening maps twice a day = 2000 map loads/day.
    // 1000 users requesting directions twice a day = 2000 direction requests/day.
    const requestsPerDay = users * viewsPerDay;
    calculateMapsPricing(requestsPerDay);
  }, [users, viewsPerDay]);
  return (
    <>
      <div className="row">
        <h1>This calculations includes map loads for the users</h1>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter No of users
            </label>
            <input
              value={users}
              type="number"
              className="form-control"
              id="noOfUsers"
              onChange={(e) => setUsers(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter Requests per day by each (1) user
            </label>
            <input
              value={viewsPerDay}
              onChange={(e) => setViewsPerDay(e.target.value)}
              type="number"
              className="form-control"
              id="requestPerDay"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <h5>Calculation Assumptions per(1) day:</h5>
          <ul className="list-group">
            <li className="list-group-item semi-bold">
              {users} users opening maps {viewsPerDay} a day ={" "}
              {parseInt(users) * parseInt(viewsPerDay)} map loads/day.
            </li>
            <li className="list-group-item semi-bold">
              {users} requesting directions {viewsPerDay} a day ={" "}
              {parseInt(users) * parseInt(viewsPerDay)} direction requests/day.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h5>Calculation Assumptions per(1) Month:</h5>
          <ul className="list-group">
            <li className="list-group-item semi-bold">
              Maps: {pricingDetails.monthlyMapUsage} loads /{" "}
              {pricingDetails.freeLoads} * ${pricingDetails.maps_pricePer1000} =
              ${pricingDetails.mapPerMonPrice} and in INR ={" "}
              {parseFloat(pricingDetails.mapPerMonPrice * 83.44)} Rs
            </li>
            <li className="list-group-item semi-bold">
              Directions: {pricingDetails.monthlyDirUsage} requests /{" "}
              {pricingDetails.freeDirRequest} * $
              {pricingDetails.dir_pricePer1000}= $
              {pricingDetails.dirPerMonPrice} and in INR ={" "}
              {parseFloat(pricingDetails.dirPerMonPrice * 83.44)} Rs
            </li>
          </ul>
          <div className="semi-bold text-lg total-cost-text">
            Total Monthly Cost Total = ${pricingDetails.mapPerMonPrice} (Maps) +
            ${pricingDetails.dirPerMonPrice} (Directions) = $
            {pricingDetails.mapPerMonPrice + pricingDetails.dirPerMonPrice}
            <br />
            Minus $200 free tier = $
            {pricingDetails.mapPerMonPrice + pricingDetails.dirPerMonPrice} -
            $200 = $
            {pricingDetails.mapPerMonPrice +
              pricingDetails.dirPerMonPrice -
              200}{" "}
            and in INR{" "}
            {(
              (pricingDetails.mapPerMonPrice +
                pricingDetails.dirPerMonPrice -
                200) *
              83.44
            ).toFixed(2)}{" "}
            Rs
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h5>Pricing</h5>
        <p>
          Google offers a free tier of $200 per month. Beyond this, the costs
          are as follows:
        </p>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="semi-bold">Dynamic Maps: </span> $7 per 1000 map
            loads.
          </li>
          <li className="list-group-item">
            <span className="semi-bold">Directions API: </span>$5 per 1000
            requests for the standard plan.
          </li>
        </ul>
        <h1>Routes</h1>
        <p>
          This includes requests for directions and distance matrix, which are
          used to calculate routes. Here's the breakdown of how Google Maps
          Platform pricing generally works for these services:
        </p>
        <h5 className="semi-bold">
          1. Maps JavaScript API (Maps) Dynamic Maps: Used for displaying maps
          that users can interact with. <br />
          2. Directions API (Routes) Directions Requests: Used to calculate
          routes between locations.
        </h5>
      </div>
    </>
  );
};
const MapboxPricing = () => {
  const [users, setUsers] = useState(1000);
  const [viewsPerDay, setViewsPerDay] = useState(2);
  const [pricingDetails, setPricingDetails] = useState({
    freeLoads: 1000,
    freeDirRequest: 1000,
    maps_pricePer: 5,
    dir_pricePer: 0.5,
    monthlyMapUsage: 0,
    monthlyDirUsage: 0,
    mapPerMonPrice: 0,
    dirPerMonPrice: 0,
  });
  function calculateMapsPricing(requestsPerDay) {
    // Google Maps Dynamic Maps pricing: $7 per 1,000 requests
    setPricingDetails((ps) => {
      const requestPerMon = requestsPerDay * 30;
      const remainingRequest = requestPerMon - 50000;
      let totalcost = { map: 0, route: 0 };
      totalcost.map = 50 * ps.maps_pricePer;
      totalcost.route = 50 * ps.dir_pricePer;
      if (remainingRequest > 0) {
        totalcost.map = totalcost.map + (remainingRequest / 1000) * 4;
        totalcost.route = totalcost.route + (remainingRequest / 1000) * 0.4;
        /**
         * Maps
          First 50,000 map views: 50 * $5 = $250
          Remaining 10,000 map views: 10 * $4 = $40
          Total for Maps: $250 + $40 = $290
          Directions
          First 50,000 requests: 50 * $0.50 = $25
          Remaining 10,000 requests: 10 * $0.40 = $4
          Total for Directions: $25 + $4 = $29
         */
      }
      console.log(ps);
      return {
        ...ps,
        monthlyMapUsage: requestPerMon,
        monthlyDirUsage: requestPerMon,
        mapPerMonPrice: totalcost.map,
        dirPerMonPrice: totalcost.route,
      };
    });
  }

  useEffect(() => {
    // 1000 users opening maps twice a day = 2000 map loads/day.
    // 1000 users requesting directions twice a day = 2000 direction requests/day.
    const requestsPerDay = users * viewsPerDay;
    calculateMapsPricing(requestsPerDay);
  }, [users, viewsPerDay]);
  return (
    <>
      <div className="row">
        <h1>This calculations includes map loads for the users</h1>
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter No of users
            </label>
            <input
              value={users}
              type="number"
              className="form-control"
              id="noOfUsers"
              onChange={(e) => setUsers(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter Requests per day by each (1) user
            </label>
            <input
              value={viewsPerDay}
              onChange={(e) => setViewsPerDay(e.target.value)}
              type="number"
              className="form-control"
              id="requestPerDay"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div>
          <h5>Calculation Assumptions per(1) day:</h5>
          <ul className="list-group">
            <li className="list-group-item semi-bold">
              {users} users opening maps {viewsPerDay} a day ={" "}
              {parseInt(users) * parseInt(viewsPerDay)} map loads/day.
            </li>
            <li className="list-group-item semi-bold">
              {users} requesting directions {viewsPerDay} a day ={" "}
              {parseInt(users) * parseInt(viewsPerDay)} direction requests/day.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <h5>Calculation Assumptions per(1) Month:</h5>
          <ul className="list-group">
            <li className="list-group-item semi-bold">
              Maps: ${pricingDetails.mapPerMonPrice} and in INR ={" "}
              {parseFloat(pricingDetails.mapPerMonPrice * 83.44)} Rs
            </li>
            <li className="list-group-item semi-bold">
              Directions: ${pricingDetails.dirPerMonPrice} and in INR ={" "}
              {parseFloat(pricingDetails.dirPerMonPrice * 83.44)} Rs
            </li>
          </ul>
          <div className="semi-bold text-lg text-blue total-cost-text">
            Total Monthly Cost Total = ${pricingDetails.mapPerMonPrice} (Maps) +
            ${pricingDetails.dirPerMonPrice} (Directions) = $
            {pricingDetails.mapPerMonPrice + pricingDetails.dirPerMonPrice} and
            in INR{" "}
            {(pricingDetails.mapPerMonPrice + pricingDetails.dirPerMonPrice) *
              83.44}{" "}
            Rs
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h5>Pricing</h5>
        <ul className="list-group">
          <li className="list-group-item">
            $5 per 1000 map views for the first 50,000 map views per month.
            <br />
            $4 per 1000 map views for additional map views beyond 50,000.
          </li>
          <li className="list-group-item">
            $0.50 per 1000 requests for the first 50,000 requests per month.
            <br />
            $0.40 per 1000 requests for additional requests beyond 50,000.
          </li>
        </ul>
      </div>
    </>
  );
};
const Pricing = () => {
  // Calculate the pricing
  const [mapType, setMapType] = useState(gooleMap);

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row">
        <button
          className="btn btn-primary"
          onClick={() => setMapType(gooleMap)}
        >
          {gooleMap}
        </button>
        &nbsp;
        <button className="btn btn-primary" onClick={() => setMapType(mapBox)}>
          {mapBox}
        </button>
      </div>
      {mapType === gooleMap ? <GoogleMapPricing /> : <MapboxPricing />}
    </div>
  );
};

export default Pricing;
