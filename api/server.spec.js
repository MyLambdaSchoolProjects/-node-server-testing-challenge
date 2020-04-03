const request = require("supertest");

const server = require("./server.js");
const db = require("../data/dbConfig.js");
const Model = require("../datamodel/dataModel");

describe("server.js", function() {
  it('runs the tests', function() {
    expect(true).toBe(true);
  })


  describe("GET /", function() {
    it("should return a 200 OK", function() {
      // spin up the server
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
      // make GET request to /
      // look at the http status code for the response
    });

    it("should return a JSON", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should return {api: up}", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body.api).toBe("up");
        });
    });

  });
});

describe("insert() and remove()", function() {
  beforeEach(async () => {
    await db("hobbits").truncate();
  });
  it("adds new hobbit to the db then removes one", async function() {
    // call insert passing a hobbit
    await Model.insert({ name: "sam" });
    await Model.insert({ name: "frodo" });

    // open the db and see that the hobbit is there
    const hobbits = await db("hobbits");

    expect(hobbits).toHaveLength(2);

    Model.remove(1);
    expect(hobbits).toHaveLength(1);
  });

});

