// Can use const instead of let since when importing,
// it will treat let books as a const books anyway
let books = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
  },
];

export { books };
