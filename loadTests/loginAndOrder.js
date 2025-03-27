import { sleep, check, group, fail } from "k6";
import http from "k6/http";

export const options = {
  cloud: {
    distribution: {
      "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
    },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 5, duration: "30s" },
        { target: 15, duration: "1m" },
        { target: 10, duration: "30s" },
        { target: 0, duration: "30s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  group("page_1 - https://pizza.goodegg.click/menu", function () {
    const vars = {};

    response = http.put(
      "https://pizza-service.goodegg.click/api/auth",
      '{"email":"d@jwt.com","password":"diner"}',
      {
        headers: {
          Host: "pizza-service.goodegg.click",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Content-Type": "application/json",
          Origin: "https://pizza.goodegg.click",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          Priority: "u=0",
          TE: "trailers",
        },
      }
    );
    check(response, {
      "status equals 200": (response) => response.status.toString() === "200",
    });
    if (
      !check(response, {
        "status equals 200": (response) => response.status.toString() === "200",
      })
    ) {
      console.log(response.body);
      fail("Login was *not* 200");
    }

    vars.authToken = response.json().token;

    sleep(13);

    response = http.get("https://pizza-service.goodegg.click/api/order/menu", {
      headers: {
        Host: "pizza-service.goodegg.click",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        Authorization: "Bearer ${vars.authToken}",
        Origin: "https://pizza.goodegg.click",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "If-None-Match": 'W/"1fc-cgG/aqJmHhElGCplQPSmgl2Gwk0"',
        Priority: "u=0",
        TE: "trailers",
      },
    });

    response = http.get("https://pizza-service.goodegg.click/api/franchise", {
      headers: {
        Host: "pizza-service.goodegg.click",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Content-Type": "application/json",
        Authorization: "Bearer ${vars.authToken}",
        Origin: "https://pizza.goodegg.click",
        Connection: "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "If-None-Match": 'W/"4d-XP6iNgRl0gEXropKZN2QnPFhlqU"',
        Priority: "u=4",
        TE: "trailers",
      },
    });
    sleep(9);

    response = http.post(
      "https://pizza-service.goodegg.click/api/order",
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038},{"menuId":2,"description":"Pepperoni","price":0.0042},{"menuId":3,"description":"Margarita","price":0.0042}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          Host: "pizza-service.goodegg.click",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Content-Type": "application/json",
          Authorization: "Bearer ${vars.authToken}",
          Origin: "https://pizza.goodegg.click",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          Priority: "u=0",
          TE: "trailers",
        },
      }
    );

    vars.jwt = response.json().jwt;

    sleep(3);

    response = http.post(
      "https://pizza-factory.cs329.click/api/order/verify",
      '{"jwt":"${vars.jwt}"}',
      {
        headers: {
          Host: "pizza-factory.cs329.click",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Content-Type": "application/json",
          Authorization: "Bearer ${vars.authToken}",
          Origin: "https://pizza.goodegg.click",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "cross-site",
          Priority: "u=0",
          TE: "trailers",
        },
      }
    );
  });
}
