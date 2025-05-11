import express, { Request, Response } from "express";
import type { Request as RequestType } from "../types";

const router = express.Router();

interface Basket {
  name: string;
  requests: Omit<RequestType, "basketName">[];
}

let allBaskets: Basket[] = [
  {
    name: "78ugqjy",
    requests: [
      {
        method: "POST",
        sentAt: "2025-03-10T06:50:30.361+10:00",
        headers: `
          POST /login HTTP/1.1
          Host: example.com
          Content-Type: application/x-www-form-urlencoded
          Content-Length: 38
        `,
        requestBodyContentType: "application/x-www-form-urlencoded",
        requestBody: "username=johndoe&password=123456",
      },
      {
        method: "POST",
        sentAt: "2025-03-10T06:50:30.361+10:00",
        headers: `
          POST /login HTTP/1.1
          Host: example.com
          Content-Type: application/x-www-form-urlencoded
          Content-Length: 38
        `,
        requestBodyContentType: "application/x-www-form-urlencoded",
        requestBody: "username=koala-bacon&password=123456",
      },
    ],
  },
  {
    name: "x06skz4",
    requests: [
      {
        method: "POST",
        sentAt: "2025-05-08T05:45:50.361+10:00",
        headers: `
          Accept: */*
          Accept-Encoding: gzip, deflate
          Baggage: sentry-trace_id=8941d0f43423447997f42a2b5961b0a2,sentry-sample_rate=0.0001,sentry-sampled=false,sentry-environment=production,sentry-public_key=ecd2cbf917454e9daa40541c86d0cabf,sentry-transaction=Webhook%3A%3ADeliveryJob
          Connection: close
          Content-Length: 2864
          Content-Type: application/json
          Sentry-Trace: 8941d0f43423447997f42a2b5961b0a2-865e1f2fb5734a12-0
          Traceparent: 00-b257fa90247b0a17371c9ab7c2190ed9-b906a87984b49978-00
          User-Agent: Basecamp3 Webhook
          X-Country: US
          X-Forwarded-For: 204.62.114.248
          X-Real-Ip: 204.62.114.248
          X-Request-Id: fa4ebfb0-4285-4e8c-869f-a0bcabc00bb9
        `,
        requestBodyContentType: "application/json",
        requestBody: `
          {
            "id": 14140437567,
            "kind": "todo_uncompleted",
            "details": {},
            "created_at": "2025-05-08T05:45:50.361+10:00",
            "recording": {
              "id": 8365482963,
              "status": "active",
              "visible_to_clients": false,
              "created_at": "2021-10-07T21:33:00.812+11:00",
              "updated_at": "2025-05-08T05:45:50.359+10:00",
              "title": "More TypeScript",
              "inherits_status": true,
              "type": "Todo",
              "url": "https://3.basecampapi.com/3695031/buckets/41141693/todos/8365482963.json",
              "app_url": "https://3.basecamp.com/3695031/buckets/41141693/todos/8365482963",
              "bookmark_url": "https://3.basecampapi.com/3695031/my/bookmarks/BAh7BkkiC19yYWlscwY6BkVUewdJIglkYXRhBjsAVEkiLmdpZDovL2JjMy9SZWNvcmRpbmcvODM2NTQ4Mjk2Mz9leHBpcmVzX2luBjsAVEkiCHB1cgY7AFRJIg1yZWFkYWJsZQY7AFQ=--4fae6d7217c8eac3360eda2b6fe78b9ffc376e2b.json",
              "subscription_url": "https://3.basecampapi.com/3695031/buckets/41141693/recordings/8365482963/subscription.json",
              "position": 1,
              "parent": {
                "id": 8365482949,
                "title": "TypeScript",
                "type": "Todolist",
                "url": "https://3.basecampapi.com/3695031/buckets/41141693/todolists/8365482949.json",
                "app_url": "https://3.basecamp.com/3695031/buckets/41141693/todolists/8365482949"
              },
              "bucket": {
                "id": 41141693,
                "name": "2505 Jorge Arias",
                "type": "Project"
              },
              "creator": {
                "id": 21308738,
                "attachable_sgid": "BAh7BkkiC19yYWlscwY6BkVUewdJIglkYXRhBjsAVEkiKWdpZDovL2JjMy9QZXJzb24vMjEzMDg3Mzg_ZXhwaXJlc19pbgY7AFRJIghwdXIGOwBUSSIPYXR0YWNoYWJsZQY7AFQ=--75ce4fa88d455333068ce554dc9805c59f98c4ab",
                "name": "Srdjan",
                "email_address": "srdjan@launchschool.com",
                "personable_type": "User",
                "title": "",
                "bio": "",
                "location": "",
                "created_at": "2018-09-23T01:54:16.141+02:00",
                "updated_at": "2025-02-19T00:26:27.409+01:00",
                "admin": false,
                "owner": false,
                "client": false,
                "employee": false,
                "time_zone": "Europe/Belgrade",
                "avatar_url": "https://bc3-production-assets-cdn.basecamp-static.com/3695031/people/BAhpBEIlRQE=--50a82b36e62618d7468d91ca209c37061210ddd0/avatar?v=1",
                "can_ping": true,
                "can_manage_projects": true,
                "can_manage_people": true,
                "can_access_timesheet": false,
                "can_access_hill_charts": true
              },
              "content": "More TypeScript"
            },
            "creator": {
              "id": 47731498,
              "attachable_sgid": "BAh7BkkiC19yYWlscwY6BkVUewdJIglkYXRhBjsAVEkiKWdpZDovL2JjMy9QZXJzb24vNDc3MzE0OTg_ZXhwaXJlc19pbgY7AFRJIghwdXIGOwBUSSIPYXR0YWNoYWJsZQY7AFQ=--db4f8d41c584ecdc1bac4776bdb05f1b6c504c8d",
              "name": "Jorge Arias",
              "email_address": "jorgeariasgil@gmail.com",
              "personable_type": "User",
              "title": "",
              "bio": "",
              "location": "Melbourne, Australia ",
              "created_at": "2025-02-19T20:03:10.850+11:00",
              "updated_at": "2025-02-19T21:58:05.841+11:00",
              "admin": false,
              "owner": false,
              "client": false,
              "employee": false,
              "time_zone": "Australia/Melbourne",
              "avatar_url": "https://bc3-production-assets-cdn.basecamp-static.com/3695031/people/BAhpBCpT2AI=--818934fe6758f02c4d48cd57b3d7c4ad73e73292/avatar?v=1",
              "company": {
                "id": 3192864,
                "name": "Capstone"
              },
              "can_ping": true,
              "can_manage_projects": true,
              "can_manage_people": true,
              "can_access_timesheet": false,
              "can_access_hill_charts": true
            }
          }
        `,
      },
    ],
  },
];

router.get("/baskets", (_req: Request, res: Response) => {
  const baskets = allBaskets.map((basket) => basket.name);
  res.status(200).json({ baskets });
});

router.get("/generate_name", (_req: Request, res: Response) => {
  const name: string = Math.random().toString(36).substring(2, 9);
  res.status(200).json({ name });
});

router.post(
  "/baskets/:name",
  (req: Request<{ name: string }>, res: Response) => {
    const basketName = req.params.name;

    const basket = allBaskets.find((basket) => basket.name === basketName);

    if (basket) {
      res.status(409).json({ message: "Basket already exists" });
      return;
    }

    const newBasket: Basket = {
      name: basketName,
      requests: [],
    };

    allBaskets.push(newBasket);
    res.status(201).json({ basketName });
  }
);

router.delete(
  "/baskets/:name",
  (req: Request<{ name: string }>, res: Response) => {
    const basketName = req.params.name;

    const basket = allBaskets.find((basket) => basket.name === basketName);

    if (!basket) {
      res.status(404).json({ message: `Basket not found` });
      return;
    }

    allBaskets = allBaskets.filter((currentBasket) => currentBasket != basket);
    res.status(204).json();
  }
);

router.get(
  "/baskets/:name/requests",
  (req: Request<{ name: string }>, res: Response) => {
    const basketName = req.params.name;

    const basket = allBaskets.find((basket) => basket.name === basketName);

    if (!basket) {
      res.status(404).json({ message: "Basket not found" });
      return;
    }

    res.status(200).json({ requests: basket.requests });
  }
);

router.delete(
  "/baskets/:name/requests",
  (req: Request<{ name: string }>, res: Response) => {
    const basketName = req.params.name;

    const basket = allBaskets.find((basket) => basket.name === basketName);

    if (!basket) {
      res.status(404).json({ message: "Basket not found" });
      return;
    }

    basket.requests = [];
    res.status(200).json();
  }
);

export default router;
