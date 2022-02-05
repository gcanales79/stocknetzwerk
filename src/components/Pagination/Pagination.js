import React from 'react';
import {Pagination as PaginationAntd} from "antd";

import "./Pagination.scss"

export default function Pagination(props) {
    const{post,location,history}=props;
    //console.log(post)
    //console.log(location)
    //console.log(history)
    const currentPage=parseInt(post.page)

    //console.log(location)

    const onChangePage=newPage=>{
        history.push(`${location.pathname}?page=${newPage}`)
    }


  return <div>
      <PaginationAntd
      defaultCurrent={currentPage}
      total={post.total}
      pageSize={post.limit}
      onChange={newPage=>onChangePage(newPage)}
      className="pagination"
      />
  </div>;
}
