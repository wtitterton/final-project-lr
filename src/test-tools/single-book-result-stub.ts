export function SingleBookResultStub(
  dynnamicBookId: number,
  dynamicBookName?: string
) {
  return {
    success: true,
    result: [
      {
        bookId: dynnamicBookId,
        name: dynamicBookName ?? "Iron man",
        emailOwnerId: "g@b.com",
        devOwnerId: "example@example.com",
      },
    ],
  };
}
