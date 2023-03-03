export function SingleAuthorsResultStub() {
  return {
    success: true,
    result: [
      {
        authorId: 1,
        name: "Isaac Asimov",
        bookIds: [1, 2],
        latLon: "51.4556852, -0.9904706",
      },
      {
        authorId: 2,
        name: "Kenneth Graeme",
        bookIds: [3],
        latLon: "9,2",
      },
      {
        authorId: 3,
        name: "J.K Rowling",
        bookIds: [3],
        latLon: "9,2",
      },
      {
        authorId: 4,
        name: "Chris Smith",
        bookIds: [1],
        latLon: "9,2",
      },
      {
        authorId: 5,
        name: "Sam Jones",
        bookIds: [2, 3],
        latLon: "9,2",
      },
    ],
  };
}
