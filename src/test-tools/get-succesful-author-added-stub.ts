export function GetSuccessfulAuthorAddedStub(id: number) {
  return {
    success: true,
    result: { message: "Author Added", authorId: id },
  };
}
