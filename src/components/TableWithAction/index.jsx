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
      <div className="p-3 py-2 rounded shadow-sm bg-white">
        <Table responsive striped rounded hover className="w-100">
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
      </div>
      {withPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ''
      )}
    </>
  )
}

export default TableWithAction
