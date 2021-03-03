const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Truck APIs", () => {
  describe("Test GET route /api/routes/trucks", () => {
    it("It should return all the trucks", (done) => {
      chai
        .request(server)
        .get("/api/routes/trucks")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.not.be.eq([]);
          done();
        });
    });

    it("This endpoint should NOT return the trucks", (done) => {
      chai
        .request(server)
        .get("/api/routes/truck")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

/**
 * Test the GET (by id) route
 */
describe("GET /api/routes/trucks/:truckId", () => {
  it("It should GET a truck by ID", (done) => {
    const truckId = 1;
    chai
      .request(server)
      .get("/api/routes/trucks/" + truckId)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        // response.body.should.have.property('truckId');
        // response.body.should.have.property('category');
        response.body.should.have.property("truckId").eq(truckId);
        response.body.should.have.keys(
          "truckId",
          "companyName",
          "loaded",
          "weight",
          "loadedParcels"
        );
        done();
      });
  });

  it("It should NOT GET a truck by ID", (done) => {
    const truckId = 123;
    chai
      .request(server)
      .get("/api/routes/trucks/" + truckId)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.message.should.be.eq(
          "The truck with the provided ID does not exist"
        );
        done();
      });
  });
});

/**
 * Test the POST /create route
 */
describe("POST /api/routes/trucks/create", () => {
  it("It should POST a new truck", (done) => {
    const truck = {
      company: "PQR",
    };
    chai
      .request(server)
      .post("/api/routes/trucks/create")
      .send(truck)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("companyName").eq(truck.company);
        response.body.should.have.property("loaded").eq(false);
        done();
      });
  });

  it("It should NOT POST a new truck without the appropriate properties", (done) => {
    const truck = {};
    chai
      .request(server)
      .post("/api/routes/trucks/create")
      .send(truck)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.be.eq("company should be defined");
        done();
      });
  });
});

/**
 * Test the POST /load route having query parameters
 */
describe("POST /api/routes/trucks/load", () => {
  it("It should return a truck loaded with parcels", (done) => {
    const countObj = {
      count: 2,
    };
    chai
      .request(server)
      .post("/api/routes/trucks/load")
      .query(countObj)
      .send()
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("loaded").eq(true);
        response.body.loadedParcels.should.have.length(countObj.count);
        done();
      });
  });

  it("It should NOT load a truck without appropriate properties", (done) => {
    chai
      .request(server)
      .post("/api/routes/trucks/load")
      .query({ count: "abc" })
      .send()
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.be.eq(
          "The server could not understand the request. Please check your query again."
        );
        done();
      });
  });
});
