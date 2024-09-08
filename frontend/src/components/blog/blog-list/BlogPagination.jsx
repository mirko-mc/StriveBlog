import React from "react";
import { Pagination, Row } from "react-bootstrap";
import { GetAllBlogPosts } from "../../../data/fetch";

export const BlogPagination = (props) => {
  const page = 10;
  /** vai alla prima pagina */
  const HandleFirstPage = async () => {
    // TODO richiama la fetch caricamento post passando pagina da prendere
  };
  /** vai all'ultima pagina */
  const HandleLastPage = () => {
    // TODO richiama la fetch caricamento post passando pagina da prendere
  };
  /** vai alla pagina precedente */
  const HandlePrevPage = () => {
    // TODO richiama la fetch caricamento post passando pagina da prendere
  };
  /** vai alla pagina successiva */
  const HandleNextPage = () => {};
  // TODO richiama la fetch caricamento post passando pagina da prendere
  return (
    <Row>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{100}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{page - 2}</Pagination.Item>
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item>{page + 1}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Row>
  );
};
