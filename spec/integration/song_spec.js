const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/user/1/songs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Song = require("../../src/db/models").Song;

describe("routes : songs", () => {

  beforeEach((done) => {
    this.song;
    sequelize.sync({ force: true }).then((res) => {

      Song.create({
        title: "The Greatest Song in the World",
        artist: "The D",
        notes: "This truly is the greatest song ever."
      })
        .then((song) => {
          this.song = song;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    })
  })

  describe("GET /songs", () => {

    it("should return a status code 200 and all songs", (done) => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Songs");
        expect(body).toContain("The Greatest Song in the World");
        done();
      });
    });
  });

});