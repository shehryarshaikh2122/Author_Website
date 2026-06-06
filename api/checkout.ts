import { createHandler } from "../server/vercelAdapter";
import { checkout } from "../server/routes/orders";

export default createHandler(checkout);
