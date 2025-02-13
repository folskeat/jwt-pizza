import { test, expect } from "playwright-test-coverage";

test("home page", async ({ page }) => {
  await page.goto("/");

  expect(await page.title()).toBe("JWT Pizza");
});

test("register and logout", async ({ page }) => {
  // Mock register
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "POST") {
      const regReq = {
        name: "joe fullmer",
        email: "jf@m.com",
        password: "ilikedk",
      };
      const regRes = {
        user: {
          name: "joe fullmer",
          email: "jf@m.com",
          roles: [
            {
              role: "diner",
            },
          ],
          id: 5,
        },
        token: "qwertyu",
      };
      expect(route.request().method()).toBe("POST");
      expect(route.request().postDataJSON()).toMatchObject(regReq);
      await route.fulfill({ json: regRes });
    } else if (route.request().method() === "DELETE") {
      // Mock the logout method
      const logoutRes = { message: "logout successful" };
      expect(route.request().headers()["authorization"]).toBe("Bearer qwertyu");
      await route.fulfill({ json: logoutRes });
    }
  });

  // Mock fetch to order page
  await page.route("*/**/api/order", async (route) => {
    const orderRes = {
      dinerId: 5,
      orders: [],
      page: 1,
    };
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: orderRes });
  });

  // Mock fetch to menu page
  await page.route("*/**/api/order/menu", async (route) => {
    const menuRes = [
      {
        id: 1,
        title: "Veggie",
        image: "pizza1.png",
        price: 0.0038,
        description: "A garden of delight",
      },
      {
        id: 2,
        title: "Pepperoni",
        image: "pizza2.png",
        price: 0.0042,
        description: "Spicy treat",
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: menuRes });
  });

  await page.goto("/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByRole("textbox", { name: "Full name" }).fill("joe fullmer");
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("jf@m.com");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("ilikedk");
  await page.getByRole("button", { name: "Register" }).click();
  await page.getByRole("link", { name: "jf" }).click();
  await expect(page.locator("h2")).toContainText("Your pizza kitchen");
  await expect(page.getByRole("main")).toContainText(
    "How have you lived this long without having a pizza?"
  );
  await page.getByRole("link", { name: "Buy one" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
});

test("purchase with login", async ({ page }) => {
  // Get menu mock function
  await page.route("*/**/api/order/menu", async (route) => {
    const menuRes = [
      {
        id: 1,
        title: "Veggie",
        image: "pizza1.png",
        price: 0.0038,
        description: "A garden of delight",
      },
      {
        id: 2,
        title: "Pepperoni",
        image: "pizza2.png",
        price: 0.0042,
        description: "Spicy treat",
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: menuRes });
  });

  // Get franchise mock function
  await page.route("*/**/api/franchise", async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: "LotaPizza",
        stores: [
          { id: 4, name: "Lehi" },
          { id: 5, name: "Springville" },
          { id: 6, name: "American Fork" },
        ],
      },
      { id: 3, name: "PizzaCorp", stores: [{ id: 7, name: "Spanish Fork" }] },
      { id: 4, name: "topSpot", stores: [] },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: franchiseRes });
  });

  // Login mock function
  await page.route("*/**/api/auth", async (route) => {
    const loginReq = { email: "d@jwt.com", password: "a" };
    const loginRes = {
      user: {
        id: 3,
        name: "Kai Chen",
        email: "d@jwt.com",
        roles: [{ role: "diner" }],
      },
      token: "abcdef",
    };
    expect(route.request().method()).toBe("PUT");
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  // Order mock function
  await page.route("*/**/api/order", async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: "Veggie", price: 0.0038 },
        { menuId: 2, description: "Pepperoni", price: 0.0042 },
      ],
      storeId: "4",
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: "Veggie", price: 0.0038 },
          { menuId: 2, description: "Pepperoni", price: 0.0042 },
        ],
        storeId: "4",
        franchiseId: 2,
        id: 23,
      },
      jwt: "eyJpYXQ",
    };
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  //Do some tests using the mock function

  await page.goto("/");

  // Go to order page
  await page.getByRole("button", { name: "Order now" }).click();

  // Create order
  await expect(page.locator("h2")).toContainText("Awesome is a click away");
  await page.getByRole("combobox").selectOption("4");
  await page.getByRole("link", { name: "Image Description Veggie A" }).click();
  await page.getByRole("link", { name: "Image Description Pepperoni" }).click();
  await expect(page.locator("form")).toContainText("Selected pizzas: 2");
  await page.getByRole("button", { name: "Checkout" }).click();

  // Login
  await page.getByPlaceholder("Email address").click();
  await page.getByPlaceholder("Email address").fill("d@jwt.com");
  await page.getByPlaceholder("Email address").press("Tab");
  await page.getByPlaceholder("Password").fill("a");
  await page.getByRole("button", { name: "Login" }).click();

  // Pay
  await expect(page.getByRole("main")).toContainText(
    "Send me those 2 pizzas right now!"
  );
  await expect(page.locator("tbody")).toContainText("Veggie");
  await expect(page.locator("tbody")).toContainText("Pepperoni");
  await expect(page.locator("tfoot")).toContainText("0.008 ₿");
  await page.getByRole("button", { name: "Pay now" }).click();

  // Check balance
  await expect(page.getByText("0.008")).toBeVisible();
});

test("create and delete franchise", async ({ page }) => {
  // Login mock function
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "PUT") {
      const loginReq = {
        email: "a@jwt.com",
        password: "admin",
      };
      const loginRes = {
        user: {
          id: 1,
          name: "常用名字",
          email: "a@jwt.com",
          roles: [
            {
              role: "admin",
            },
          ],
        },
        token: "fazbear",
      };
      expect(route.request().method()).toBe("PUT");
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === "DELETE") {
      //Logout
      const logoutRes = { message: "logout successful" };
      expect(route.request().headers()["authorization"]).toBe("Bearer fazbear");
      await route.fulfill({ json: logoutRes });
    }
  });

  // Note: The POST method won't actually post anything since we are mocking out the backend.
  // However, this isn't really a huge deal since we have already tested the backend.
  // In this instance, we just want to ensure that everything in the frontend works.
  await page.route("*/**/api/franchise", async (route) => {
    if (route.request().method() === "GET") {
      const franchiseRes = [
        {
          id: 1,
          name: "pizzaPocket",
          admins: [
            {
              id: 4,
              name: "pizza franchisee",
              email: "f@jwt.com",
            },
          ],
          stores: [
            {
              id: 1,
              name: "SLC",
              totalRevenue: 0.274,
            },
          ],
        },
        {
          id: 2,
          name: "pizza planet",
          admins: [
            {
              id: 1,
              name: "常用名字",
              email: "a@jwt.com",
            },
          ],
          stores: [
            {
              id: 2,
              name: "BYU",
              totalRevenue: 0.304,
            },
          ],
        },
      ];
      expect(route.request().method()).toBe("GET");
      await route.fulfill({ json: franchiseRes });
    } else if (route.request().method() === "POST") {
      // Making a new franchise
      const franchiseReq = {
        stores: [],
        id: "",
        name: "Funky Town",
        admins: [
          {
            email: "a@jwt.com",
          },
        ],
      };
      const franchiseRes = {
        stores: [],
        id: 250,
        name: "Funky Town",
        admins: [
          {
            email: "a@jwt.com",
            id: 1,
            name: "常用名字",
          },
        ],
      };
      expect(route.request().method()).toBe("POST");
      await route.fulfill({ json: franchiseRes });
    }
  });

  await page.route("*/**/api/franchise/2", async (route) => {
    const franchiseRes = {
      message: "franchise deleted",
    };
    expect(route.request().method()).toBe("DELETE");
    await route.fulfill({ json: franchiseRes });
  });

  // Login to the admin page
  await page.goto("/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Email address" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await page.getByRole("textbox", { name: "Password" }).press("Enter");

  // Go to the admin page
  await page.getByRole("link", { name: "Admin" }).click();
  await expect(page.locator("h2")).toContainText("Mama Ricci's kitchen");
  await expect(page.locator("table")).toContainText("pizzaPocket");
  await expect(page.locator("table")).toContainText("pizza franchise");
  await expect(page.locator("table")).toContainText("pizza planet");
  await expect(page.locator("table")).toContainText("常用名字");
  await page.getByRole("button", { name: "Add Franchise" }).click();

  // Create franchise
  await expect(page.locator("h2")).toContainText("Create franchise");
  await page.getByRole("textbox", { name: "franchise name" }).click();
  await page
    .getByRole("textbox", { name: "franchise name" })
    .fill("Funky Town");
  await page.getByRole("textbox", { name: "franchisee admin email" }).click();
  await page
    .getByRole("textbox", { name: "franchisee admin email" })
    .fill("a@jwt.com");
  await page.getByRole("button", { name: "Create" }).click();

  // Delete franchise
  await expect(page.locator("h2")).toContainText("Mama Ricci's kitchen");
  await page
    .getByRole("row", { name: "pizza planet 常用名字 Close" })
    .getByRole("button")
    .click();
  await expect(page.locator("h2")).toContainText("Sorry to see you go");
  await expect(page.getByText("pizza planet")).toBeVisible;
  const element = page.getByText("pizza planet");
  await expect(element).toHaveClass("text-orange-500");

  // Logout
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
});

test("empty franchise dashboard", async ({ page }) => {
  // Mock login
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "PUT") {
      const loginReq = {
        email: "a@jwt.com",
        password: "admin",
      };
      const loginRes = {
        user: {
          id: 1,
          name: "常用名字",
          email: "a@jwt.com",
          roles: [
            {
              role: "admin",
            },
          ],
        },
        token: "fazbear",
      };
      expect(route.request().method()).toBe("PUT");
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === "DELETE") {
      //Logout
      const logoutRes = { message: "logout successful" };
      expect(route.request().headers()["authorization"]).toBe("Bearer fazbear");
      await route.fulfill({ json: logoutRes });
    }
  });

  // Mock empty dashboard
  await page.route("*/**/api/franchise/1", async (route) => {
    const franchiseRes = [];
    await route.fulfill({ json: franchiseRes });
  });

  await page.goto("/");
  await page
    .getByRole("contentinfo")
    .getByRole("link", { name: "Franchise" })
    .click();

  // Empty franchise dashboard page
  await expect(page.getByText("If you are already a franchisee, please"))
    .toBeVisible;
  const element = page.getByText("If you are already a franchisee, please");
  await expect(element).toHaveClass("my-3 text-sm text-yellow-700");

  await page.getByRole("link", { name: "login", exact: true }).click();
  await expect(page.locator("h2")).toContainText("Welcome back");

  // Usual login, maybe unnecessary to be honest...
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Email address" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
});

test("create and delete store", async ({ page }) => {
  // Mock login and logout
  await page.route("*/**/api/auth", async (route) => {
    if (route.request().method() === "PUT") {
      const loginReq = {
        email: "a@jwt.com",
        password: "admin",
      };
      const loginRes = {
        user: {
          id: 1,
          name: "常用名字",
          email: "a@jwt.com",
          roles: [
            {
              role: "admin",
            },
          ],
        },
        token: "fazbear",
      };
      expect(route.request().method()).toBe("PUT");
      expect(route.request().postDataJSON()).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (route.request().method() === "DELETE") {
      //Logout
      const logoutRes = { message: "logout successful" };
      expect(route.request().headers()["authorization"]).toBe("Bearer fazbear");
      await route.fulfill({ json: logoutRes });
    }
  });

  // Mock franchise dashboard
  await page.route("*/**/api/franchise/1", async (route) => {
    const franchiseRes = [
      {
        id: 251,
        name: "pizza planet",
        admins: [
          {
            id: 1,
            name: "常用名字",
            email: "a@jwt.com",
          },
        ],
        stores: [
          {
            id: 117,
            name: "taco bell",
            totalRevenue: 0,
          },
        ],
      },
    ];
    expect(route.request().method()).toBe("GET");
    await route.fulfill({ json: franchiseRes });
  });

  // Create new store
  await page.route("*/**/api/franchise/251/store", async (route) => {
    const storeReq = {
      id: "",
      name: "not taco bell",
    };
    const storeRes = {
      id: 118,
      franchiseId: 251,
      name: "not taco bell",
    };
    expect(route.request().method()).toBe("POST");
    expect(route.request().postDataJSON()).toMatchObject(storeReq);
    await route.fulfill({ json: storeRes });
  });

  // Delete store
  await page.route("*/**/api/franchise/251/store/117", async (route) => {
    const storeRes = {
      message: "store deleted",
    };
    expect(route.request().method()).toBe("DELETE");
    expect(route.request().headers()["authorization"]).toBe("Bearer fazbear");
    await route.fulfill({ json: storeRes });
  });

  // Go to home page
  await page.goto("/");

  // Login user
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByRole("textbox", { name: "Email address" }).click();
  await page.getByRole("textbox", { name: "Email address" }).fill("a@jwt.com");
  await page.getByRole("textbox", { name: "Email address" }).press("Tab");
  await page.getByRole("textbox", { name: "Password" }).fill("admin");
  await expect(page.getByRole("textbox", { name: "Password" })).toHaveValue(
    "admin"
  );
  await page.getByRole("button", { name: "Login" }).click();

  // Back to home page
  await expect(page.locator("h2")).toContainText("The web's best pizza");

  // Go to franchise page
  await page.getByRole("link", { name: "Franchise" }).click();

  await page.getByRole("button", { name: "Create store" }).click();
  await expect(page.locator("h2")).toContainText("Create store");

  // Create a new store
  await page.getByRole("textbox", { name: "store name" }).click();
  await page.getByRole("textbox", { name: "store name" }).fill("not taco bell");
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByRole("cell", { name: "taco bell" }).click();
  await expect(page.locator("tbody")).toContainText("taco bell");

  // Close the store
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.locator("h2")).toContainText("Sorry to see you go");
  await page.getByRole("link", { name: "Logout" }).click();
});
