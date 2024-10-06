type QueryOperator<T> = {
  $lt?: T;
  $gt?: T;
  $lte?: T;
  $gte?: T;
};

export type ProductPriceQuery = {
  price: QueryOperator<number>;
};