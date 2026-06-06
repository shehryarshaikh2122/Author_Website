import { createHandler } from "../server/vercelAdapter";
import { getBooks } from "../server/routes/books";

export default createHandler(getBooks);
