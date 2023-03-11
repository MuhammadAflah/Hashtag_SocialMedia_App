import { React, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Toggler from './toggler';

function UserManage() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/getAllUsers`).then ((response) => {
      setUsers(response.data.user)
    })
  },[])

  return (
    <div className='mt-3' style={{width:"100%"}}>
    <MDBTable align='middle' className='w-100'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Location</th>
          <th scope='col'>Occupation</th>
          <th scope='col'>Status</th>
          <th scope='col'>Block/UnBlock</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody style={{overflow:"scroll"}}>
        {users.map(user =>(
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              {/* <img
                src='https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.firstName}</p>
                <p className='fw-bold mb-1'>{user.lastName}</p>
              </div>
            </div>
          </td>
          <td>
          <p className='text-muted mb-0'>{user.email}</p>
          </td>
          <td>
          <p className='text-muted mb-0'>{user.location}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{user.occupation}</p>
          </td>
          <td>
            {/* <MDBBadge color='success' pill>
              Active
            </MDBBadge> */}
            <Toggler userId = {user}/>
          </td>
          {/* <Switch  defaultChecked color="warning" /> */}
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Details
            </MDBBtn>
          </td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
    </div>
  );
}

export default UserManage