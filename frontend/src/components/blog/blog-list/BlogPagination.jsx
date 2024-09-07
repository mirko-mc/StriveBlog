import React from "react";
import { Pagination, Row } from "react-bootstrap";

export const BlogPagination = (props) => {
/** vai alla prima pagina */
const HandleFirstPage=()=>{
  // TODO richiama la fetch caricamento post passando pagina da prendere
}
/** vai all'ultima pagina */
const HandleLastPage=()=>{
  // TODO richiama la fetch caricamento post passando pagina da prendere
}
/** vai alla pagina precedente */
const HandlePrevPage=()=>{
  // TODO richiama la fetch caricamento post passando pagina da prendere
}
/** vai alla pagina successiva */
const HandleNextPage=()=>{}
// TODO richiama la fetch caricamento post passando pagina da prendere
  return (
    <Row>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{BlogPostsToRender.page - 1}</Pagination.Item>
        <Pagination.Item active>{BlogPostsToRender.page}</Pagination.Item>
        <Pagination.Item>{BlogPostsToRender.page + 1}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Row>
  );
};