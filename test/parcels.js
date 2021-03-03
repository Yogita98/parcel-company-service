const server = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

/**
 * Test the GET route
 */
describe("Parcel APIs", () => {
  describe("Test GET route /api/routes/parcels", () => {
    it("It should return all the parcels", (done) => {
      chai
        .request(server)
        .get("/api/routes/parcels")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.keys("loadedParcels", "unloadedParcels");
          response.body.loadedParcels.should.not.be.eq([]);
          done();
        });
    });

    it("This endpoint should NOT return the parcels", (done) => {
      chai
        .request(server)
        .get("/api/routes/parcel")
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
describe("GET /api/routes/parcels/:parcelId", () => {
  it("It should GET a parcel by ID", (done) => {
    const parcelId = 1;
    chai
      .request(server)
      .get("/api/routes/parcels/" + parcelId)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("parcelId").eq(parcelId);
        response.body.should.have.keys("parcelId", "category", "parcelWeight");
        done();
      });
  });

  it("It should NOT GET a parcel by ID", (done) => {
    const parcelId = 123;
    chai
      .request(server)
      .get("/api/routes/parcels/" + parcelId)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.message.should.be.eq(
          "The parcel with the provided ID does not exist"
        );
        done();
      });
  });
});

/**
 * Test the POST route
 */
describe("POST /api/routes/parcels/create", () => {
  it("It should POST a new parcel", (done) => {
    const parcel = {
      category: "lifestyle",
      weight: 3,
    };
    chai
      .request(server)
      .post("/api/routes/parcels/create")
      .send(parcel)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        response.body.should.have.property("category").eq("lifestyle");
        response.body.should.have.property("parcelWeight").eq(parcel.weight);
        done();
      });
  });

  it("It should NOT POST a new parcel without the appropriate properties", (done) => {
    const parcel = {
      category: "lifestyle",
    };
    chai
      .request(server)
      .post("/api/routes/parcels/create")
      .send(parcel)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.message.should.be.eq(
          "category or weight should be defined"
        );
        done();
      });
  });
});
