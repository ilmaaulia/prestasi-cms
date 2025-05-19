import React from 'react'
import { Table } from 'react-bootstrap'
import Tbody from '../TbodyWithAction'
import Thead from '../Thead'
import Pagination from '../Pagination'

const TableWithAction = ({
  withPagination,
  handlePageClick,
  pages,
  actionNotDisplay,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  customAction,
  status,
}) => {
  return (
    <>
      <Table responsive striped bordered hover className="w-100">
        <Thead text={thead} />
        <Tbody
          status={status}
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
        />
      </Table>
      {withPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ''
      )}
    </>
  )
}

export default TableWithAction
