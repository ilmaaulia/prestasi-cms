import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import AppButton from '../Button'
import Loading from '../Loading'
import { config } from '../../config'


const TbodyWithAction = ({
  data,
  display,
  editUrl,
  deleteAction,
  customAction,
  actionNotDisplay,
  status,
}) => {
  const navigate = useNavigate()

  return (
    <tbody>
      {status === 'process' ? (
        <tr>
          <td colSpan={display.length + 2}>
            <Loading />
          </td>
        </tr>
      ) : data.length ? (
        data.map((data, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              {Object.keys(data).map(
                (key) =>
                  display.indexOf(key) > -1 && (
                    <td key={key}>
                      {key === 'image' ? (
                        <Image 
                          width={80}
                          rounded
                          src={data[key]?.name}
                        />
                      ) : key === 'date' || key === 'createdAt' || key === 'updatedAt' ? (
                        new Date(data[key]).toLocaleDateString()
                      ) : key === 'content' ? (
                        data[key].length > 50 ? `${data[key].substring(0, 50)}...` : data[key]
                      ) :(
                        data[key]
                      )}
                    </td>
                  ),
              )}
              {!actionNotDisplay && (
                <td className='text-nowrap'>
                  {customAction && customAction(data._id, data.status)}
                  {editUrl && (
                    <AppButton
                      size={'sm'}
                      action={() => navigate(`${editUrl}/${data._id}`)}
                    >
                      Edit
                    </AppButton>
                  )}
                  {deleteAction && (
                    <AppButton
                      className={'ms-2'}
                      variant='danger'
                      size={'sm'}
                      action={() => deleteAction(data._id)}
                    >
                      Hapus
                    </AppButton>
                  )}
                </td>
              )}
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={display.length + 1} style={{ textAlign: 'center' }}>
            Tidak Ditemukan Data
          </td>
        </tr>
      )}
    </tbody>
  )
}

export default TbodyWithAction
